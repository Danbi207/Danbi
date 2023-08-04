package com.danbi.api.accuse.controller;

import com.danbi.api.ApiResponse;
import com.danbi.api.accuse.dto.accuse.AccuseRequestDto;
import com.danbi.api.accuse.dto.accuse.AccuseResponseDto;
import com.danbi.api.accuse.dto.detail.AccuseDetailResponseDto;
import com.danbi.api.accuse.service.AccuseInfoService;
import com.danbi.global.resolver.MemberInfo;
import com.danbi.global.resolver.MemberInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Accuse", description = "신고")
@RestController
@RequestMapping("/api/v1/accuse")
@RequiredArgsConstructor
public class AccuseController {

    private final AccuseInfoService accuseInfoService;

    @Operation(summary = "회원 신고 API", description = "회원 신고 API")
    @PostMapping("") // 신고자와 요청자가 동일하면 예외처리
    public ApiResponse<AccuseResponseDto> accuse(@MemberInfo MemberInfoDto memberInfoDto, @RequestBody AccuseRequestDto accuseRequestDto) {
        AccuseResponseDto accuse = accuseInfoService.accuse(accuseRequestDto, memberInfoDto.getMemberId());
        return ApiResponse.ok(accuse);
    }


    @Operation(summary = "신고 상세 조회 API", description = "신고 상세 조회 API")
    @GetMapping("/{accuse_id}")
    public ApiResponse<AccuseDetailResponseDto> detailAccuse(@PathVariable Long accuse_id) {
        AccuseDetailResponseDto accuseDetailResponseDto = accuseInfoService.detailAccuse(accuse_id);
        return ApiResponse.ok(accuseDetailResponseDto);
    }

    @Operation(summary = "신고 승인 API", description = "신고 승인 API")
    @GetMapping("/approval/{accuse_id}")
    public ApiResponse<String> approveAccuse(@PathVariable Long accuse_id) {
        accuseInfoService.approveAccuse(accuse_id);
        return ApiResponse.ok("승인 되었습니다.");
    }

}
