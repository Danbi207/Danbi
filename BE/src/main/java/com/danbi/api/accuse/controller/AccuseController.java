package com.danbi.api.accuse.controller;

import com.danbi.api.accuse.dto.accuse.AccuseRequestDto;
import com.danbi.api.accuse.dto.accuse.AccuseResponseDto;
import com.danbi.api.accuse.dto.detail.AccuseDetailResponseDto;
import com.danbi.api.accuse.dto.myAccuse.MyAccuseListDto;
import com.danbi.api.accuse.dto.myAccuseStack.MyAccuseStackListDto;
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
    public ResponseEntity<AccuseResponseDto> accuse(@MemberInfo MemberInfoDto memberInfoDto, @RequestBody AccuseRequestDto accuseRequestDto) {
        AccuseResponseDto accuse = accuseInfoService.accuse(accuseRequestDto, memberInfoDto.getMemberId());
        return ResponseEntity.ok(accuse);
    }

    @Operation(summary = "회원 신고 취소 API", description = "회원 신고 취소 API")
    @PostMapping("/cancel/{accuse_id}") // 신고자와 요청자 검증
    public ResponseEntity<String> cancelAccuse(@PathVariable Long accuse_id ,@MemberInfo MemberInfoDto memberInfoDto) {
        accuseInfoService.cancelAccuse(accuse_id, memberInfoDto.getMemberId());
        return ResponseEntity.ok("신고 취소 되었습니다.");
    }

    @Operation(summary = "내가 신고한 목록 조회 API", description = "내가 신고한 목록 조회 API")
    @GetMapping("/history")
    public ResponseEntity<MyAccuseListDto> myAccuseList(@MemberInfo MemberInfoDto memberInfoDto) {
        MyAccuseListDto myAccuseListDto = accuseInfoService.myAccuseList(memberInfoDto.getMemberId());
        return ResponseEntity.ok(myAccuseListDto);
    }

    @Operation(summary = "내가 신고당한 목록 조회 API", description = "내가 신고당한 목록 조회 API")
    @GetMapping("/score")
    public ResponseEntity<MyAccuseStackListDto> myAccuseStackList(@MemberInfo MemberInfoDto memberInfoDto) {
        MyAccuseStackListDto myAccuseStackListDto = accuseInfoService.myAccuseStackList(memberInfoDto.getMemberId());
        return ResponseEntity.ok(myAccuseStackListDto);
    }

    @Operation(summary = "신고 상세 조회 API", description = "신고 상세 조회 API")
    @GetMapping("/{accuse_id}")
    public ResponseEntity<AccuseDetailResponseDto> detailAccuse(@PathVariable Long accuse_id) {
        AccuseDetailResponseDto accuseDetailResponseDto = accuseInfoService.detailAccuse(accuse_id);
        return ResponseEntity.ok(accuseDetailResponseDto);
    }

    @Operation(summary = "신고 승인 API", description = "신고 승인 API")
    @GetMapping("/approval/{accuse_id}")
    public ResponseEntity<String> approveAccuse(@PathVariable Long accuse_id) {
        accuseInfoService.approveAccuse(accuse_id);
        return ResponseEntity.ok("승인 되었습니다.");
    }

}
