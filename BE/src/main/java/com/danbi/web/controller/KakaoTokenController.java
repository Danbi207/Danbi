package com.danbi.web.controller;

import com.danbi.web.client.KakaoTokenClient;
import com.danbi.web.dto.KakaoAuthRequestDto;
import com.danbi.web.dto.KakaoTokenDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

@Controller
@RequestMapping("/api/v1/oauth")
@RequiredArgsConstructor
public class KakaoTokenController {

    private final KakaoTokenClient kakaoTokenClient;

    @Value("${kakao.client.id}")
    private String clientId;

    @Value("${kakao.client.secret}")
    private String clientSecret;

    @PostMapping("/kakao/callback")
    public @ResponseBody String loginCallback(@RequestBody KakaoAuthRequestDto request) {
        String contentType = "application/x-www-form-urlencoded;charset=utf-8"; // 공식 문서
        KakaoTokenDto.Request kakaoTokenRequestDto = KakaoTokenDto.Request.builder()
                .client_id(clientId)
                .client_secret(clientSecret)
                .grant_type("authorization_code")
                .code(request.getCode())
//                .redirect_uri("http://localhost:8080/oauth/kakao/callback")
                .redirect_uri(request.getRedirectUrl())
                .build();

        KakaoTokenDto.Response kakaoToken = kakaoTokenClient.requestKakaoToken(contentType, kakaoTokenRequestDto);

        return "kakao token : " + kakaoToken;
    }

}
