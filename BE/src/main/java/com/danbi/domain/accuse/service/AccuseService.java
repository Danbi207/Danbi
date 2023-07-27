package com.danbi.domain.accuse.service;

import com.danbi.domain.accuse.constant.State;
import com.danbi.domain.accuse.entity.Accuse;
import com.danbi.domain.accuse.entity.AccuseTable;
import com.danbi.domain.accuse.repository.AccuseRepository;
import com.danbi.domain.accuse.repository.AccuseTableRepository;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional
@RequiredArgsConstructor
public class AccuseService {

    private final AccuseRepository accuseRepository;
    private final AccuseTableRepository accuseTableRepository;
    private final MemberService memberService;


    public void createAccuseTable(Accuse accuse, Member member){
        AccuseTable accuseTable = AccuseTable.builder()
                .accuse(accuse)
                .fromMember(member).build();
        accuseTableRepository.save(accuseTable);
    }

    public Accuse createAccuse(Accuse accuse, Long fromId) {
        Accuse savedAccuse = accuseRepository.save(accuse);
        Member member = memberService.findByMemberId(fromId);
        createAccuseTable(accuse,member);
        return savedAccuse;
    }

    public void cancelAccuse(Long accuseId) {
        Accuse accuse = accuseRepository.findById(accuseId).get();
        accuse.updateAccuse(State.REFUSE);
    }

    public void approveAccuse(Long accuseId) {
        Accuse accuse = accuseRepository.findById(accuseId).get();
        accuse.updateAccuse(State.APPROVAL);
    }

    public Accuse searchAccuse(Long accuse_id) {
        return accuseRepository.findById(accuse_id).get();
    }

    public List<Accuse> myAccuseStack(Member member) {
        List<Accuse> memberList = accuseRepository.findApprovalAccusesByMember(member);
        return memberList;
    }

    public List<Accuse> myAccuseList(Member member) {
        List<AccuseTable> accuseTables = accuseTableRepository.findByFromMember(member);
        List<Accuse> accuses = new ArrayList<>();
        for(AccuseTable accuse : accuseTables) {
            accuses.add(accuse.getAccuse());
        }
        return accuses;
    }
}
