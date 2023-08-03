package com.danbi.api.member.controller;

import com.danbi.api.helppost.dto.HelpPostRequestDto;
import com.danbi.api.helppost.dto.HelpPostResponseDto;
import com.danbi.api.member.dto.MemberInfoResponseDto;
import com.danbi.api.member.dto.MemberResponseDto;
import com.danbi.api.member.service.MemberInfoService;
import com.danbi.global.jwt.service.TokenManager;
import com.danbi.global.resolver.MemberInfo;
import com.danbi.global.resolver.MemberInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Tag(name = "Member", description = "멤버 정보 요청")
@RestController
@RequestMapping("/api/v1/member")
@RequiredArgsConstructor
public class MemberInfoController {

    private final TokenManager tokenManager;
    private final MemberInfoService memberInfoService;

    @GetMapping("/info")
    public ResponseEntity<MemberInfoResponseDto> getMemberInfo(@MemberInfo MemberInfoDto memberInfoDto) {

        Long memberId = memberInfoDto.getMemberId();
        MemberInfoResponseDto memberInfoResponseDto = memberInfoService.getMemberInfo(memberId);

        return ResponseEntity.ok(memberInfoResponseDto);
    }

    @Operation(summary = "멤버 정보 조회 API", description = "멤버 정보 조회 API")
    @GetMapping("")
    public ResponseEntity<MemberResponseDto> createHelpPost(@MemberInfo MemberInfoDto memberInfoDto) {
        MemberResponseDto memberResponseDto = memberInfoService.searchMemberInfo(memberInfoDto.getMemberId());
        return ResponseEntity.ok(memberResponseDto);
    }

}
