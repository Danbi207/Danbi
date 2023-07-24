package com.danbi.global.interceptor;

import com.danbi.domain.member.constant.Role;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.AuthenticationException;
import com.danbi.global.jwt.service.TokenManager;
import io.jsonwebtoken.Claims;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Component;
import org.springframework.web.servlet.HandlerInterceptor;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

@Component
@RequiredArgsConstructor
public class AdminAuthorizationInterceptor implements HandlerInterceptor {

    private final TokenManager tokenManager;

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {

        String authorizationHeader = request.getHeader("Authorization");
        String accessToken = authorizationHeader.split(" ")[1];

        // 이전 인터셉터(AuthenticationInterceptor) 에서 토큰 검증은 했으므로 Role 이 ADMIN 인지만 확인

        Claims tokenClaims = tokenManager.getTokenClaims(accessToken);
        String role = (String)tokenClaims.get("role");
        if(!Role.ROLE_ADMIN.equals(Role.valueOf(role))) {
            throw new AuthenticationException(ErrorCode.FORBIDDEN_ADMIN);
        }

        return true;
    }

}
