package com.danbi.domain.helppost.service;

import com.danbi.domain.helppost.constant.State;
import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.helppost.repository.HelpPostRepository;
import com.danbi.domain.member.entity.Member;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class HelpPostService {

    @PersistenceContext
    private final EntityManager em;

    private final HelpPostRepository helpPostRepository;

    public HelpPost create(HelpPost helpPost) {
        return helpPostRepository.save(helpPost);
    }

    public HelpPost update(Long id, HelpPost helpPost) {
        HelpPost updatedHelpPost = helpPostRepository.findById(id).get();
        updatedHelpPost.update(helpPost);
        em.flush();
        return updatedHelpPost;
    }

    public void delete(Long id) {
        HelpPost deletedHelpPost = helpPostRepository.findById(id).get();
        deletedHelpPost.delete(State.DELETE);
    }

    public HelpPost getHelpPost(Long helpPostId) {
        return helpPostRepository.findById(helpPostId).get();
    }

    @Transactional(readOnly = true)
    public List<HelpPost> searchMyHelp(Member member) {
        List<HelpPost> myHelpList = helpPostRepository.findAllByMember(member);
        return myHelpList;
    }

    @Transactional(readOnly = true)
    public List<HelpPost> searchAllList() {
        List<HelpPost> allHelpList = helpPostRepository.findAllByState(State.ACTIVATE);
        return allHelpList;
    }

    @Transactional(readOnly = true)
    public HelpPost detailHelpPost(Long id) {
        HelpPost helpPost = helpPostRepository.findById(id).get();
        return helpPost;
    }

}
