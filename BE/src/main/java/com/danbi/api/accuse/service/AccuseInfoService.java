package com.danbi.api.accuse.service;

import com.danbi.api.accuse.dto.accuse.AccuseMemberDto;
import com.danbi.api.accuse.dto.accuse.AccuseRequestDto;
import com.danbi.api.accuse.dto.accuse.AccuseResponseDto;
import com.danbi.api.accuse.dto.myAccuse.MyAccuseDto;
import com.danbi.api.accuse.dto.myAccuse.MyAccuseListDto;
import com.danbi.domain.accuse.constant.State;
import com.danbi.domain.accuse.entity.Accuse;
import com.danbi.domain.accuse.service.AccuseService;
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
public class AccuseInfoService {

    private final AccuseService accuseService;
    private final MemberService memberService;

    public AccuseResponseDto accuse(AccuseRequestDto accuseRequestDto, Long fromId) {

        Member targetMember = memberService.findMemberByMemberId(accuseRequestDto.getTargetMemberId());
        Accuse build = Accuse.builder()
                .targetMember(targetMember)
                .title(accuseRequestDto.getTitle())
                .content(accuseRequestDto.getContent())
                .evidenceUrl(accuseRequestDto.getEvidenceUrl())
                .accuseType(accuseRequestDto.getAccuseType())
                .state(State.STAND_BY).build();

        Accuse accuse = accuseService.createAccuse(build, fromId);

        return AccuseResponseDto.builder()
                .accuseId(accuse.getId())
                .memberInfo(AccuseMemberDto.builder()
                        .memberId(accuse.getTargetMember().getId())
                        .name(accuse.getTargetMember().getName()).build())
                .title(accuse.getTitle())
                .content(accuse.getContent())
                .accuseType(accuse.getAccuseType())
                .state(accuse.getState()).build();
    }

    public void cancelAccuse(Long accuseId) {
        accuseService.cancelAccuse(accuseId);
    }

    public MyAccuseListDto myAccuseList(Long memberId) {
        Member member = memberService.findMemberByMemberId(memberId);
        List<Accuse> accuses = accuseService.myAccuseList(member);
        List<MyAccuseDto> myAccuseList = new ArrayList<>();
        for (Accuse accuse : accuses) {
            MyAccuseDto build = MyAccuseDto.builder()
                    .accuseId(accuse.getId())
                    .content(accuse.getContent()).build();
            myAccuseList.add(build);
        }
        return MyAccuseListDto.builder()
                .accuseList(myAccuseList).build();
    }

}
