package com.danbi.api.point.service;

import com.danbi.api.point.dto.AccumulatePointResponseDto;
import com.danbi.api.point.dto.PointResponseDto;
import com.danbi.domain.point.entity.Point;
import com.danbi.domain.point.service.PointService;
import com.danbi.domain.profile.entity.Profile;
import com.danbi.domain.profile.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class PointInfoService {

    private final PointService pointService;
    private final ProfileService profileService;

    // 누적 듀 포인트 조회(프로필 조회)
    public AccumulatePointResponseDto getAccumulatePoint(Long profileId) {
        Profile profile = profileService.getProfileById(profileId);
        Point point = pointService.getAccumulatePoint(profile);
        return AccumulatePointResponseDto.builder()
                .accumulateDewPoint(point.getAccumulateDewPoint()).build();
    }

    // 현재 듀 포인트 조회(사용자)
    public PointResponseDto getPoint(Long profileId, Long memberId) {
        Profile profile = profileService.getProfileById(profileId);
        Point point = pointService.getPoint(profile, memberId);
        return PointResponseDto.builder()
                .dewPoint(point.getDewPoint()).build();
    }
}
