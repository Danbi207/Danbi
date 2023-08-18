package com.danbi.api.preset.controller;

import com.danbi.api.ApiResponse;
import com.danbi.api.preset.dto.*;
import com.danbi.api.preset.service.PresetManageService;
import com.danbi.global.resolver.memberinfo.MemberInfo;
import com.danbi.global.resolver.memberinfo.MemberInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;

@Tag(name = "Preset", description = "프리셋")
@RestController
@RequestMapping("/api/v1/preset")
@RequiredArgsConstructor
public class PresetController {

    private final PresetManageService presetManageService;

    @Operation(summary = "프리셋 1개 생성 및 저장 API", description = "프리셋 저장")
    @PostMapping("/create")
    public ApiResponse<PresetCreateDto.Response> createPreset(@Valid @RequestBody PresetCreateDto.Request requestDto,
                                                                 @MemberInfo MemberInfoDto memberInfoDto) {
        PresetCreateDto.Response response = presetManageService.createPreset(requestDto, memberInfoDto.getMemberId());
        return ApiResponse.ok(response);
    }

    @Operation(summary = "프리셋 1개 상세 조회 API", description = "프리셋 1개 조회")
    @GetMapping("/{presetId}")
    public ApiResponse<PresetQueryResponseDto> getPreset(@PathVariable Long presetId,
                                 @MemberInfo MemberInfoDto memberInfoDto) {
        PresetQueryResponseDto response = presetManageService.getPreset(presetId, memberInfoDto.getMemberId());
        return ApiResponse.ok(response);
    }

    @Operation(summary = "프리셋 목록 조회 API", description = "프리셋 목록 조회")
    @GetMapping
    public ApiResponse<PresetListQueryResponseDto> getPresetList(@MemberInfo MemberInfoDto memberInfoDto) {

        PresetListQueryResponseDto response = presetManageService.getPresetList(memberInfoDto.getMemberId());
        return ApiResponse.ok(response);
    }

    @Operation(summary = "프리셋 1개 내용 수정 API", description = "프리셋 수정")
    @PostMapping("/update/{presetId}")
    public ApiResponse<PresetUpdateDto.Response> updatePreset(@PathVariable Long presetId,
                                                                 @RequestBody PresetUpdateDto.Request requestDto,
                                                                 @MemberInfo MemberInfoDto memberInfoDto) {
        PresetUpdateDto.Response response = presetManageService.modifyPresetBody(presetId,
                                                                                requestDto,
                                                                                memberInfoDto.getMemberId());
        return ApiResponse.ok(response);
    }

    @Operation(summary = "프리셋 순서 수정 API", description = "프리셋 순서 수정")
    @PostMapping("/sequence")
    public ApiResponse<PresetSequenceUpdateDto.Response> updatePresetSequence(@RequestBody PresetSequenceUpdateDto.Request requestDto,
                                                                                 @MemberInfo MemberInfoDto memberInfoDto) {
        PresetSequenceUpdateDto.Response response = presetManageService.updateSequence(requestDto, memberInfoDto.getMemberId());
        return ApiResponse.ok(response);
    }

    @Operation(summary = "프리셋 삭제 API", description = "프리셋 삭제")
    @DeleteMapping("/{presetId}")
    public ApiResponse<String> deletePreset(@PathVariable Long presetId,
                                               @MemberInfo MemberInfoDto memberInfoDto) {
        presetManageService.deletePreset(presetId, memberInfoDto.getMemberId());
        return ApiResponse.ok("삭제 완료");
    }

}
