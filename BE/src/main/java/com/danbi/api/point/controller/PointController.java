package com.danbi.api.point.controller;

import com.danbi.api.ApiResponse;
import com.danbi.api.point.dto.AccumulatePointResponseDto;
import com.danbi.api.point.dto.PointResponseDto;
import com.danbi.api.point.service.PointInfoService;
import com.danbi.global.resolver.memberinfo.MemberInfo;
import com.danbi.global.resolver.memberinfo.MemberInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Point", description = "포인트")
@RestController
@RequestMapping("/api/v1/profile/point")
@RequiredArgsConstructor
public class PointController {

    private final PointInfoService pointInfoService;

    @Operation(summary = "누적 포인트 조회 API", description = "누적 포인트 조회 API")
    @PostMapping("/{profile_id}")
    public ApiResponse<AccumulatePointResponseDto> getAccumulatePoint(@PathVariable Long profile_id) {
        AccumulatePointResponseDto accumulatePoint = pointInfoService.getAccumulatePoint(profile_id);
        return ApiResponse.ok(accumulatePoint);
    }

    @Operation(summary = "현재 포인트 조회 API", description = "현재 포인트 조회 API")
    @PostMapping("/now/{profile_id}") // 프로필 주인과 사용자가 동일한지 검증
    public ApiResponse<PointResponseDto> getPoint(@MemberInfo MemberInfoDto memberInfoDto,
                                                     @PathVariable Long profile_id) {
        PointResponseDto point = pointInfoService.getPoint(profile_id, memberInfoDto.getMemberId());
        return ApiResponse.ok(point);
    }
}
