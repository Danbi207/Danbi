package com.danbi.api.friend.service.impl;

import com.danbi.api.friend.dto.response.ResponseFriendDto;
import com.danbi.api.friend.dto.response.ResponseFriendListDto;
import com.danbi.api.friend.service.FriendInfoService;
import com.danbi.domain.friend.constant.State;
import com.danbi.domain.friend.constant.Type;
import com.danbi.domain.friend.entity.Friend;
import com.danbi.domain.friend.service.FriendService;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import com.danbi.domain.profile.service.ProfileService;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.BusinessException;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@Transactional
@RequiredArgsConstructor
public class FriendInfoServiceImpl implements FriendInfoService {

    private final FriendService friendService;
    private final MemberService memberService;
    private final ProfileService profileService;

    @Override
    public void requestFriend(Long from, Long to) {
        Member fromMember = memberService.findByMemberId(from);
        Member toMember = memberService.findByMemberId(to);
        if (friendService.getFriendByFromAndTo(fromMember, toMember).isPresent()) {
            throw new BusinessException(ErrorCode.ALREADY_REGISTERED_FRIEND);
        }
        if (friendService.getFriendByFromAndTo(toMember, fromMember).isPresent()) {
            throw new BusinessException(ErrorCode.ALREADY_REGISTERED_FRIEND);
        }
        Friend friend = Friend.builder()
                .from(fromMember)
                .to(toMember)
                .type(Type.WAIT)
                .state(State.ACTIVATE)
                .build();

        friendService.saveFriend(friend);
    }

    @Override
    public void acceptFriend(Long from, Long to) {
        Member fromMember = memberService.findByMemberId(from);
        Member toMember = memberService.findByMemberId(to);

        Friend friend = friendService.getFriendByFromAndTo(fromMember, toMember).orElseThrow(
                () -> new BusinessException(ErrorCode.FRIEND_NOT_EXISTS)
        );

        Friend updateFriend = Friend.builder()
                .from(fromMember)
                .to(toMember)
                .type(Type.PERMIT)
                .state(State.ACTIVATE)
                .build();

        friendService.updateFriend(friend.getId(), updateFriend);

    }

    @Override
    public void deleteFriend(Long memberId, Long friendId) {
        Friend friend = friendService.getFriendById(friendId);

        if (friend.getFrom().getId() != memberId && friend.getTo().getId() != memberId) {
            throw new BusinessException(ErrorCode.NOT_MY_FRIEND);
        }

        friendService.deleteFriend(friendId);
    }

    @Override
    public ResponseFriendListDto searchMyWaitingRequests(Long memberId) {
        Member member = memberService.findByMemberId(memberId);
        List<Friend> friendList = friendService.getFriendByToAndType(member, Type.WAIT);

        List<ResponseFriendDto> result = new ArrayList<>();
        for (Friend friend : friendList) {
            ResponseFriendDto responseFriendDto = ResponseFriendDto.builder()
                            .profileUrl(friend.getFrom().getProfileUrl())
                            .name(friend.getFrom().getName())
                            .dewPoint(-1L)
                            .build();
            result.add(responseFriendDto);
        }

        return ResponseFriendListDto.builder().result(result).build();

    }

    @Override
    public ResponseFriendListDto searchOtherWaitingRequests(Long memberId) {
        Member member = memberService.findByMemberId(memberId);
        List<Friend> friendList = friendService.getFriendByFromAndType(member, Type.WAIT);

        List<ResponseFriendDto> result = new ArrayList<>();
        for (Friend friend : friendList) {
            ResponseFriendDto responseFriendDto = ResponseFriendDto.builder()
                    .profileUrl(friend.getTo().getProfileUrl())
                    .name(friend.getTo().getName())
                    .dewPoint(-1L)
                    .build();
            result.add(responseFriendDto);
        }

        return ResponseFriendListDto.builder().result(result).build();
    }

    @Override
    public ResponseFriendListDto searchMyFriend(Long memberId) {
        Member member = memberService.findByMemberId(memberId);
        List<Friend> friendList = friendService.getFriendByFromAndType(member, Type.PERMIT);

        List<ResponseFriendDto> result = new ArrayList<>();
        for (Friend friend : friendList) {
            ResponseFriendDto responseFriendDto = ResponseFriendDto.builder()
                    .profileUrl(friend.getTo().getProfileUrl())
                    .name(friend.getTo().getName())
                    .dewPoint(-1L)
                    .build();
            result.add(responseFriendDto);
        }

        friendList = friendService.getFriendByToAndType(member, Type.PERMIT);
        for (Friend friend : friendList) {
            ResponseFriendDto responseFriendDto = ResponseFriendDto.builder()
                    .profileUrl(friend.getFrom().getProfileUrl())
                    .name(friend.getFrom().getName())
                    .dewPoint(-1L)
                    .build();
            result.add(responseFriendDto);
        }

        return ResponseFriendListDto.builder().result(result).build();
    }
}
