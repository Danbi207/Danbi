package com.danbi.web.dto;

import lombok.Getter;
import lombok.Setter;

@Setter
@Getter
public class KakaoAuthRequestDto {

    String code;
    String redirectUrl;
}
