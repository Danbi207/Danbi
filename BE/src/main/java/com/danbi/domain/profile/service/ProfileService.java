package com.danbi.domain.profile.service;

import com.danbi.domain.member.entity.Member;
import com.danbi.domain.profile.entity.Profile;
import com.danbi.domain.profile.repository.ProfileRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;

    public Profile getProfile(Long profileId) {
        return profileRepository.findById(profileId).get();
    }

    public Profile getProfileByMember(Member member) { // 아이템 뽑기용
        return profileRepository.findByMember(member).get();
    }
}
