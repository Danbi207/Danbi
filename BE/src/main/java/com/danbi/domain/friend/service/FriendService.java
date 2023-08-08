package com.danbi.domain.friend.service;


import com.danbi.domain.friend.constant.State;
import com.danbi.domain.friend.constant.Type;
import com.danbi.domain.friend.entity.Friend;
import com.danbi.domain.member.entity.Member;

import java.util.List;
import java.util.Optional;

public interface FriendService {


    Friend saveFriend(Friend friend);

    Friend updateFriend(Long id, Friend friend);

    void deleteFriend(Long id);

    Friend getFriendById(Long id);

    List<Friend> getFriendByFromAndType(Member from, Type type);

    List<Friend> getFriendByToAndType(Member to, Type type);

    Optional<Friend> getFriendByFromAndTo(Member from, Member to);

    List<Friend> getFriendByFromOrToAndType(Member from, Member to);

    void validateDuplicateFriend(Friend friend);
    public boolean isFriend(Friend friend);

    public boolean checkFriend(Long fromMemberId, Long toMemberId);
}
