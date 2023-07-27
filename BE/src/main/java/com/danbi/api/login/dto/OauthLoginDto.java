package com.danbi.api.login.dto;

import com.danbi.domain.member.constant.Role;
import com.danbi.global.jwt.dto.JwtDto;
import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.*;

import java.util.Date;

public class OauthLoginDto {

    @Getter
    @Setter
    public static class Request {
        private String oauthType;
    }

    @Getter @Setter
    @Builder
    @NoArgsConstructor
    @AllArgsConstructor
    public static class Response {

        private String grantType;

        private String accessToken;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private Date accessTokenExpireTime;

        private String refreshToken;

        @JsonFormat(shape = JsonFormat.Shape.STRING, pattern = "yyyy-MM-dd HH:mm:ss", timezone = "Asia/Seoul")
        private Date refreshTokenExpireTime;

        private Role role;

        public static Response of(JwtDto jwtTokenDto, Role role) {
            return Response.builder()
                    .grantType(jwtTokenDto.getGrantType())
                    .accessToken(jwtTokenDto.getAccessToken())
                    .accessTokenExpireTime(jwtTokenDto.getAccessTokenExpireTime())
                    .refreshToken(jwtTokenDto.getRefreshToken())
                    .refreshTokenExpireTime(jwtTokenDto.getRefreshTokenExpireTime())
                    .role(role)
                    .build();
        }

    }

}