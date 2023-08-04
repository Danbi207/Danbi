package com.danbi.api.profile.controller;

import com.danbi.api.ApiResponse;
import com.danbi.api.item.dto.ItemResponseDto;
import com.danbi.api.profile.dto.ProfileResponseDto;
import com.danbi.api.profile.service.ProfileInfoService;
import com.danbi.global.resolver.MemberInfo;
import com.danbi.global.resolver.MemberInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Profile", description = "프로필")
@RestController
@RequestMapping("/api/v1/profile")
@RequiredArgsConstructor
public class ProfileController {

    private final ProfileInfoService profileInfoService;

    @Operation(summary = "프로필 조회 API", description = "프로필 조회 API")
    @GetMapping("/{member_id}")  // 프로필 정보 조회
    public ApiResponse<ProfileResponseDto> searchProfile(@PathVariable("member_id") Long memberId) {
        ProfileResponseDto profileResponseDto = profileInfoService.searchProfile(memberId);
        return ApiResponse.ok(profileResponseDto);
    }
}
