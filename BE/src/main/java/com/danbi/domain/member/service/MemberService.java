package com.danbi.domain.member.service;

import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.repository.MemberRepository;
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
@Transactional
@RequiredArgsConstructor
public class MemberService {

    private final MemberRepository memberRepository;

    public Member registerMember(Member member) {
        validateDuplicateMember(member);
        return memberRepository.save(member);
    }

    private void validateDuplicateMember(Member member) throws BusinessException {
        Optional<Member> optionalMember = memberRepository.findByEmail(member.getEmail());
        if(optionalMember.isPresent()) {
            throw new BusinessException(ErrorCode.ALREADY_REGISTERED_MEMBER);
        }
    }

}
