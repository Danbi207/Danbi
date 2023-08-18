package com.danbi.domain.friend.repository;

import com.danbi.domain.friend.constant.State;
import com.danbi.domain.friend.constant.Type;
import com.danbi.domain.friend.entity.Friend;
import com.danbi.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface FriendRepository extends JpaRepository<Friend, Long>, FriendRepositoryCustom {


    boolean existsByFromAndToAndTypeAndState(Member from, Member to, Type type, State state);
    boolean existsByFromAndToAndState(Member from, Member to, State state);
    List<Friend> findAllByFromAndTypeAndState(Member from, Type type, State state);

    List<Friend> findAllByToAndTypeAndState(Member to, Type type, State state);

    Optional<Friend> findByFromAndToAndState(Member from, Member to, State state);

    List<Friend> findAllByFromOrToAndTypeAndState(Member from, Member to, Type type, State state);

}
