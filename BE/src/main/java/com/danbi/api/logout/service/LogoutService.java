package com.danbi.api.logout.service;

import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.AuthenticationException;
import com.danbi.global.jwt.constant.TokenType;
import com.danbi.global.jwt.service.TokenManager;
import com.danbi.global.redis.RedisUtil;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
@Transactional
public class LogoutService {

    private final MemberService memberService;
    private final TokenManager tokenManager;
    private final RedisUtil redisUtil;

    public void logout(String accessToken) {

        // 1. 토큰 검증
        tokenManager.validateToken(accessToken);

        // 2. 토큰 타입 확인
        Claims tokenClaims = tokenManager.getTokenClaims(accessToken);
        String tokenType = tokenClaims.getSubject();
        if(!TokenType.isAccessToken(tokenType)) {
            throw new AuthenticationException(ErrorCode.NOT_ACCESS_TOKEN_TYPE);
        }

        // 3. refresh token 만료 처리
        Long memberId = Long.valueOf((Integer)tokenClaims.get("memberId"));
        Member member = memberService.findMemberByMemberId(memberId);
        member.expireRefreshToken(LocalDateTime.now());

        // 4. redis에 black-list 등록
        Long tokenExpiration = tokenManager.getTokenExpiration(accessToken);
        redisUtil.setBlackList(accessToken, "access-token", tokenExpiration);
    }

}
