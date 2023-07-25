package com.danbi.api.member.dto;

import com.danbi.domain.member.constant.Role;
import com.danbi.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberInfoResponseDto {

    private Long memberId;

    private String email;

    private String name;

    private String nickname;

    private String profileUrl;

    private Role role;

    public static MemberInfoResponseDto of(Member member) {
        return MemberInfoResponseDto.builder()
                .memberId(member.getId())
                .name(member.getName())
                .nickname(member.getNickname())
                .email(member.getEmail())
                .profileUrl(member.getProfileUrl())
                .role(member.getRole())
                .build();
    }
}
