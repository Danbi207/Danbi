package com.danbi.api.admin.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class IPCertFileResponseDto {

    private Long id;
    private String originName;
    private String url;
}
