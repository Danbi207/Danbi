package com.danbi.web.controller;

import com.danbi.api.login.dto.OauthLoginDto;
import com.danbi.global.jwt.constant.GrantType;
import com.danbi.web.client.KakaoAccessTokenClient;
import com.danbi.web.client.KakaoTokenClient;
import com.danbi.web.dto.KakaoAccessTokenRequest;
import com.danbi.web.dto.KakaoAuthRequestDto;
import com.danbi.web.dto.KakaoTokenDto;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api/v1/oauth")
@RequiredArgsConstructor
public class KakaoTokenController {

    private final KakaoTokenClient kakaoTokenClient;
    private final KakaoAccessTokenClient kakaoAccessTokenClient;

    @Value("${kakao.client.id}")
    private String clientId;

    @Value("${kakao.client.secret}")
    private String clientSecret;

    @PostMapping("/kakao/callback")
    public ResponseEntity<OauthLoginDto.Response> loginCallback(@RequestBody KakaoAuthRequestDto request) {
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

        String kakaoAccessToken = GrantType.BEARER.getType() + " " + kakaoToken.getAccess_token();
        String kakaoType = "KAKAO";

        KakaoAccessTokenRequest kakaoAccessTokenRequest = KakaoAccessTokenRequest.builder()
                .oauthType(kakaoType)
                .build();

        OauthLoginDto.Response response = kakaoAccessTokenClient.requestKakaoUserInfo(kakaoAccessToken,
                                                                    kakaoAccessTokenRequest);

        return ResponseEntity.ok(response);
    }

}
