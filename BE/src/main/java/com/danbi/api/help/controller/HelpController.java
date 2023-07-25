package com.danbi.api.help.controller;

import com.danbi.api.help.dto.assign.HelpAssignDto;
import com.danbi.api.help.service.HelpInfoService;
import com.danbi.api.hleppost.dto.HelpPostRequestDto;
import com.danbi.api.hleppost.dto.HelpPostResponseDto;
import com.danbi.domain.help.service.HelpService;
import com.danbi.domain.member.entity.Member;
import com.danbi.global.resolver.MemberInfo;
import com.danbi.global.resolver.MemberInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Help", description = "도움 게시글")
@RestController
@RequestMapping("/api/v1/help")
@RequiredArgsConstructor
public class HelpController {

    private final HelpInfoService helpInfoService;

    @Operation(summary = "도움 헬퍼 배정 API", description = "도움 헬퍼 배정 API")
    @PostMapping("/{helppost_id}/start")
    public ResponseEntity<HelpAssignDto> assignHelper(@PathVariable Long helppost_id, @MemberInfo MemberInfoDto memberInfoDto) {
        HelpAssignDto helperAssign = helpInfoService.assignHelper(helppost_id, memberInfoDto.getMemberId());
        return ResponseEntity.ok(helperAssign);
    }


    @Operation(summary = "도움 취소 API", description = "도움 취소 API")
    @PostMapping("/{help_id}/cancel")
    public ResponseEntity<String> cancelHelp(@PathVariable Long help_id) { // TODO : 후에 help의 helper와 id가 동일한지 검증
        helpInfoService.cancelHelp(help_id);
        return ResponseEntity.ok("도움 취소 완료하였습니다.");
    }

    @Operation(summary = "IP 도움 완료 API", description = "IP 도움 완료 API")
    @PostMapping("/success/ip/{help_id}")
    public ResponseEntity<String> ipCompleteHelp(@PathVariable Long help_id) { // TODO : 후에 help의 helper와 id가 동일한지 검증
        helpInfoService.ipCompleteHelp(help_id);
        return ResponseEntity.ok("도움 완료 승인하였습니다.");
    }

    @Operation(summary = "Helper 도움 완료 API", description = "Helper 도움 완료 API")
    @PostMapping("/success/helper/{help_id}")
    public ResponseEntity<String> helperCompleteHelp(@PathVariable Long help_id) { // TODO : 후에 help의 helper와 id가 동일한지 검증
        helpInfoService.helperCompleteHelp(help_id);
        return ResponseEntity.ok("도움 완료 승인하였습니다.");
    }

}
