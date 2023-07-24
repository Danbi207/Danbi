package com.danbi.api.point.controller;

import com.danbi.api.hleppost.dto.HelpPostRequestDto;
import com.danbi.api.hleppost.dto.HelpPostResponseDto;
import com.danbi.api.point.dto.AccumulatePointResponseDto;
import com.danbi.api.point.dto.PointResponseDto;
import com.danbi.api.point.service.PointInfoService;
import com.danbi.domain.member.entity.Member;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
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

    @Tag(name = "Point")
    @Operation(summary = "누적 포인트 조회 API", description = "누적 포인트 조회 API")
    @PostMapping("/{profile_id}")  // FIXME : 후에 토큰을 통한 유저정보 얻기 수정
    public ResponseEntity<AccumulatePointResponseDto> getAccumulatePoint(@PathVariable Long profile_id) {
        AccumulatePointResponseDto accumulatePoint = pointInfoService.getAccumulatePoint(profile_id);
        return ResponseEntity.ok(accumulatePoint);
    }

    @Tag(name = "Point")
    @Operation(summary = "현재 포인트 조회 API", description = "현재 포인트 조회 API")
    @PostMapping("")  // FIXME : 후에 토큰을 통한 유저정보 얻기 수정
    public ResponseEntity<PointResponseDto> getPoint(@PathVariable Long profile_id) {
        PointResponseDto point = pointInfoService.getPoint(profile_id);
        return ResponseEntity.ok(point);
    }
}
