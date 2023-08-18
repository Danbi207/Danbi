package com.danbi.domain.accuse.service;

import com.danbi.domain.accuse.constant.State;
import com.danbi.domain.accuse.entity.Accuse;
import com.danbi.domain.accuse.repository.AccuseRepository;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.MisMatchException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.time.temporal.ChronoUnit;
import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AccuseService {

    private final AccuseRepository accuseRepository;


    public Accuse createAccuse(Accuse accuse, Long fromId) {
        validateMember(accuse,fromId);
        Accuse savedAccuse = accuseRepository.save(accuse);
        return savedAccuse;
    }


    public void approveAccuse(Long accuseId) {
        Accuse accuse = accuseRepository.findById(accuseId).get();
        accuse.getTargetMember().plusStack();
        accuse.updateAccuse(State.APPROVAL);
    }

    public Accuse searchAccuse(Long accuse_id) {
        return accuseRepository.findById(accuse_id).get();
    }


    private void validateMember(Accuse accuse, Long memberId) {
        if (accuse.getTargetMember().getId() == memberId) {
            throw new MisMatchException(ErrorCode.ACCUSE_MISMATCH_TARGET);
        }
    }

    public void checkAccuseTime() {
        LocalDateTime twoWeeksAgo = LocalDateTime.now().minus(2, ChronoUnit.WEEKS);
        List<Accuse> accuses = accuseRepository.checkAccuseTime(twoWeeksAgo);
        for (Accuse accuse : accuses) {
            accuse.updateAccuse(State.DELETE);
            accuse.getTargetMember().minusStack();
        }
    }

}
