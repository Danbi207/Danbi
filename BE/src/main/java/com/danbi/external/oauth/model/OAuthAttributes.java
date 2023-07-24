package com.danbi.external.oauth.model;

import com.danbi.domain.member.constant.Gender;
import com.danbi.domain.member.constant.OauthType;
import com.danbi.domain.member.constant.Role;
import com.danbi.domain.member.entity.Member;
import lombok.Builder;
import lombok.Getter;
import lombok.ToString;

@ToString
@Getter
@Builder
public class OAuthAttributes { // 회원 정보 가져올 때 통일시킴

    private String name;
    private String nickname;
    private String email;
    private String profileUrl;
    private Gender gender;
    private OauthType oauthType;

    public Member toMemberEntity(OauthType oauthType, Role role) {
        return Member.builder()
                .name(name)
                .email(email)
                .oauthType(oauthType)
                .profileUrl(profileUrl)
                .role(role)
                .gender(gender)
                .build();
    }

}
