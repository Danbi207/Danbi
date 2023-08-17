package com.danbi.domain.helppost.repository;

import com.danbi.domain.helppost.dto.*;
import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.member.dto.TotalBestMemberDto;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

public interface HelpPostRepositoryCustom {
    List<HelpPostQueryDto> search(String gender);
    List<HelpPostFaceDto> searchFace(String longitude, String latitude, String gender);

    Optional<HelpPostDetailQeuryDto> searchDetail(Long helpPostId);

    HelpPostMatchedDto searchMatchedDetail(Long helpPostId);

    List<HelpPost> findHelpPostsByBetweenTime(LocalDateTime startTime, LocalDateTime endTime, Long memberId);

    List<HelpPostByMonthDto> findHelpPostByMonth(LocalDate startTime, Long memberId);

    Optional<HelpPost> findHelpPostByNowTime(LocalDateTime time, Long memberId);

    List<HelpPost> checkIsHelperCanHelp(Long memberId, LocalDateTime startTime, LocalDateTime endTime);

    List<HelpPost> findNotMatchedHelpPost(LocalDateTime startTime, LocalDateTime endTime);

    List<BestHelpMemberDto> searchBestMember(LocalDateTime startTime, LocalDateTime endTime);
}
