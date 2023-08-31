package com.danbi.api.admin.service;

import com.danbi.api.admin.dto.*;
import com.danbi.api.admin.dto.besthelp.AdminBestHelpMemberDto;
import com.danbi.api.admin.dto.besthelp.AdminBestHelpResponseDto;
import com.danbi.api.admin.dto.totalbest.TotalBestDto;
import com.danbi.api.admin.dto.totalbest.TotalBestResponseDto;
import com.danbi.domain.helppost.dto.BestHelpMemberDto;
import com.danbi.domain.helppost.service.HelpPostService;
import com.danbi.domain.member.constant.Role;
import com.danbi.domain.member.dto.TotalBestMemberDto;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AdminMemberService {

    private final MemberService memberService;
    private final HelpPostService helpPostService;

    public AdminMembersCountResponseDto findMembers(Pageable pageable) {
        Page<Member> members = memberService.findAll(pageable);
        List<AdminMemberResponseDto> dtos = membersToDto(members);

        return AdminMembersCountResponseDto.builder()
                .count(dtos.size())
                .members(dtos)
                .build();
    }

    public AdminMembersCountResponseDto findMembersByRole(String role, Pageable pageable) {
        Page<Member> members = memberService.findAllByRole(Role.from(role), pageable);
        List<AdminMemberResponseDto> dtos = membersToDto(members);

        return AdminMembersCountResponseDto.builder()
                .count(dtos.size())
                .members(dtos)
                .build();
    }

    private List<AdminMemberResponseDto> membersToDto(Page<Member> members) {
        return members.stream()
                .map(member -> AdminMemberResponseDto.builder()
                        .id(member.getId())
                        .oauthType(member.getOauthType())
                        .email(member.getEmail())
                        .name(member.getName())
                        .nickname(member.getNickname())
                        .profileUrl(member.getProfileUrl())
                        .role(member.getRole())
                        .gender(member.getGender())
                        .state(member.getState())
                        .accuseStack(member.getAccuseStack())
                        .build())
                .collect(Collectors.toList());
    }
    
    public AdminBestHelpResponseDto searchBestHelpMembers() {
        List<BestHelpMemberDto> bestHelpMemberDtos = helpPostService.searchBestHelpMembers();
        List<AdminBestHelpMemberDto> bestMembers = new ArrayList<>();
        for (BestHelpMemberDto member : bestHelpMemberDtos) {
            AdminBestHelpMemberDto newMember = AdminBestHelpMemberDto.builder()
                    .memberId(member.getMemberId())
                    .profileId(member.getProfileId())
                    .name(member.getName())
                    .profileUrl(member.getProfileUrl())
                    .helpCount(member.getHelpCount()).build();
            bestMembers.add(newMember);
        }
        return AdminBestHelpResponseDto.builder()
                .memberList(bestMembers).build();
    }

    public TotalBestResponseDto searchTotalBestMembers() {
        List<TotalBestMemberDto> totalBestMemberDtos = memberService.searchTotalBestMembers();
        List<TotalBestDto> bests = new ArrayList<>();

        for (TotalBestMemberDto member : totalBestMemberDtos) {
            TotalBestDto build = TotalBestDto.builder()
                    .memberId(member.getMemberId())
                    .profileId(member.getProfileId())
                    .name(member.getName())
                    .profileUrl(member.getProfileUrl())
                    .accumulateDewPoint(member.getAccumulateDewPoint()).build();
            bests.add(build);
        }

        return TotalBestResponseDto.builder()
                .bestMemberList(bests).build();
    }
}
