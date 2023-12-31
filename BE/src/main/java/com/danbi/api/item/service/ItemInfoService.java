package com.danbi.api.item.service;

import com.danbi.api.item.dto.ItemDto;
import com.danbi.api.item.dto.ItemResponseDto;
import com.danbi.domain.Item.entity.Item;
import com.danbi.domain.Item.service.ItemService;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import com.danbi.domain.point.service.PointService;
import com.danbi.domain.profile.entity.Profile;
import com.danbi.domain.profile.service.ProfileService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemInfoService {

    private final ItemService itemService;
    private final PointService pointService;
    private final ProfileService profileService;
    private final MemberService memberService;

    // 아이템 뽑기
    public ItemResponseDto pickItem(Long memberId) {

        Member member = memberService.findByMemberId(memberId);
        Profile profile = profileService.getProfileByMember(member);
        Item item = itemService.pickItem(profile);
        Long dewPoint = pointService.pickItem(profile);

        return ItemResponseDto.builder()
                .item(ItemDto.builder()
                        .ranking(item.getRanking().getTier())
                        .name(item.getColor().getName())
                        .checkedRgb(item.getColor().getCheckedRgb())
                        .uncheckedRgb(item.getColor().getUncheckedRgb()).build())
                .dewPoint(dewPoint).build();
    }
}
