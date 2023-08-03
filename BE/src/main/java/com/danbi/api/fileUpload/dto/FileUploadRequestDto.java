package com.danbi.api.fileUpload.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Setter
@Getter
@NoArgsConstructor
public class FileUploadRequestDto {

    private String uuid;
    private String fileName;
    private String contentType;

    @Builder
    public FileUploadRequestDto(String uuid, String fileName, String contentType) {
        this.uuid = uuid;
        this.fileName = fileName;
        this.contentType = contentType;
    }
}
