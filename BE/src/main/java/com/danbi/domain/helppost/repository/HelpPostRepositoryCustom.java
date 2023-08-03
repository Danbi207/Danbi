package com.danbi.domain.helppost.repository;

import com.danbi.domain.helppost.dto.HelpPostDetailQeuryDto;
import com.danbi.domain.helppost.dto.HelpPostFaceDto;
import com.danbi.domain.helppost.dto.HelpPostMatchedDto;
import com.danbi.domain.helppost.dto.HelpPostQueryDto;
import com.danbi.domain.helppost.entity.HelpPost;

import java.time.LocalDateTime;
import java.util.List;

public interface HelpPostRepositoryCustom {
    List<HelpPostQueryDto> search(String longitude, String latitude);
    List<HelpPostFaceDto> searchFace(String longitude, String latitude);

    HelpPostDetailQeuryDto searchDetail(Long helpPostId);

    HelpPostMatchedDto searchMatchedDetail(Long helpPostId);

    List<HelpPost> findHelpPostsByBetweenTime(LocalDateTime startTime, LocalDateTime endTime, Long memberId);
}
