package com.danbi.api.item.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ItemDto {

    private String color;
    private String rank;
}
