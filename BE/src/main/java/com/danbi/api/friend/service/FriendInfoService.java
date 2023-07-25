package com.danbi.api.friend.service;

import com.danbi.api.friend.dto.ResponseFriendDto;
import com.danbi.domain.friend.entity.Friend;

import java.util.List;

public interface FriendInfoService {

    // 친구요청보내기
    void requestFriend(Long memberId);

    // 친구요청받기
    void acceptFriend(Long memberId);

    //친구 삭제
    void deleteFriend(Long id);

    // 친구요청 보낸 목록 조회
    List<ResponseFriendDto> searchMyWaitingRequests(Long id);

    // 친구요청 받은 목록 조회
    List<ResponseFriendDto> searchOtherWaitingRequests(Long memberId);

    // 내 친구 목록 조회
    List<ResponseFriendDto> searchMyFriend(Long memberId);
}
