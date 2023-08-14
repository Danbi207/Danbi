package com.danbi.api.test.member.dto;

import lombok.Builder;
import lombok.Getter;

import javax.validation.constraints.NotBlank;

@Builder
@Getter
public class TestMemberLoginRequest {

    @NotBlank
    private String email;

    @NotBlank
    private String password;
}
