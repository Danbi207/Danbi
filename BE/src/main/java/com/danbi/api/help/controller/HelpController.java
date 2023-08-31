package com.danbi.api.help.controller;

import com.danbi.api.ApiResponse;
import com.danbi.api.help.dto.assign.HelpAssignDto;
import com.danbi.api.help.service.HelpInfoService;
import com.danbi.domain.alarm.constant.Type;
import com.danbi.global.aop.NotificationTrace;
import com.danbi.global.resolver.memberinfo.MemberInfo;
import com.danbi.global.resolver.memberinfo.MemberInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
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

    @NotificationTrace(type = Type.HELP_MATCHING)
    @Operation(summary = "도움 헬퍼 배정 API", description = "도움 헬퍼 배정 API")
    @PostMapping("/{helpPostId}") // TODO : Ip와 요청자가 동일한지 검증 필요?
    public ApiResponse<HelpAssignDto> assignHelper(@PathVariable Long helpPostId,
                                                   @MemberInfo MemberInfoDto memberInfoDto) {
        HelpAssignDto helperAssign = helpInfoService.assignHelper(helpPostId, memberInfoDto.getMemberId());
        return ApiResponse.ok(helperAssign);
    }

    @NotificationTrace(type = Type.HELP_CANCEL)
    @Operation(summary = "도움 취소 API", description = "도움 취소 API")
    @PostMapping("/cancel/{helpId}")
    public ApiResponse<String> cancelHelp(@PathVariable Long helpId) {
        helpInfoService.cancelHelp(helpId);
        return ApiResponse.ok("도움 취소 완료하였습니다.");
    }

    @NotificationTrace(type = Type.HELP_IP_COMPLETE)
    @Operation(summary = "IP 도움 완료 API", description = "IP 도움 완료 API")
    @PostMapping("/success/ip/{helpId}")
    public ApiResponse<String> ipCompleteHelp(@PathVariable Long helpId,
                                                 @MemberInfo MemberInfoDto memberInfoDto) {
        helpInfoService.ipCompleteHelp(helpId, memberInfoDto.getMemberId());
        return ApiResponse.ok("도움 완료 승인하였습니다.");
    }

    @NotificationTrace(type = Type.HELP_HELPER_COMPLETE)
    @Operation(summary = "Helper 도움 완료 API", description = "Helper 도움 완료 API")
    @PostMapping("/success/helper/{helpId}")
    public ApiResponse<String> helperCompleteHelp(@PathVariable Long helpId,
                                                     @MemberInfo MemberInfoDto memberInfoDto) {
        helpInfoService.helperCompleteHelp(helpId, memberInfoDto.getMemberId());
        return ApiResponse.ok("도움 완료 승인하였습니다.");
    }

}
