package com.danbi.domain.member.repository;

import com.danbi.domain.member.dto.MemberDataDto;
import com.danbi.domain.member.dto.TotalBestMemberDto;

import java.util.List;

public interface MemberRepositoryCustom {

    MemberDataDto searchMember(Long memberId);

    List<TotalBestMemberDto> searchTotalBestMembers();
}
