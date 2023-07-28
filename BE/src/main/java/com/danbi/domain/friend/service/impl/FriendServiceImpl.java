package com.danbi.domain.friend.service.impl;

import com.danbi.domain.friend.constant.State;
import com.danbi.domain.friend.constant.Type;
import com.danbi.domain.friend.entity.Friend;
import com.danbi.domain.friend.repository.FriendRepository;
import com.danbi.domain.friend.service.FriendService;
import com.danbi.domain.member.entity.Member;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.BusinessException;
import com.danbi.global.error.exception.notfound.FriendNotFoundException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import java.util.List;
import java.util.Optional;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FriendServiceImpl implements FriendService {

    @PersistenceContext
    private final EntityManager em;
    private final FriendRepository friendRepository;


    @Override
    public Friend saveFriend(Friend friend) {
        validateDuplicateFriend(friend);
        return friendRepository.save(friend);
    }

    @Override
    public Friend updateFriend(Long id, Friend friend) {
        Friend updateFriend = getFriendById(id);
        updateFriend.update(friend);
        em.flush();
        return updateFriend;
    }

    @Override
    public void deleteFriend(Long id) {
        Friend deleteFriend = getFriendById(id);
        if (deleteFriend.getState() == State.DESTROY) {
            throw new BusinessException(ErrorCode.FRIEND_NOT_EXISTS);
        }
        deleteFriend.delete();
    }

    @Override
    @Transactional(readOnly = true)
    public Friend getFriendById(Long id) {
        return friendRepository.findById(id)
                .orElseThrow(() -> new FriendNotFoundException(ErrorCode.FRIEND_NOT_EXISTS));
    }

    @Override
    @Transactional(readOnly = true)
    public List<Friend> getFriendByFromAndType(Member from, Type type) {
        return friendRepository.findAllByFromAndTypeAndState(from, type, State.ACTIVATE);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Friend> getFriendByToAndType(Member to, Type type) {
        return friendRepository.findAllByToAndTypeAndState(to, type, State.ACTIVATE);
    }

    @Override
    @Transactional(readOnly = true)
    public Optional<Friend> getFriendByFromAndTo(Member from, Member to) {
        return friendRepository.findByFromAndToAndState(from, to, State.ACTIVATE);
    }

    @Override
    @Transactional(readOnly = true)
    public List<Friend> getFriendByFromOrToAndType(Member from, Member to) {
        return friendRepository.findAllByFromOrToAndTypeAndState(from, to, Type.PERMIT, State.ACTIVATE);
    }

    @Override
    @Transactional(readOnly = true)
    public void validateDuplicateFriend(Friend friend) {
        if (friendRepository.existsByFromAndToAndState(friend.getFrom(), friend.getTo(), State.ACTIVATE)) {
            throw new BusinessException(ErrorCode.ALREADY_REGISTERED_FRIEND);
        }
        if (friendRepository.existsByFromAndToAndState(friend.getTo(), friend.getFrom(), State.ACTIVATE)) {
            throw new BusinessException(ErrorCode.ALREADY_REGISTERED_FRIEND);
        }
    }


}
