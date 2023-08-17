package com.danbi.domain.helppost.service;

import com.danbi.domain.helppost.constant.State;
import com.danbi.domain.helppost.dto.*;
import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.helppost.repository.HelpPostRepository;
import com.danbi.domain.helppost.repository.PositionRepository;
import com.danbi.domain.member.entity.Member;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.EntityNotFoundException;
import com.danbi.global.error.exception.MisMatchException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.List;
import java.util.Optional;

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

    private void validateHelpPostTime(HelpPost helpPost) {
        if (helpPost.getEndTime().isBefore(helpPost.getStartTime())) {
            throw new MisMatchException(ErrorCode.HELPPOST_MISMATCH_TIME);
        }
    }

    private void validateDuplicateHelpPost(HelpPost helpPost, Long memberId) {
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


    // querydsl 사용
    @Transactional(readOnly = true)
    public List<HelpPostQueryDto> searchAllByQuery(String gender) {
        validateGenderIsRight(gender);
        return helpPostRepository.search(gender);
    }

    @Transactional(readOnly = true)
    public List<HelpPostFaceDto> searchAllByFace(String longitude, String latitude, String gender) {
        validateGenderIsRight(gender);
        return helpPostRepository.searchFace(longitude,latitude, gender);
    }

    private void validateGenderIsRight(String gender) {
        if ( !(gender.equals("male") || gender.equals("female")) ) {
            throw new MisMatchException(ErrorCode.HELPPOST_MISMATCH_GENDER);
        }
    }

    @Transactional(readOnly = true)
    public HelpPostDetailQeuryDto searchDetail(Long HelpPostId) {
        Optional<HelpPostDetailQeuryDto> helpPostDetailQeuryDto = helpPostRepository.searchDetail(HelpPostId);
        validateDetailIsNotDeleted(helpPostDetailQeuryDto);
        return helpPostDetailQeuryDto.get();
    }

    private void validateDetailIsNotDeleted(Optional<HelpPostDetailQeuryDto> helpPostDetailQeuryDto) {
        if (helpPostDetailQeuryDto.isEmpty()) {
            throw new MisMatchException(ErrorCode.HELPPOST_MISMATCH_DELETED);
        }
    }

    @Transactional(readOnly = true)
    public HelpPostMatchedDto searchMatchedDetail(Long HelpPostId) {
        HelpPostMatchedDto matchedHelpPost = helpPostRepository.searchMatchedDetail(HelpPostId);
        validateIsNullHelpPost(matchedHelpPost);
        validateIsMatchedHelpPost(matchedHelpPost);
        return matchedHelpPost;
    }

    private void validateIsMatchedHelpPost(HelpPostMatchedDto matchedHelpPost) {
        if (!matchedHelpPost.getState().name().equals(State.MATCHED.name())) {
            throw new MisMatchException(ErrorCode.HELPPOST_MISMATCH_ISMATCHED);
        }
    }

    private void validateIsNullHelpPost(HelpPostMatchedDto matchedHelpPost) {
        if (matchedHelpPost==null) {
            throw new EntityNotFoundException(ErrorCode.HELPPOST_NOT_EXISTS);
        }
    }

    @Transactional(readOnly = true)
    public List<HelpPostByMonthDto> searchByMonth(LocalDate time, Long memberId) {
        return helpPostRepository.findHelpPostByMonth(time, memberId);
    }

    @Transactional(readOnly = true)
    public Optional<HelpPost> checkHelperTime(LocalDateTime time, Long memberId) {
        return helpPostRepository.findHelpPostByNowTime(time, memberId);
    }

    public void deleteNotMatchedHelpPost() {
        LocalDate yesterday = LocalDate.now().minusDays(1);
        LocalDateTime startOfDay = yesterday.atStartOfDay();
        LocalDateTime endOfDay = yesterday.atTime(LocalTime.MAX);

        List<HelpPost> notMatchedHelpPost = helpPostRepository.findNotMatchedHelpPost(startOfDay, endOfDay);
        for (HelpPost helpPost : notMatchedHelpPost) {
            helpPost.updateState(State.DELETE);
        }
    }


    public List<BestHelpMemberDto> searchBestHelpMembers() {
        LocalDateTime currentDateTime = LocalDateTime.now();
        LocalDateTime startOfLastMonth = currentDateTime.minusMonths(1).withDayOfMonth(1).withHour(0).withMinute(0).withSecond(0);
        LocalDateTime endOfLastMonth = currentDateTime.withDayOfMonth(1).minusDays(1).withHour(23).withMinute(59).withSecond(59);

        return helpPostRepository.searchBestMember(startOfLastMonth, endOfLastMonth);
    }

}
