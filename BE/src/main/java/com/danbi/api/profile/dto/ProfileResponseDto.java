package com.danbi.api.profile.dto;

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

    private boolean friendFlag;
    private boolean requestFriendFlag;
    private boolean requestedFriendFlag;
    private Long profileId;
    private Long guestBookId;
    private String name;
    private String profileUrl;
    private int accusePoint;
    private Long dewPoint;
    private Long accumulatePoint;

    private ProfileItemResponseDto item;
    private List<ProfileHelpResponseDto> helpLog;
    private List<ProfileCommentsResponseDto> comments;
}
