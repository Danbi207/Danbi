package com.danbi.domain.help.service;

import com.danbi.domain.help.constant.State;
import com.danbi.domain.help.entity.Help;
import com.danbi.domain.help.repository.HelpRepository;
import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.helppost.repository.HelpPostRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional
public class HelpService {

    private final HelpPostRepository helpPostRepository;
    private final HelpRepository helpRepository;

    public Help create(Help help) {
        return helpRepository.save(help);
    }

    public void cancelHelp(Long helpId) {
        Help help = helpRepository.findById(helpId).get();
        help.delete(State.DELETE);
    }

    public void ipComplete(Long helpId) {
        Help help = helpRepository.findById(helpId).get();
        help.updateIpFlag(true);
    }

    public void helperComplete(Long helpId) {
        Help help = helpRepository.findById(helpId).get();
        help.updateHelperFlag(true);
    }

}
