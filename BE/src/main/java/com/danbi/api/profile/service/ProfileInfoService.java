package com.danbi.api.profile.service;

import com.danbi.api.profile.dto.ProfileCommentsResponseDto;
import com.danbi.api.profile.dto.ProfileHelpResponseDto;
import com.danbi.api.profile.dto.ProfileItemResponseDto;
import com.danbi.api.profile.dto.ProfileResponseDto;
import com.danbi.domain.profile.dto.ProfileCommentsDto;
import com.danbi.domain.profile.dto.ProfileHelpDto;
import com.danbi.domain.profile.dto.ProfileQueryDto;
import com.danbi.domain.profile.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
@Transactional
public class ProfileInfoService {

    private final ProfileService profileService;

    public ProfileResponseDto searchProfile(Long memberId) {
        ProfileQueryDto profileInfo = profileService.getProfileInfo(memberId);
        List<ProfileHelpDto> profileHelpInfo = profileService.getProfileHelpInfo(memberId);
        List<ProfileCommentsDto> profileCommentInfo = profileService.getProfileCommentInfo(memberId);

        List<ProfileHelpResponseDto> helpDtos = new ArrayList<>();
        List<ProfileCommentsResponseDto> comments = new ArrayList<>();

        for (ProfileHelpDto helpResponseDto : profileHelpInfo) {
            helpDtos.add(ProfileHelpResponseDto.builder()
                    .helpId(helpResponseDto.getHelpId())
                    .createdTime(helpResponseDto.getCreatedTime()).build());
        }

        for (ProfileCommentsDto comment : profileCommentInfo) {
            comments.add(ProfileCommentsResponseDto.builder()
                    .name(comment.getName())
                    .profileUrl(comment.getProfileUrl())
                    .content(comment.getContent())
                    .createdTime(comment.getCreatedTime())
                    .updatedTime(comment.getUpdatedTime()).build());
        }

        return ProfileResponseDto.builder()
                .profileId(profileInfo.getProfileId())
                .guestBookId(profileInfo.getGuestBookId())
                .name(profileInfo.getName())
                .profileUrl(profileInfo.getProfileUrl())
                .accusePoint(profileInfo.getAccusePoint())
                .dewPoint(profileInfo.getDewPoint())
                .accumulatePoint(profileInfo.getAccumulatePoint())
                .item(ProfileItemResponseDto.builder()
                        .ranking(profileInfo.getRanking().getTier())
                        .name(profileInfo.getColor().getName())
                        .checkedRgb(profileInfo.getColor().getCheckedRgb())
                        .uncheckedRgb(profileInfo.getColor().getUncheckedRgb()).build())
                .helpLog(helpDtos)
                .comments(comments).build();
    }
}
