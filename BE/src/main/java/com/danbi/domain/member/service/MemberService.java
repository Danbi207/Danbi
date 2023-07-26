package com.danbi.domain.member.service;

import com.danbi.domain.guestbook.entity.GuestBook;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.repository.MemberRepository;
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

    @Transactional
    public Member registerMember(Member member) {
        validateDuplicateMember(member);

        GuestBook guestBook = GuestBook.builder()
                .member(member)
                .build();

        Profile profile = Profile.builder()
                .member(member)
                .build();

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

}
