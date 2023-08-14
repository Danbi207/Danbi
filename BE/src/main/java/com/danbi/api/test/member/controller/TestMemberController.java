package com.danbi.api.test.member.controller;

import com.danbi.api.login.dto.OauthLoginDto;
import com.danbi.api.test.member.dto.TestMemberLoginRequest;
import com.danbi.api.test.member.service.TestMemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("api/v1/test/member")
@RequiredArgsConstructor
public class TestMemberController {

    private final TestMemberService testMemberService;

    @PostMapping
    public OauthLoginDto.Response login(@RequestBody TestMemberLoginRequest request) {

        return testMemberService.login(request.getEmail(), request.getPassword());
    }
}
