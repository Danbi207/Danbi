package com.danbi.api.item.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
@AllArgsConstructor
public class ItemResponseDto {

    private ItemDto item;
    private Long dewPoint;
}
