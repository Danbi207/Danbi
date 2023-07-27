package com.danbi.global.interceptor;

import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.AuthenticationException;
import com.danbi.global.jwt.constant.TokenType;
import com.danbi.global.jwt.service.TokenManager;
import com.danbi.global.redis.RedisUtil;
import com.danbi.global.util.AuthorizationHeaderUtils;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
public class AuthenticationInterceptor implements HandlerInterceptor {

    private final TokenManager tokenManager;
    private final RedisUtil redisUtil;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        // 1. Authorization Header 검증
        String authorizationHeader = request.getHeader("Authorization");
        AuthorizationHeaderUtils.validateAuthorization(authorizationHeader);

        // 2. 토큰 검증
        String token = authorizationHeader.split(" ")[1];
        tokenManager.validateToken(token);

        // 3. 토큰 타입 (AccessToken 일 때만 통과)
        Claims tokenClaims = tokenManager.getTokenClaims(token);
        String tokenType = tokenClaims.getSubject();
        if(!TokenType.isAccessToken(tokenType)) {
            throw new AuthenticationException(ErrorCode.NOT_ACCESS_TOKEN_TYPE);
        }

        // 4. redis에서 black-list에 들어있는지 확인
        boolean isBlackList = redisUtil.hasKeyBlackList(token);
        if(isBlackList) {
            throw new AuthenticationException(ErrorCode.ACCESS_TOKEN_EXPIRED);
        }

        return true;
    }

}
