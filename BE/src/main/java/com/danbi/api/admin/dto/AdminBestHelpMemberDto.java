package com.danbi.api.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminBestHelpMemberDto {

    private Long memberId;
    private Long profileId;
    private String name;
    private String profileUrl;
    private Long helpCount;
}
