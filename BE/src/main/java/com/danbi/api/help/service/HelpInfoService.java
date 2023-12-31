package com.danbi.api.help.service;

import com.danbi.api.help.dto.assign.HelpAssignDto;
import com.danbi.domain.help.entity.Help;
import com.danbi.domain.help.service.HelpService;
import com.danbi.domain.helppost.service.HelpPostService;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class HelpInfoService {

    private final HelpService helpService;
    private final MemberService memberService;
    private final HelpPostService helpPostService;

    // 도움주기(helper)
    public HelpAssignDto assignHelper(Long helpPostId, Long memberId) {
        Member member = memberService.findByMemberId(memberId);
        Help help = helpService.assignHelper(helpPostId, member);
        helpPostService.assignDelete(helpPostId);

        return HelpAssignDto.builder()
                .helpId(help.getId()).build();
    }

    // 도움 주기 취소
    public void cancelHelp(Long helpId) {
        helpService.cancelHelp(helpId);
    }

    // 도움 완료(Ip)
    public void ipCompleteHelp(Long helpId, Long memberId) {
        helpService.ipComplete(helpId, memberId);
    }

    // 도움 완료(helper)
    public void helperCompleteHelp(Long helpId, Long memberId) {
        helpService.helperComplete(helpId, memberId);
    }


}
