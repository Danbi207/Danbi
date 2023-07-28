package com.danbi.api.friend.service;

import com.danbi.api.friend.dto.response.ResponseFriendDto;
import com.danbi.api.friend.dto.response.ResponseFriendListDto;

import java.util.List;

public interface FriendInfoService {

    // 친구요청보내기
    void requestFriend(Long from, Long to);

    // 친구요청받기
    void acceptFriend(Long from, Long to);

    //친구 삭제
    void deleteFriend(Long memberId, Long friendId);

    // 내가 보낸 친구요청 목록 조회
    ResponseFriendListDto searchMyWaitingRequests(Long memberId);

    // 친구요청 받은 목록 조회
    ResponseFriendListDto searchOtherWaitingRequests(Long memberId);

    // 내 친구 목록 조회
    ResponseFriendListDto searchMyFriend(Long memberId);

    public boolean isFriend(Long from, Long to);

}
