package com.danbi.api.accuse.controller;

import com.danbi.api.accuse.dto.accuse.AccuseRequestDto;
import com.danbi.api.accuse.dto.accuse.AccuseResponseDto;
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
    @PostMapping("")
    public ResponseEntity<AccuseResponseDto> accuse(@MemberInfo MemberInfoDto memberInfoDto, @RequestBody AccuseRequestDto accuseRequestDto) {
        AccuseResponseDto accuse = accuseInfoService.accuse(accuseRequestDto, memberInfoDto.getMemberId());
        return ResponseEntity.ok(accuse);
    }

    @Operation(summary = "회원 신고 취소 API", description = "회원 신고 취소 API")
    @PostMapping("/cancel/{accuse_id}") // TODO : 후에 신고자와 취소자 동일한지 검증 필요
    public ResponseEntity<String> cancelAccuse(@PathVariable Long accuse_id ,@MemberInfo MemberInfoDto memberInfoDto, @RequestBody AccuseRequestDto accuseRequestDto) {
        accuseInfoService.cancelAccuse(accuse_id);
        return ResponseEntity.ok("신고 성공 하였습니다.");
    }

    @Operation(summary = "내가 신고한 목록 조회 API", description = "내가 신고한 목록 조회 API")
    @PostMapping("/history") //
    public ResponseEntity<String> myAccuseList(@MemberInfo MemberInfoDto memberInfoDto, @RequestBody AccuseRequestDto accuseRequestDto) {

        return ResponseEntity.ok("신고 성공 하였습니다.");
    }

}
