package com.danbi.domain.friend.service.impl;

import com.danbi.domain.friend.constant.State;
import com.danbi.domain.friend.constant.Type;
import com.danbi.domain.friend.entity.Friend;
import com.danbi.domain.friend.repository.FriendRepository;
import com.danbi.domain.friend.service.FriendService;
import com.danbi.domain.member.constant.Gender;
import com.danbi.domain.member.constant.OauthType;
import com.danbi.domain.member.constant.Role;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.repository.MemberRepository;
import com.danbi.global.error.exception.BusinessException;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

import static org.assertj.core.api.Assertions.*;

@SpringBootTest
@Transactional
class FriendServiceImplTest {

    @Autowired
    private FriendService friendService;
    @Autowired
    private FriendRepository friendRepository;

    @Autowired
    private MemberRepository memberRepository;
    private Member fromMember;
    private Member toMember;
    private Friend savedFriend;


    @BeforeEach
    public void beforeEach() {

        fromMember = memberRepository.save(Member.builder()
                .name("member1")
                .nickname("nickname1")
                .email("fromMember1@adsf.com")
                .role(Role.ROLE_UNDEFINED)
                .gender(Gender.male)
                .oauthType(OauthType.KAKAO)
                .profileUrl("adsf")
                .build());


        toMember = memberRepository.save(Member.builder()
                .name("member1")
                .nickname("nickname1")
                .email("toMember1@adsf.com")
                .role(Role.ROLE_UNDEFINED)
                .gender(Gender.male)
                .oauthType(OauthType.KAKAO)
                .profileUrl("adsf")
                .build());

        Friend friend = Friend.builder()
                .from(fromMember)
                .to(toMember)
                .type(Type.WAIT)
                .state(State.ACTIVATE)
                .build();
         savedFriend = friendService.saveFriend(friend);
    }

    @DisplayName("친구 추가후, 친구 승인 대기")
    @Test
    void saveFriend() {

        Member fromMember = memberRepository.save(Member.builder()
                .name("member2")
                .nickname("nickname1")
                .email("fromMember2@adsf.com")
                .role(Role.ROLE_UNDEFINED)
                .gender(Gender.male)
                .oauthType(OauthType.KAKAO)
                .profileUrl("adsf")
                .build());


        Member toMember = memberRepository.save(Member.builder()
                .name("member2")
                .nickname("nickname1")
                .email("toMember2@adsf.com")
                .role(Role.ROLE_UNDEFINED)
                .gender(Gender.male)
                .oauthType(OauthType.KAKAO)
                .profileUrl("adsf")
                .build());

        //given
        Friend friend = Friend.builder()
                .from(fromMember)
                .to(toMember)
                .type(Type.WAIT)
                .state(State.ACTIVATE)
                .build();

        //when

        Friend savedFriend = friendService.saveFriend(friend);

        //then
        assertThat(savedFriend.getType()).isEqualTo(Type.WAIT);
        assertThat(savedFriend.getFrom().getId()).isEqualTo(fromMember.getId());
        assertThat(savedFriend.getTo().getId()).isEqualTo(toMember.getId());


    }


    @DisplayName("친구 추가된 친구에게 친구 요청 보내기 예외발생")
    @Test
    void saveFriendException() {
        //given
        //when
        Friend friend = Friend.builder()
                .from(fromMember)
                .to(toMember)
                .type(Type.WAIT)
                .state(State.ACTIVATE)
                .build();


        //then
        assertThatThrownBy(() -> friendService.saveFriend(friend))
                .isInstanceOf(BusinessException.class);

    }

    @DisplayName("친구요청 승인")
    @Test
    void updateFriend() {

        //given
        //when
        Friend newFriend = Friend.builder()
                .from(fromMember)
                .to(toMember)
                .type(Type.PERMIT)
                .state(State.ACTIVATE)
                .build();
        Friend updateFriend = friendService.updateFriend(savedFriend.getId(), newFriend);

        //then
        assertThat(updateFriend.getType()).isEqualTo(Type.PERMIT);
        assertThat(updateFriend.getFrom().getId()).isEqualTo(fromMember.getId());
        assertThat(updateFriend.getTo().getId()).isEqualTo(toMember.getId());

    }


    @DisplayName("친구관계 삭제")
    @Test
    void deleteFriend() {
        //given

        List<Friend> preFriendList = friendRepository.findAll();


        //when
        friendService.deleteFriend(savedFriend.getId());
        Friend deletedFriend = friendRepository.findById(savedFriend.getId()).get();

        //then
        List<Friend> postFriendList = friendRepository.findAll();
        assertThat(deletedFriend.getState()).isEqualTo(State.DESTROY);

    }

    @DisplayName("id로 친구관계 조회")
    @Test
    void getFriendById() {

        //given
        //when
        Friend findFriend = friendService.getFriendById(savedFriend.getId());

        //then
        assertThat(findFriend.getState()).isEqualTo(savedFriend.getState());
        assertThat(findFriend.getTo().getId()).isEqualTo(savedFriend.getTo().getId());
        assertThat(findFriend.getFrom().getId()).isEqualTo(savedFriend.getFrom().getId());
        assertThat(findFriend.getType()).isEqualTo(savedFriend.getType());
    }

    @Test
    void getFriendByFromAndType() {
        //given
        //when
        assertThat(friendService.getFriendByFromAndTo(fromMember, toMember).isPresent()
                || friendService.getFriendByFromAndTo(toMember, fromMember).isPresent()).isTrue();
        assertThat(friendService.getFriendByFromAndTo(fromMember, toMember).isPresent()).isTrue();
    }

    @Test
    void getFriendByToAndType() {
        //given
        //when
        List<Friend> friendList = friendService.getFriendByToAndType(toMember, Type.WAIT);

        //then
        assertThat(friendList.size()).isEqualTo(1);
    }

    @Test
    void getFriendByFromAndTo() {
        //given
        //when
        Friend friend = friendService.getFriendByFromAndTo(fromMember, toMember).get();

        //then
        assertThat(friend.getId()).isEqualTo(savedFriend.getId());

    }

    @Test
    void getFriendByFromOrToAndType() {

        //given
        //when
        Member fromMember1 = memberRepository.save(Member.builder()
                .name("member2")
                .nickname("nickname1")
                .email("fromMember2@adsf.com")
                .role(Role.ROLE_UNDEFINED)
                .gender(Gender.male)
                .oauthType(OauthType.KAKAO)
                .profileUrl("adsf")
                .build());


        Member toMember1 = memberRepository.save(Member.builder()
                .name("member2")
                .nickname("nickname1")
                .email("toMember2@adsf.com")
                .role(Role.ROLE_UNDEFINED)
                .gender(Gender.male)
                .oauthType(OauthType.KAKAO)
                .profileUrl("adsf")
                .build());


        Friend friend1 = Friend.builder()
                .from(fromMember)
                .to(toMember)
                .type(Type.PERMIT)
                .state(State.ACTIVATE)
                .build();



        Friend savedFriend = friendService.saveFriend(friend1);
        //then
        friendService.getFriendByFromOrToAndType(fromMember, toMember);


    }

    @Test
    void validateDuplicateFriend() {
    }

    @Test
    void isFriend() {
    }
}