package com.danbi.api.test.member.controller;

import com.danbi.api.ApiResponse;
import com.danbi.api.login.dto.OauthLoginDto;
import com.danbi.api.test.member.dto.TestMemberLoginRequest;
import com.danbi.api.test.member.dto.TestMemberSignUpRequestDto;
import com.danbi.api.test.member.service.TestMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;

@RestController
@RequestMapping("api/v1/test/member")
@RequiredArgsConstructor
public class TestMemberController {

    private final TestMemberService testMemberService;

    @PostMapping("/login")
    public OauthLoginDto.Response login(@Valid @RequestBody TestMemberLoginRequest request) {

        return testMemberService.login(request.getEmail());
    }

    @PostMapping("/signup")
    public ApiResponse<String> signup(@Valid @RequestBody TestMemberSignUpRequestDto request) {
        testMemberService.signup(request);
        return ApiResponse.ok("ok");
    }
}
