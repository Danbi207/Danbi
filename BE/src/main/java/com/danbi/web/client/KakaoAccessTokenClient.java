package com.danbi.web.client;

import com.danbi.api.login.dto.OauthLoginDto;
import com.danbi.web.dto.KakaoAccessTokenRequest;
import feign.HeaderMap;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.cloud.openfeign.SpringQueryMap;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;

import java.util.Map;

@FeignClient(url = "http://localhost:8080/api/v1", name = "kakaoAccessTokenClient")
public interface KakaoAccessTokenClient {

    @PostMapping(value = "/oauth/login", consumes = "application/json")
    OauthLoginDto.Response requestKakaoUserInfo(@RequestHeader("Authorization") String authorization,
                                                @RequestBody KakaoAccessTokenRequest request
    );
}
