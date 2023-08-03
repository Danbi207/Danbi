package com.danbi.api.fileUpload.controller;

import com.amazonaws.services.s3.AmazonS3Client;
import com.danbi.api.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping("api/v1/ip")
@RequiredArgsConstructor
public class FileUploadController {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    @PostMapping("/submit/certification")
    public ApiResponse<String> uploadFile(@RequestParam("file") MultipartFile[] uploadFiles) {


        return ApiResponse.ok("ok");
    }
}
