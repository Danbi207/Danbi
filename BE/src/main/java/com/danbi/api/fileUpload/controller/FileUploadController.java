package com.danbi.api.fileUpload.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.danbi.api.ApiResponse;
import com.danbi.api.fileUpload.dto.FileUploadResponseDto;
import com.danbi.api.fileUpload.service.FileUploadService;
import com.danbi.global.resolver.MemberInfo;
import com.danbi.global.resolver.MemberInfoDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/v1/ip")
@RequiredArgsConstructor
public class FileUploadController {

    private final AmazonS3Client amazonS3Client;
    private final FileUploadService fileUploadService;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @PostMapping("/submit/certification")
    public ApiResponse<List<FileUploadResponseDto>> uploadFile(@RequestParam("category") String category,
                                          @RequestPart("file") List<MultipartFile> uploadFiles,
                                          @MemberInfo MemberInfoDto memberInfoDto) {

        List<FileUploadResponseDto> response = fileUploadService.uploadIPFiles(category, uploadFiles, memberInfoDto.getMemberId());
        return ApiResponse.ok(response);
    }
}
