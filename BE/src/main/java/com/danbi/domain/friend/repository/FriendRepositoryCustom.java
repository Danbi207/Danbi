package com.danbi.domain.friend.repository;

import com.danbi.domain.friend.entity.Friend;

import java.util.Optional;

public interface FriendRepositoryCustom {

    Optional<Friend> searchFriendByFromAndTo(Long fromMemberId, Long toMemberId);
}
