package com.danbi.api.admin.service;

import com.danbi.api.admin.dto.AdminMemberResponseDto;
import com.danbi.api.admin.dto.IPCertFileResponseDto;
import com.danbi.domain.member.constant.Role;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AdminMemberService {

    private final MemberService memberService;

    public List<AdminMemberResponseDto> findMembers(Pageable pageable) {
        Page<Member> members = memberService.findAll(pageable);

        return membersToDto(members);
    }

    public List<AdminMemberResponseDto> findMembersByRole(String role, Pageable pageable) {
        Page<Member> members = memberService.findAllByRole(Role.from(role), pageable);

        return membersToDto(members);
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
}
