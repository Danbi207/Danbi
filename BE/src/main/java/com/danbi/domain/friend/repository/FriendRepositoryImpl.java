package com.danbi.domain.friend.repository;

import com.danbi.domain.friend.constant.State;
import com.danbi.domain.friend.constant.Type;
import com.danbi.domain.friend.entity.Friend;
import com.danbi.domain.friend.entity.QFriend;
import com.querydsl.jpa.impl.JPAQueryFactory;
import lombok.RequiredArgsConstructor;

import java.util.Optional;

import static com.danbi.domain.friend.entity.QFriend.friend;


@RequiredArgsConstructor
public class FriendRepositoryImpl implements FriendRepositoryCustom{

    private final JPAQueryFactory jpaQueryFactory;

    @Override
    public Optional<Friend> searchFriendByFromAndTo(Long fromMemberId, Long toMemberId) {
        Friend friend = jpaQueryFactory.selectFrom(QFriend.friend)
                .where(
                        QFriend.friend.from.id.eq(fromMemberId).and(QFriend.friend.to.id.eq(toMemberId))
                                .or(QFriend.friend.from.id.eq(toMemberId).and(QFriend.friend.to.id.eq(fromMemberId))),
                        QFriend.friend.state.eq(State.ACTIVATE),
                        QFriend.friend.type.eq(Type.PERMIT)
                ).fetchOne();
        return Optional.ofNullable(friend);
    }
}
