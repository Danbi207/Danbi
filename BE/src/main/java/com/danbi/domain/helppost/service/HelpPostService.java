package com.danbi.domain.helppost.service;

import com.danbi.domain.helppost.constant.State;
import com.danbi.domain.helppost.dto.HelpPostDetailQeuryDto;
import com.danbi.domain.helppost.dto.HelpPostFaceDto;
import com.danbi.domain.helppost.dto.HelpPostMatchedDto;
import com.danbi.domain.helppost.dto.HelpPostQueryDto;
import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.helppost.repository.HelpPostRepository;
import com.danbi.domain.helppost.repository.PositionRepository;
import com.danbi.domain.member.entity.Member;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.MisMatchException;
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
    private EntityManager em;

    private final HelpPostRepository helpPostRepository;

    public HelpPost create(HelpPost helpPost) {
        return helpPostRepository.save(helpPost);
    }

    public HelpPost update(Long id, HelpPost helpPost, Long memberId) {
        HelpPost updatedHelpPost = helpPostRepository.findById(id).get();

        validateHelpPostMatchMember(updatedHelpPost, memberId);

        updatedHelpPost.update(helpPost);
        em.flush();
        return updatedHelpPost;
    }

    public void delete(Long id, Long memberId) {
        HelpPost deletedHelpPost = helpPostRepository.findById(id).get();

        validateHelpPostMatchMember(deletedHelpPost, memberId);

        deletedHelpPost.delete(State.DELETE);
    }

    public void assignDelete(Long id) {
        HelpPost deletedHelpPost = helpPostRepository.findById(id).get();
        deletedHelpPost.delete(State.MATCHED);
    }

    private void validateHelpPostMatchMember(HelpPost helpPost, Long memberId) {
        if(helpPost.getMember().getId() != memberId) {
            throw new MisMatchException(ErrorCode.HELPPOST_MISMATCH_MEMBER);
        }
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


    // querydsl 사용
    @Transactional(readOnly = true)
    public List<HelpPostQueryDto> searchAllByQuery(String longitude, String latitude) {
        return helpPostRepository.search(longitude, latitude);
    }

    @Transactional(readOnly = true)
    public List<HelpPostFaceDto> searchAllByFace(String longitude, String latitude) {
        return helpPostRepository.searchFace(longitude,latitude);
    }

    @Transactional(readOnly = true)
    public HelpPostDetailQeuryDto searchDetail(Long HelpPostId) {
        return helpPostRepository.searchDetail(HelpPostId);
    }

    @Transactional(readOnly = true)
    public HelpPostMatchedDto searchMatchedDetail(Long HelpPostId) {
        return helpPostRepository.searchMatchedDetail(HelpPostId);
    }

}
