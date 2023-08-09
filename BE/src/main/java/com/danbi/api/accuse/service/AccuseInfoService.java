package com.danbi.api.accuse.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.danbi.api.accuse.dto.accuse.AccuseFileDto;
import com.danbi.api.accuse.dto.accuse.AccuseMemberDto;
import com.danbi.api.accuse.dto.accuse.AccuseRequestDto;
import com.danbi.api.accuse.dto.accuse.AccuseResponseDto;
import com.danbi.api.accuse.dto.detail.AccuseDetailResponseDto;
import com.danbi.api.fileUpload.dto.FileUploadResponseDto;
import com.danbi.domain.accuse.constant.State;
import com.danbi.domain.accuse.entity.Accuse;
import com.danbi.domain.accuse.service.AccuseFileService;
import com.danbi.domain.accuse.service.AccuseService;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.BusinessException;
import com.danbi.global.util.FileUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.io.InputStream;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional
@RequiredArgsConstructor
public class AccuseInfoService {

    private final AccuseService accuseService;

    private final MemberService memberService;

    private final AmazonS3Client amazonS3Client;

    private final AccuseFileService accuseFileService;

    private static final int FILE_AMOUNT_LIMIT = 5;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;


    public AccuseResponseDto accuse(AccuseRequestDto accuseRequestDto, Long memberId, List<MultipartFile> uploadFiles) {

        Member targetMember = memberService.findByMemberId(accuseRequestDto.getTargetMemberId());
        Member reporter = memberService.findByMemberId(memberId);

        Accuse build = Accuse.builder()
                .targetMember(targetMember)
                .reporter(reporter)
                .content(accuseRequestDto.getContent())
                .accuseType(accuseRequestDto.getAccuseType())
                .state(State.STAND_BY).build();

        Accuse accuse = accuseService.createAccuse(build, memberId);

        List<AccuseFileDto> accuseList = uploadIPFiles("accuse", uploadFiles, accuse);

        return AccuseResponseDto.builder()
                .accuseId(accuse.getId())
                .memberInfo(AccuseMemberDto.builder()
                        .memberId(accuse.getTargetMember().getId())
                        .name(accuse.getTargetMember().getName()).build())
                .content(accuse.getContent())
                .accuseType(accuse.getAccuseType())
                .state(accuse.getState())
                .fileList(accuseList).build();
    }


    @Transactional
    public List<AccuseFileDto> uploadIPFiles(String category,
                                             List<MultipartFile> files,
                                             Accuse accuse) {

        List<MultipartFile> validMultipartFiles = files.stream()
                .filter(this::validateFileExists)
                .collect(Collectors.toList());

        validateFileSize(validMultipartFiles);

        LocalDateTime now = LocalDateTime.now();

        List<AccuseFileDto> responseDtos = new ArrayList<>();
        for (MultipartFile file : validMultipartFiles) {
            String fileName = FileUtils.buildFileName(category, accuse.getId(), file.getOriginalFilename(), now);

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());

            try (InputStream inputStream = file.getInputStream()) {
                amazonS3Client.putObject(new PutObjectRequest(bucketName, fileName, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));

                String url = amazonS3Client.getUrl(bucketName, fileName).toString();
                AccuseFileDto fileUploadResponseDto = new AccuseFileDto(url);
                responseDtos.add(fileUploadResponseDto);

                accuseFileService.saveAccuseFile(file.getOriginalFilename(), url, accuse);

            } catch (IOException e) {
                throw new RuntimeException(e);
            }
        }

        return responseDtos;
    }

    private boolean validateFileExists(MultipartFile file) {
        if (file.isEmpty()) {
            throw new BusinessException(ErrorCode.EMPTY_FILE);
        }
        return true;
    }

    private void validateFileSize(List<MultipartFile> files) {
        if (files.size() > FILE_AMOUNT_LIMIT) {
            throw new BusinessException(ErrorCode.FILE_AMOUNTS_LIMIT);
        }
    }





    public AccuseDetailResponseDto detailAccuse(Long accuseId) {
        Accuse accuse = accuseService.searchAccuse(accuseId);
        return AccuseDetailResponseDto.builder()
                .accuseId(accuse.getId())
                .content(accuse.getContent())
                .accuseType(accuse.getAccuseType())
                .state(accuse.getState()).build();
    }

    public void approveAccuse(Long accuseId) {
        accuseService.approveAccuse(accuseId);
    }

}
