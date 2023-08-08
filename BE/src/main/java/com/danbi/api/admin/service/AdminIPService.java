package com.danbi.api.admin.service;

import com.danbi.api.admin.dto.IPCertFileResponseDto;
import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.entity.MemberFile;
import com.danbi.domain.member.repository.MemberRepository;
import com.danbi.domain.member.service.MemberFileService;
import com.danbi.global.error.ErrorCode;
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

    public List<IPCertFileResponseDto> findIPCertFiles(Long memberId) {
        Member member = memberRepository.findById(memberId)
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

}
