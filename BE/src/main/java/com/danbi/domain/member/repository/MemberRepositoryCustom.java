package com.danbi.domain.member.repository;

import com.danbi.domain.member.dto.MemberInfoDto;

public interface MemberRepositoryCustom {

    MemberInfoDto searchMember(Long memberId);
}
