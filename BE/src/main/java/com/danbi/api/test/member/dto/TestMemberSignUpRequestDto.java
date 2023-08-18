package com.danbi.api.test.member.dto;

import com.danbi.domain.member.constant.Gender;
import com.danbi.domain.member.constant.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.validation.constraints.NotBlank;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class TestMemberSignUpRequestDto {
    
    @NotBlank(message = "이메일은 필수 입력값입니다.")
    private String email;

    @NotBlank(message = "비밀번호는 필수 입력값입니다.")
    private String password;

    @NotBlank(message = "이름은 필수 입력값입니다.")
    private String name;

    @NotBlank(message = "닉네임은 필수 입력값입니다.")
    private String nickname;

    @NotBlank(message = "역할은 필수 입력값입니다.")
    private String role;

    @NotBlank(message = "성별은 필수 입력값입니다.")
    private String gender;
}
