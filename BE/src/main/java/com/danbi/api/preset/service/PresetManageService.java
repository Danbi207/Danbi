package com.danbi.api.preset.service;

import com.danbi.api.preset.dto.PresetCreateDto;
import com.danbi.api.preset.dto.PresetUpdateDto;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import com.danbi.domain.preset.dto.PresetDto;
import com.danbi.domain.preset.entity.Preset;
import com.danbi.domain.preset.service.PresetService;
import com.danbi.domain.profile.entity.Profile;
import com.danbi.domain.profile.service.ProfileService;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.mismatch.PresetMisMatchMemberException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class PresetManageService {

    private final PresetService presetService;
    private final MemberService memberService;
    private final ProfileService profileService;

    @Transactional
    public PresetCreateDto.Response createPreset(PresetCreateDto.Request request, Long memberId) {

        Member member = memberService.findByMemberId(memberId);
        Profile profile = profileService.getProfileByMember(member);
        Preset preset = Preset.builder()
                .profile(profile)
                .title(request.getTitle())
                .content(request.getContent())
                .sequence(request.getSequence())
                .activeFlag(true)
                .build();

        Preset savedPreset = presetService.savePreset(preset);

        return PresetCreateDto.Response.builder()
                .id(savedPreset.getId())
                .title(savedPreset.getTitle())
                .content(savedPreset.getContent())
                .sequence(savedPreset.getSequence())
                .build();
    }

    @Transactional
    public PresetUpdateDto.Response modifyPresetBody(Long presetId, PresetUpdateDto.Request request, Long memberId) {

        PresetDto presetDto = PresetDto.builder()
                .title(request.getTitle())
                .content(request.getContent())
                .sequence(request.getSequence())
                .build();

        Profile profile = memberService.findByMemberId(memberId).getProfile();
        Preset preset = presetService.findById(presetId);

        if(!preset.checkProfile(profile)) {
            throw new PresetMisMatchMemberException(ErrorCode.PRESET_MISMATCH_MEMBER);
        }

        Preset updatedPreset = presetService.update(presetDto, preset);
        return PresetUpdateDto.Response.builder()
                .id(updatedPreset.getId())
                .title(updatedPreset.getTitle())
                .content(updatedPreset.getContent())
                .sequence(updatedPreset.getSequence())
                .build();
    }

}
