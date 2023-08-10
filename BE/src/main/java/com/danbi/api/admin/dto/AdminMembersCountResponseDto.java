package com.danbi.api.admin.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class AdminMembersCountResponseDto {

    private int count;

    private List<AdminMemberResponseDto> data;
}
