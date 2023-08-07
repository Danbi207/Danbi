package com.danbi.api.login.service;

import com.danbi.api.login.dto.OauthLoginDto;
import com.danbi.domain.member.constant.OauthType;
import com.danbi.domain.member.constant.Role;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import com.danbi.external.oauth.model.OAuthAttributes;
import com.danbi.external.oauth.service.SocialLoginApiService;
import com.danbi.external.oauth.service.SocialLoginApiServiceFactory;
import com.danbi.global.jwt.dto.JwtDto;
import com.danbi.global.jwt.service.TokenManager;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Slf4j
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class OauthLoginService {

    private final MemberService memberService;
    private final TokenManager tokenManager;

    @Transactional
    public OauthLoginDto.Response oauthLogin(String accessToken, OauthType oauthType) {
        SocialLoginApiService socialLoginApiService = SocialLoginApiServiceFactory.getSocialLoginApiService(oauthType);
        OAuthAttributes userInfo = socialLoginApiService.getUserInfo(accessToken);
        log.info("userInfo : {}",  userInfo);

        JwtDto jwtTokenDto;
        Optional<Member> optionalMember = memberService.findByEmail(userInfo.getEmail());
        Member oauthMember;
        if(optionalMember.isEmpty()) { // 신규 회원 가입
            oauthMember = userInfo.toMemberEntity(oauthType, Role.ROLE_UNDEFINED);

            oauthMember = memberService.registerMember(oauthMember);
        } else { // 기존 회원일 경우
            oauthMember = optionalMember.get();
        }
        // 토큰 생성
        jwtTokenDto = tokenManager.createJwtTokenDto(oauthMember.getId(), oauthMember.getRole());
        oauthMember.updateRefreshToken(jwtTokenDto);

        return OauthLoginDto.Response.of(jwtTokenDto, oauthMember.getRole());
    }

}
