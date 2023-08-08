package com.danbi.api.fileUpload.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class FileUploadResponseDto {

    private String url;

    public FileUploadResponseDto(String url) {
        this.url = url;
    }
}
