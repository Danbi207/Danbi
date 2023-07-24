package com.danbi.api.help.service;

import com.danbi.api.help.dto.assign.HelpAssignDto;
import com.danbi.domain.help.entity.Help;
import com.danbi.domain.help.service.HelpService;
import com.danbi.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class HelpInfoService {

    private final HelpService helpService;

    public HelpAssignDto assignHelper(Long helpPostId, Member member) {
        Help help = helpService.assignHelper(helpPostId, member);
        return HelpAssignDto.builder()
                .helpId(help.getId()).build();
    }

    public void cancelHelp(Long helpId) {
        helpService.cancelHelp(helpId);
    }

    public void ipCompleteHelp(Long helpId) {
        helpService.ipComplete(helpId);
    }

    public void helperCompleteHelp(Long helpId) {
        helpService.helperComplete(helpId);
    }


}
