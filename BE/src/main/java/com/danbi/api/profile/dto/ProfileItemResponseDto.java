package com.danbi.api.profile.dto;

import com.danbi.domain.Item.constant.Color;
import com.danbi.domain.Item.constant.Ranking;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class ProfileItemResponseDto {

    private String ranking;
    private String color;
}
