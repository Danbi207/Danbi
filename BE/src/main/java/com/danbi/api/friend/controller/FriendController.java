package com.danbi.api.friend.controller;

import com.danbi.api.friend.dto.request.RequestFriendDto;
import com.danbi.api.friend.dto.response.ResponseFriendListDto;
import com.danbi.api.friend.service.FriendInfoService;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.BusinessException;
import com.danbi.global.resolver.MemberInfo;
import com.danbi.global.resolver.MemberInfoDto;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.AllArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@Tag(name = "Friend", description = "친구 관계")
@RestController
@RequestMapping("api/v1/friends")
@AllArgsConstructor
public class FriendController {

    private final FriendInfoService friendInfoService;

    @Operation(summary = "친구 요청 보내기 API", description = "친구 요청 보내기 API")
    @PostMapping
    public ResponseEntity<String> requestFriend(@MemberInfo MemberInfoDto memberInfoDto, @RequestBody RequestFriendDto requestFriendDto) {
        friendInfoService.requestFriend(memberInfoDto.getMemberId(), requestFriendDto.getTargetId());
        return ResponseEntity.ok("친구요청에 성공했습니다.");
    }

    @Operation(summary = "친구 요청 수락 API", description = "친구 요청 수락 API")
    @PostMapping("/permit")
    public ResponseEntity<String> acceptFriend(@MemberInfo MemberInfoDto memberInfoDto, @RequestBody RequestFriendDto requestFriendDto) {
        if (memberInfoDto.getMemberId() == requestFriendDto.getTargetId()) {
            throw new BusinessException(ErrorCode.NOT_MY_FRIEND_REQUEST);
        }
        friendInfoService.acceptFriend(requestFriendDto.getTargetId(), memberInfoDto.getMemberId());
        return ResponseEntity.ok("친구요청 승인에 성공했습니다.");
    }

    @Operation(summary = "친구관계 삭제 API", description = "친구관계 삭제 API")
    @PostMapping("/delete/{friend_id}")
    public ResponseEntity<String> deleteFriend(@MemberInfo MemberInfoDto memberInfoDto, @PathVariable Long friend_id) {
        friendInfoService.deleteFriend(memberInfoDto.getMemberId(), friend_id);
        return ResponseEntity.ok("친구요청 삭제에 성공했습니다.");
    }

    @Operation(summary = "친구요청 보낸 목록 조회API", description = "친구요청 보낸 목록 조회")
    @GetMapping("/requests")
    public ResponseEntity<ResponseFriendListDto> searchMyWaitingRequests(@MemberInfo MemberInfoDto memberInfoDto) {
        ResponseFriendListDto responseFriendListDto = friendInfoService.searchMyWaitingRequests(memberInfoDto.getMemberId());
        return ResponseEntity.ok(responseFriendListDto);
    }

    @Operation(summary = "친구요청 받은 목록 조회API", description = "친구요청 받은 목록 조회")
    @GetMapping("/responses")
    public ResponseEntity<ResponseFriendListDto> searchOtherWaitingRequests(@MemberInfo MemberInfoDto memberInfoDto) {
        ResponseFriendListDto responseFriendListDto = friendInfoService.searchOtherWaitingRequests(memberInfoDto.getMemberId());
        return ResponseEntity.ok(responseFriendListDto);
    }

    @Operation(summary = "내 친구 목록 조회API", description = "내 친구 목록 조회")
    @GetMapping
    public ResponseEntity<ResponseFriendListDto> searchMyFriend(@MemberInfo MemberInfoDto memberInfoDto) {
        ResponseFriendListDto responseFriendListDto = friendInfoService.searchMyFriend(memberInfoDto.getMemberId());
        return ResponseEntity.ok(responseFriendListDto);
    }

    @Operation(summary = "내 친구인지 확인API", description = "내 친구인지 확인")
    @GetMapping("/{member_id}")
    public ResponseEntity<Boolean> isMyFriend(@MemberInfo MemberInfoDto memberInfoDto, @PathVariable("member_id") Long memberId) {
        return ResponseEntity.ok(friendInfoService.isFriend(memberInfoDto.getMemberId(), memberId));
    }
}