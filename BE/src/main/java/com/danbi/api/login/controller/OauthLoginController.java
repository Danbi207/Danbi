package com.danbi.api.login.controller;

import com.danbi.api.login.dto.OauthLoginDto;
import com.danbi.api.login.service.OauthLoginService;
import com.danbi.api.login.validator.OauthValidator;
import com.danbi.domain.member.constant.OauthType;
import com.danbi.global.util.AuthorizationHeaderUtils;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletRequest;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/oauth")
public class OauthLoginController {

    private final OauthValidator oauthValidator;
    private final OauthLoginService oauthLoginService;

    @PostMapping("/login")
    public ResponseEntity<OauthLoginDto.Response> oauthLogin(@RequestBody OauthLoginDto.Request oauthLoginRequestDto,
                                                             HttpServletRequest httpServletRequest) {

        String authorizationHeader = httpServletRequest.getHeader("Authorization");
        AuthorizationHeaderUtils.validateAuthorization(authorizationHeader);
        oauthValidator.validateMemberType(oauthLoginRequestDto.getOauthType());

        // TODO: oauth의 access-token
        String accessToken = authorizationHeader.split(" ")[1]; // kakao에서 받은 accesstoken
        OauthLoginDto.Response jwtTokenResponseDto = oauthLoginService
                .oauthLogin(accessToken, OauthType.from(oauthLoginRequestDto.getOauthType()));
        return ResponseEntity.ok(jwtTokenResponseDto);
    }

}