package com.danbi.api.friend.controller;

import com.danbi.api.friend.dto.request.RequestFriendDto;
import com.danbi.api.friend.service.FriendInfoService;
import com.danbi.global.resolver.MemberInfo;
import com.danbi.global.resolver.MemberInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Tag(name = "Friend", description = "친구 관계")
@RestController
@RequestMapping("api/v1/friends")
@AllArgsConstructor
public class FriendController {

    private final FriendInfoService friendInfoService;

    @Operation(summary = "친구 요청 보내기 API", description = "친구 요청 보내기 API")
    @PostMapping
    void requestFriend(@MemberInfo MemberInfoDto memberInfoDto, @RequestBody RequestFriendDto requestFriendDto){
        friendInfoService.requestFriend(memberInfoDto.getMemberId(), requestFriendDto.getTargetId());
    }


}
