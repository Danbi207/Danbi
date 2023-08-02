package com.danbi.api.profile.dto;

import com.danbi.domain.Item.constant.Color;
import com.danbi.domain.Item.constant.Ranking;
import com.danbi.domain.profile.dto.ProfileCommentsDto;
import com.danbi.domain.profile.dto.ProfileHelpDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileResponseDto {

    private Long profileId;
    private String name;
    private String profileUrl;
    private int accusePoint;
    private Long dewPoint;

    private ProfileItemResponseDto item;
    private List<ProfileHelpResponseDto> helpLog;
    private List<ProfileCommentsResponseDto> comments;
}
