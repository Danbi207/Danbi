package com.danbi.domain.profile.dto;

import com.danbi.domain.Item.constant.Color;
import com.danbi.domain.Item.constant.Ranking;
import com.danbi.domain.Item.entity.Item;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ProfileQueryDto {

    private Long profileId;
    private String name;
    private String profileUrl;
    private int accusePoint;
    private Long dewPoint;

    private Ranking ranking;
    private Color color;

}
