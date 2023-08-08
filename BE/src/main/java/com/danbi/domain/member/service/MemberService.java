package com.danbi.domain.member.service;

import com.danbi.domain.Item.constant.Color;
import com.danbi.domain.Item.constant.Ranking;
import com.danbi.domain.Item.entity.Item;
import com.danbi.domain.Item.repository.ItemRepository;
import com.danbi.domain.guestbook.entity.GuestBook;
import com.danbi.domain.member.constant.Role;
import com.danbi.domain.member.dto.MemberInfoDto;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.repository.MemberRepository;
import com.danbi.domain.point.entity.Point;
import com.danbi.domain.point.repository.PointRepository;
import com.danbi.domain.profile.entity.Profile;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.AuthenticationException;
import com.danbi.global.error.exception.BusinessException;
import com.danbi.global.error.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;
    private final PointRepository pointRepository;
    private final ItemRepository itemRepository;

    @Transactional
    public Member registerMember(Member member) {
        validateDuplicateMember(member);

        GuestBook guestBook = GuestBook.builder()
                .member(member)
                .build();

        Point point = Point.builder()
                .dewPoint(100L)
                .accumulateDewPoint(100L)
                .build();

        Profile profile = Profile.builder()
                .member(member)
                .point(point)
                .build();

        pointRepository.save(point);

        Item item = Item.builder()
                .color(Color.RED)
                .ranking(Ranking.RARE)
                .profile(profile).build();
        itemRepository.save(item);

        member.makeGuestBook(guestBook);
        member.makeProfile(profile);

        return memberRepository.save(member);
    }

    private void validateDuplicateMember(Member member) throws BusinessException {
        Optional<Member> optionalMember = memberRepository.findByEmail(member.getEmail());
        if(optionalMember.isPresent()) {
            throw new BusinessException(ErrorCode.ALREADY_REGISTERED_MEMBER);
        }
    }

    public Optional<Member> findByEmail(String email) {
        return memberRepository.findByEmail(email);
    }

    public Member findByRefreshToken(String refreshToken) {
        Member member = memberRepository.findByRefreshToken(refreshToken)
                .orElseThrow(() -> new AuthenticationException(ErrorCode.REFRESH_TOKEN_NOT_FOUND));
        LocalDateTime tokenExpirationTime = member.getTokenExpirationTime();
        if(tokenExpirationTime.isBefore(LocalDateTime.now())) {
            throw new AuthenticationException(ErrorCode.REFRESH_TOKEN_EXPIRED);
        }
        return member;
    }

    public Member findByMemberId(Long memberId) {
        return memberRepository.findById(memberId)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_EXISTS));
    }

    public MemberInfoDto searchMember(Long memberId) {
        return memberRepository.searchMember(memberId);
    }

    @Transactional
    public void updateRole(Member member, Role nextRole) {
        Role beforeRole = member.getRole();
        if(nextRole.equals(Role.ROLE_UNSUBMIT_IP) && !beforeRole.equals(Role.ROLE_UNDEFINED)) {
            throw new BusinessException(ErrorCode.INVALID_UPDATE_ROLE);
        }
        if(nextRole.equals(Role.ROLE_UNCERTIFICATED_IP) && !beforeRole.equals(Role.ROLE_UNSUBMIT_IP)) {
            throw new BusinessException(ErrorCode.INVALID_UPDATE_ROLE);
        }
        if(nextRole.equals(Role.ROLE_IP) && !beforeRole.equals(Role.ROLE_UNCERTIFICATED_IP)) {
            throw new BusinessException(ErrorCode.INVALID_UPDATE_ROLE);
        }
        
        // TODO: ROLE_ADMIN으로 업데이트는 일단 열어놨음

        member.updateRole(nextRole);
    }

}
