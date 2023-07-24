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

    public AccumulatePointResponseDto getAccumulatePoint(Long profileId) {
        Profile profile = profileService.getProfile(profileId);
        Point point = pointService.getPoint(profile);
        return AccumulatePointResponseDto.builder()
                .accumulateDewPoint(point.getAccumulateDewPoint()).build();
    }

    public PointResponseDto getPoint(Long profileId) {
        Profile profile = profileService.getProfile(profileId);
        Point point = pointService.getPoint(profile);
        return PointResponseDto.builder()
                .dewPoint(point.getDewPoint()).build();
    }
}
