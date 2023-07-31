package com.danbi.domain.help.service;

import com.danbi.domain.help.constant.State;
import com.danbi.domain.help.entity.Help;
import com.danbi.domain.help.repository.HelpRepository;
import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.helppost.repository.HelpPostRepository;
import com.danbi.domain.member.entity.Member;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.MisMatchException;
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

        validateHelpMatchMember(helpPost,member);

        help.updateHelper(member);
        em.flush();
        return help;
    }

    public void cancelHelp(Long helpId) {
        Help help = helpRepository.findById(helpId).get();
        help.delete(State.DELETE);
    }

    public void ipComplete(Long helpId, Long memberId) {
        Help help = helpRepository.findById(helpId).get();

        validateHelpMatchIp(help,memberId);

        help.updateIpFlag(true);
    }

    public void helperComplete(Long helpId, Long memberId) {
        Help help = helpRepository.findById(helpId).get();

        validateHelpMatchHelper(help,memberId);

        help.updateHelperFlag(true);
    }

    public Help search(HelpPost helpPost) {
        return helpRepository.findByHelpPost(helpPost).get();
    }


    private void validateHelpMatchMember(HelpPost helpPost, Member memeber) {
        if(helpPost.getMember().getId() == memeber.getId()) {
            throw new MisMatchException(ErrorCode.HELP_MISMATCH_MEMBER);
        }
    }
    private void validateHelpMatchIp(Help help, Long memeberId) {
        if(help.getIp().getId() != memeberId) {
            throw new MisMatchException(ErrorCode.HELP_MISMATCH_IP);
        }
    }

    private void validateHelpMatchHelper(Help help, Long memeberId) {
        if(help.getHelper().getId() != memeberId) {
            throw new MisMatchException(ErrorCode.HELP_MISMATCH_HELPER);
        }
    }

}
