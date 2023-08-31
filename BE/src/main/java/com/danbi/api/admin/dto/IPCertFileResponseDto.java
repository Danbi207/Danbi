package com.danbi.api.admin.dto;

import io.swagger.v3.oas.annotations.media.Schema;
import lombok.Builder;
import lombok.Getter;

@Schema(description = "IP 회원 인증 서류 조회 결과")
@Getter
@Builder
public class IPCertFileResponseDto {

    private Long id;
    private String originName;
    private String url;
}
