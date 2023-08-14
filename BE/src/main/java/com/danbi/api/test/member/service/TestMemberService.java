package com.danbi.api.test.member.service;

import com.danbi.api.login.dto.OauthLoginDto;
import com.danbi.domain.member.constant.Role;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.EntityNotFoundException;
import com.danbi.global.jwt.dto.JwtDto;
import com.danbi.global.jwt.service.TokenManager;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class TestMemberService {

    private final MemberService memberService;
    private final TokenManager tokenManager;

    public OauthLoginDto.Response login(String email, String password) {
        JwtDto jwtTokenDto;
        Optional<Member> optionalMember = memberService.findByEmail(email);

        Member member = memberService.findByEmail(email)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_EXISTS));

        // 토큰 생성
        jwtTokenDto = tokenManager.createJwtTokenDto(member.getId(), member.getRole());
        member.updateRefreshToken(jwtTokenDto);

        return OauthLoginDto.Response.of(jwtTokenDto, member.getRole());
    }
}
