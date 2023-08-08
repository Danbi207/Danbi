package com.danbi.domain.member.repository;

import com.danbi.domain.member.dto.MemberDataDto;

public interface MemberRepositoryCustom {

    MemberDataDto searchMember(Long memberId);
}
