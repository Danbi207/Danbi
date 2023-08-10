package com.danbi.api.accuse.controller;

import com.danbi.api.ApiResponse;
import com.danbi.api.accuse.dto.accuse.AccuseRequestDto;
import com.danbi.api.accuse.dto.accuse.AccuseResponseDto;
import com.danbi.api.accuse.dto.detail.AccuseDetailResponseDto;
import com.danbi.api.accuse.service.AccuseInfoService;
import com.danbi.domain.alarm.constant.Type;
import com.danbi.global.aop.NotificationTrace;
import com.danbi.global.resolver.memberinfo.MemberInfo;
import com.danbi.global.resolver.memberinfo.MemberInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@Tag(name = "Accuse", description = "신고")
@RestController
@RequestMapping("/api/v1/accuse")
@RequiredArgsConstructor
public class AccuseController {

    private final AccuseInfoService accuseInfoService;

    @NotificationTrace(type = Type.ACCUSE_SENT)
    @Operation(summary = "회원 신고 API", description = "회원 신고 API")
    @PostMapping(value = "", consumes = {MediaType.APPLICATION_JSON_VALUE, MediaType.MULTIPART_FORM_DATA_VALUE})
    public ApiResponse<AccuseResponseDto> accuse(@MemberInfo MemberInfoDto memberInfoDto,
                                                 @RequestPart("accuseRequestDto") AccuseRequestDto accuseRequestDto,
                                                 @RequestPart("file") List<MultipartFile> uploadFiles) {
        AccuseResponseDto accuse = accuseInfoService.accuse(accuseRequestDto, memberInfoDto.getMemberId(), uploadFiles);
        return ApiResponse.ok(accuse);
    }


    @Operation(summary = "신고 상세 조회 API", description = "신고 상세 조회 API")
    @GetMapping("/{accuseId}")
    public ApiResponse<AccuseDetailResponseDto> detailAccuse(@PathVariable Long accuseId) {
        AccuseDetailResponseDto accuseDetailResponseDto = accuseInfoService.detailAccuse(accuseId);
        return ApiResponse.ok(accuseDetailResponseDto);
    }

    @NotificationTrace(type = Type.ACCUSE_PERMIT)
    @Operation(summary = "신고 승인 API", description = "신고 승인 API")
    @GetMapping("/approval/{accuseId}")
    public ApiResponse<String> approveAccuse(@PathVariable Long accuseId) {
        accuseInfoService.approveAccuse(accuseId);
        return ApiResponse.ok("승인 되었습니다.");
    }

}
