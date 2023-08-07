package com.danbi.api.fileUpload.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.danbi.api.ApiResponse;
import com.danbi.api.fileUpload.dto.FileUploadResponseDto;
import com.danbi.api.fileUpload.service.FileUploadService;
import com.danbi.global.resolver.memberinfo.MemberInfo;
import com.danbi.global.resolver.memberinfo.MemberInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("api/v1/submit")
@RequiredArgsConstructor
public class FileUploadController {

    private final FileUploadService fileUploadService;

    @Operation(summary = "IP 인증 서류 제출 API", description = "IP 인증 서류들 제출")
    @PostMapping("/ip/certification")
    public ApiResponse<List<FileUploadResponseDto>> uploadIPFile(@RequestPart("file") List<MultipartFile> uploadFiles,
                                                               @MemberInfo MemberInfoDto memberInfoDto) {

        List<FileUploadResponseDto> response = fileUploadService.uploadIPFiles("ip", uploadFiles, memberInfoDto.getMemberId());
        return ApiResponse.ok(response);
    }
}
