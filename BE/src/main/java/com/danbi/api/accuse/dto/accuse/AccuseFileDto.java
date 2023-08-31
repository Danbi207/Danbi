package com.danbi.api.accuse.dto.accuse;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AccuseFileDto {

    private String url;

    public AccuseFileDto(String url) {
        this.url = url;
    }
}
