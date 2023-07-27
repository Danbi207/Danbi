package com.danbi.api.preset.controller;

import com.danbi.api.preset.dto.PresetCreateDto;
import com.danbi.api.preset.service.PresetManageService;
import com.danbi.global.resolver.MemberInfo;
import com.danbi.global.resolver.MemberInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Preset", description = "프리셋")
@RestController
@RequestMapping("/api/v1/preset")
@RequiredArgsConstructor
public class PresetController {

    private final PresetManageService presetManageService;

    @Operation(summary = "프리셋 1개 생성 및 저장 API", description = "프리셋 저장")
    @PostMapping("/create")
    public ResponseEntity<PresetCreateDto.Response> createPreset(@RequestBody PresetCreateDto.Request requestDto,
                                                                 @MemberInfo MemberInfoDto memberInfoDto) {
        PresetCreateDto.Response response = presetManageService.createPreset(requestDto, memberInfoDto.getMemberId());
        return ResponseEntity.ok(response);
    }

}
