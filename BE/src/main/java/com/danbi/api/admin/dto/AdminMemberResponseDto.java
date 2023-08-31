package com.danbi.api.admin.dto;

import com.danbi.domain.member.constant.Gender;
import com.danbi.domain.member.constant.OauthType;
import com.danbi.domain.member.constant.Role;
import com.danbi.domain.member.constant.State;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class AdminMemberResponseDto {

    private Long id;

    private OauthType oauthType;

    private String email;

    private String name;

    private String nickname;

    private String profileUrl;

    private Role role;

    private Gender gender;

    private State state;

    private int accuseStack;
}
