package com.danbi.web.dto;

import lombok.*;

@Setter
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class KakaoAccessTokenRequest {

    private String oauthType;
}
