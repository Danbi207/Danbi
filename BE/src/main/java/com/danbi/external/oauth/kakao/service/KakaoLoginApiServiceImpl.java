package com.danbi.external.oauth.kakao.service;

import com.danbi.domain.member.constant.Gender;
import com.danbi.domain.member.constant.OauthType;
import com.danbi.external.oauth.kakao.client.KakaoUserInfoClient;
import com.danbi.external.oauth.kakao.dto.KakaoUserInfoResponseDto;
import com.danbi.external.oauth.model.OAuthAttributes;
import com.danbi.external.oauth.service.SocialLoginApiService;
import com.danbi.global.jwt.constant.GrantType;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

@Slf4j
@Service
@RequiredArgsConstructor
@Transactional
public class KakaoLoginApiServiceImpl implements SocialLoginApiService {

    private final KakaoUserInfoClient kakaoUserInfoClient;
    private final String CONTENT_TYPE = "application/x-www-form-urlencoded;charset=utf8";

    @Override
    public OAuthAttributes getUserInfo(String accessToken) { // kakao에서 받은 accessToken
        // kakao로 kakao-accessToken 보내서 유저 정보를 받음
        KakaoUserInfoResponseDto kakaoUserInfoResponseDto = kakaoUserInfoClient.getKakaoUserInfo(CONTENT_TYPE,
                GrantType.BEARER.getType() + " " + accessToken);
        // 필요한 유저 정보 뽑아냄
        KakaoUserInfoResponseDto.KakaoAccount kakaoAccount = kakaoUserInfoResponseDto.getKakaoAccount();
        String email = kakaoAccount.getEmail();

        return OAuthAttributes.builder()
                .email(!StringUtils.hasText(email) ? kakaoUserInfoResponseDto.getId() : email)
                .nickname(kakaoAccount.getProfile().getNickname())
                .name(kakaoAccount.getName())
                .profileUrl(kakaoAccount.getProfile().getThumbnailImageUrl())
                .oauthType(OauthType.KAKAO)
                .gender(Gender.from(kakaoAccount.getGender()))
                .build();
    }
}
