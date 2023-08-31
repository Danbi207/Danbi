package com.danbi.api.fileUpload.service;

import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.danbi.api.fileUpload.dto.FileUploadResponseDto;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberFileService;
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
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class FileUploadService {

    private final MemberService memberService;
    private final AmazonS3Client amazonS3Client;
    private final MemberFileService memberFileService;

    private static final int FILE_AMOUNT_LIMIT = 5;

    @Value("${cloud.aws.s3.bucket}")
    private String bucketName;

    @Transactional
    public List<FileUploadResponseDto> uploadIPFiles(String category,
                                                     List<MultipartFile> files,
                                                     Long memberId) {

        Member member = memberService.findByMemberId(memberId);

        List<MultipartFile> validMultipartFiles = files.stream()
                .filter(this::validateFileExists)
                .collect(Collectors.toList());

        validateFileSize(validMultipartFiles);

        LocalDateTime now = LocalDateTime.now();

        List<FileUploadResponseDto> responseDtos = new ArrayList<>();
        for (MultipartFile file : validMultipartFiles) {
            String fileName = FileUtils.buildFileName(category, memberId, file.getOriginalFilename(), now);

            ObjectMetadata objectMetadata = new ObjectMetadata();
            objectMetadata.setContentLength(file.getSize());
            objectMetadata.setContentType(file.getContentType());

            try (InputStream inputStream = file.getInputStream()) {
                amazonS3Client.putObject(new PutObjectRequest(bucketName, fileName, inputStream, objectMetadata)
                        .withCannedAcl(CannedAccessControlList.PublicRead));

                String url = amazonS3Client.getUrl(bucketName, fileName).toString();
                FileUploadResponseDto fileUploadResponseDto = new FileUploadResponseDto(url);
                responseDtos.add(fileUploadResponseDto);

                memberFileService.saveIPCertificationFile(member, file.getOriginalFilename(), url);

            } catch (IOException e) {
                // TODO: 파일 업로드 시 커스텀 예외 처리 해야되나?
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

}
