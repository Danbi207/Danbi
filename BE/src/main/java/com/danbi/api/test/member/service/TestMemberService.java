package com.danbi.api.test.member.service;

import com.danbi.api.login.dto.OauthLoginDto;
import com.danbi.api.test.member.dto.TestMemberSignUpRequestDto;
import com.danbi.domain.member.constant.Gender;
import com.danbi.domain.member.constant.OauthType;
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

    @Transactional
    public void signup(TestMemberSignUpRequestDto request) {

        Member member = Member.builder()
                .oauthType(OauthType.TEST)
                .name(request.getName())
                .email(request.getEmail())
                .password(request.getPassword())
                .role(Role.from(request.getRole()))
                .gender(Gender.from(request.getGender()))
                .profileUrl("https://media.hellobot.co/fixedmenu/%E1%84%89%E1%85%B5%E1%84%85%E1%85%A9_%E1%84%8B%E1%85%A1%E1%84%86%E1%85%AE%20%E1%84%8B%E1%85%B5%E1%84%85%E1%85%B3%E1%86%B7%20%E1%84%8C%E1%85%B5%E1%86%BA%E1%84%80%E1%85%B5.png")
                .build();

        memberService.registerMember(member);
    }

}
