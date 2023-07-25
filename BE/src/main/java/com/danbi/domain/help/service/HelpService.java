package com.danbi.domain.help.service;

import com.danbi.domain.help.constant.State;
import com.danbi.domain.help.entity.Help;
import com.danbi.domain.help.repository.HelpRepository;
import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.helppost.repository.HelpPostRepository;
import com.danbi.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Service
@RequiredArgsConstructor
@Transactional
public class HelpService {

    @PersistenceContext
    private final EntityManager em;

    private final HelpPostRepository helpPostRepository;
    private final HelpRepository helpRepository;

    public void create(Help help) {
        helpRepository.save(help);
    }

    public Help assignHelper(Long id, Member member) {
        HelpPost helpPost = helpPostRepository.findById(id).get();
        Help help = helpRepository.findByHelpPost(helpPost).get();
        help.updateHelper(member);
        em.flush();
        return help;
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
