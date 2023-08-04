package com.danbi.api.member.controller;

import com.danbi.api.ApiResponse;
import com.danbi.api.member.dto.MemberInfoResponseDto;
import com.danbi.api.member.dto.MemberResponseDto;
import com.danbi.api.member.dto.MemberRoleDto;
import com.danbi.api.member.service.MemberInfoService;
import com.danbi.api.member.service.MemberRoleService;
import com.danbi.domain.member.service.MemberService;
import com.danbi.global.jwt.service.TokenManager;
import com.danbi.global.resolver.MemberInfo;
import com.danbi.global.resolver.MemberInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Member", description = "멤버 관련 요청")
@RestController
@RequestMapping("/api/v1/member")
@RequiredArgsConstructor
public class MemberController {

    private final MemberInfoService memberInfoService;
    private final MemberRoleService memberRoleService;

    @GetMapping("/info")
    public ResponseEntity<MemberInfoResponseDto> getMemberInfo(@MemberInfo MemberInfoDto memberInfoDto) {

        Long memberId = memberInfoDto.getMemberId();
        MemberInfoResponseDto memberInfoResponseDto = memberInfoService.getMemberInfo(memberId);

        return ResponseEntity.ok(memberInfoResponseDto);
    }

    @Operation(summary = "멤버 정보 조회 API", description = "멤버 정보 조회 API")
    @GetMapping("")
    public ApiResponse<MemberResponseDto> createHelpPost(@MemberInfo MemberInfoDto memberInfoDto) {
        MemberResponseDto memberResponseDto = memberInfoService.searchMemberInfo(memberInfoDto.getMemberId());
        return ApiResponse.ok(memberResponseDto);
    }

    @Operation(summary = "멤버 역할 선택 API", description = "멤버 역할 선택 API")
    @PostMapping("/role")
    public ApiResponse<String> selectMemberRole(@RequestBody MemberRoleDto.Request request,
                                                @MemberInfo MemberInfoDto memberInfoDto) {
        memberRoleService.updateRole(memberInfoDto.getMemberId(), request.getRole());
        return ApiResponse.ok("success");
    }

}
