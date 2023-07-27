package com.danbi.api.item.controller;

import com.danbi.api.item.dto.ItemResponseDto;
import com.danbi.api.item.service.ItemInfoService;
import com.danbi.api.point.dto.AccumulatePointResponseDto;
import com.danbi.domain.member.entity.Member;
import com.danbi.global.resolver.MemberInfo;
import com.danbi.global.resolver.MemberInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Item", description = "아이템(잔디)")
@RestController
@RequestMapping("/api/v1/item")
@RequiredArgsConstructor
public class ItemController {

    private final ItemInfoService itemInfoService;

    @Operation(summary = "아이템 뽑기 API", description = "아이템 뽑기 API")
    @PostMapping("")  // TODO : 후에 토큰을 통한 유저정보 얻기 수정
    public ResponseEntity<ItemResponseDto> getAccumulatePoint(@MemberInfo MemberInfoDto memberInfoDto) {
        ItemResponseDto itemResponseDto = itemInfoService.pickItem(memberInfoDto.getMemberId());
        return ResponseEntity.ok(itemResponseDto);
    }
}
