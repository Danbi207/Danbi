package com.danbi.domain.member.service;

import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.entity.MemberFile;
import com.danbi.domain.member.repository.MemberFileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class MemberFileService {

    private final MemberFileRepository memberFileRepository;

    @Transactional
    public MemberFile saveIPCertificationFile(Member member, String fileName, String url) {
        MemberFile memberFile = MemberFile.builder()
                .originName(fileName)
                .url(url)
                .member(member)
                .build();

        return memberFileRepository.save(memberFile);
    }

    public List<MemberFile> findIPCertificationFiles(Member member) {
        return memberFileRepository.findIPCertFiles(member);
    }

}
