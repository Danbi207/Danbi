package com.danbi.web.dto;

import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
@Builder
public class KakaoAccessTokenRequest {

    private String oauthType;
}
