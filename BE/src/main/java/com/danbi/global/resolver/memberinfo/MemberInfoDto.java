package com.danbi.global.resolver.memberinfo;

import com.danbi.domain.member.constant.Role;
import com.danbi.domain.member.constant.State;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class MemberInfoDto {

    private Long memberId;
    private Role role;

}
