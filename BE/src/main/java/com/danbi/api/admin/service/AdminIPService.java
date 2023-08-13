package com.danbi.api.admin.service;

import com.danbi.api.admin.dto.IPCertFileResponseDto;
import com.danbi.domain.member.constant.Role;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.entity.MemberFile;
import com.danbi.domain.member.repository.MemberRepository;
import com.danbi.domain.member.service.MemberFileService;
import com.danbi.domain.member.service.MemberService;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.BusinessException;
import com.danbi.global.error.exception.EntityNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class AdminIPService {

    private final MemberFileService memberFileService;
    private final MemberRepository memberRepository;
    private final MemberService memberService;

    public List<IPCertFileResponseDto> findIPCertFiles(Long targetIpId) {
        Member member = memberRepository.findById(targetIpId)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_EXISTS));

        List<MemberFile> ipCertificationFiles = memberFileService.findIPCertificationFiles(member);

        List<IPCertFileResponseDto> iPCertFileResponseDtos = ipCertificationFiles.stream()
                .map(memberFile -> IPCertFileResponseDto.builder()
                        .id(memberFile.getId())
                        .originName(memberFile.getOriginName())
                        .url(memberFile.getUrl())
                        .build())
                .collect(Collectors.toList());
        return iPCertFileResponseDtos;

    }

    @Transactional
    public void permitIp(Long targetIpId) {
        Member member = memberRepository.findById(targetIpId)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_EXISTS));

        checkValidIPRole(member);

        memberService.updateRole(member, Role.ROLE_IP);
    }

    private void checkValidIPRole(Member ipMember) {
        Role role = ipMember.getRole();
        if(!role.equals(Role.ROLE_UNCERTIFICATED_IP)) {
            throw new BusinessException(ErrorCode.INVALID_CERTIFICATE_IP);
        }
    }

    @Transactional
    public void rejectIP(Long targetIpId) {
        Member member = memberRepository.findById(targetIpId)
                .orElseThrow(() -> new EntityNotFoundException(ErrorCode.MEMBER_NOT_EXISTS));

        // 거절 하면 서류 제출 안한 상태로 돌림
        member.updateRole(Role.ROLE_UNSUBMIT_IP);
    }
}
