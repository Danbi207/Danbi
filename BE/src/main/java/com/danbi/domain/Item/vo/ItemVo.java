package com.danbi.domain.Item.vo;

import com.danbi.domain.Item.constant.Color;
import com.danbi.domain.Item.constant.Rank;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@AllArgsConstructor
@Builder
public class ItemVo {

    private Color color;
    private Rank rank;
}
