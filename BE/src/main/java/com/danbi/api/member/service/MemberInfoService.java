package com.danbi.api.member.service;

import com.danbi.api.member.dto.MemberInfoResponseDto;
import com.danbi.api.member.dto.MemberResponseDto;
import com.danbi.domain.member.dto.MemberInfoDto;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberInfoService {

    private final MemberService memberService;

    public MemberInfoResponseDto getMemberInfo(Long memberId) {
        Member member = memberService.findByMemberId(memberId);
        return MemberInfoResponseDto.of(member);
    }

    public MemberResponseDto searchMemberInfo(Long memberId) {
        MemberInfoDto memberInfo = memberService.searchMember(memberId);
        return MemberResponseDto.builder()
                .userId(memberInfo.getUserId())
                .profileId(memberInfo.getProfileId())
                .name(memberInfo.getName())
                .profileUrl(memberInfo.getProfileUrl())
                .accumulateDewPoint(memberInfo.getAccumulateDewPoint())
                .dewPoint(memberInfo.getDewPoint()).build();
    }

}
