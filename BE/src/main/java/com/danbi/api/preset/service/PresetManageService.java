package com.danbi.api.preset.service;

import com.danbi.api.preset.dto.PresetCreateDto;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import com.danbi.domain.preset.entity.Preset;
import com.danbi.domain.preset.service.PresetService;
import com.danbi.domain.profile.entity.Profile;
import com.danbi.domain.profile.service.ProfileService;
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

}
