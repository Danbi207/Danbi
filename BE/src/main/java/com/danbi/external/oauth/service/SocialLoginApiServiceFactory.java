package com.danbi.external.oauth.service;

import com.danbi.domain.member.constant.OauthType;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class SocialLoginApiServiceFactory {

    private static Map<String, SocialLoginApiService> socialLoginApiServices;

    public SocialLoginApiServiceFactory(Map<String, SocialLoginApiService> socialLoginApiServices) {
        this.socialLoginApiServices = socialLoginApiServices;
    }

    public static SocialLoginApiService getSocialLoginApiService(OauthType oauthType) {
        String socialLoginApiServiceBeanName = "";

        // 아래에 계속 추가해나가면 됨
        if(OauthType.KAKAO.equals(oauthType)) {
            socialLoginApiServiceBeanName = "kakaoLoginApiServiceImpl";
        }

        return socialLoginApiServices.get(socialLoginApiServiceBeanName);
    }

}
