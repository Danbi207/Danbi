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
import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class HelpPostService {

    @PersistenceContext
    private EntityManager em;

    private final HelpPostRepository helpPostRepository;

    public HelpPost create(HelpPost helpPost, Long memberId) {
        validateHelpPostTime(helpPost);
        validateDuplicateHelpPost(helpPost,memberId);
        return helpPostRepository.save(helpPost);
    }

    public void validateHelpPostTime(HelpPost helpPost) {
        if (helpPost.getEndTime().isBefore(helpPost.getStartTime())) {
            throw new MisMatchException(ErrorCode.HELPPOST_MISMATCH_TIME);
        }
    }

    public void validateDuplicateHelpPost(HelpPost helpPost, Long memberId) {
        List<HelpPost> helpPosts = helpPostRepository.findHelpPostsByBetweenTime(helpPost.getStartTime(), helpPost.getEndTime(), memberId);
        if (helpPosts.size() > 0) {
            throw new MisMatchException(ErrorCode.HELPPOST_MISMATCH_START_END_TIME);
        }
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

        deletedHelpPost.updateState(State.DELETE);
    }

    public void assignDelete(Long id) {
        HelpPost deletedHelpPost = helpPostRepository.findById(id).get();
        deletedHelpPost.updateState(State.MATCHED);
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

    @Transactional(readOnly = true)
    public List<HelpPost> searchByMonth(LocalDate time, Long memberId) {
        return helpPostRepository.findHelpPostByMonth(time, memberId);
    }
}
