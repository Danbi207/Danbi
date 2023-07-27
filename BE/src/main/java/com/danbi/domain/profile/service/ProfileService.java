package com.danbi.domain.profile.service;

import com.danbi.domain.member.entity.Member;
import com.danbi.domain.profile.entity.Profile;
import com.danbi.domain.profile.repository.ProfileRepository;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.notfound.ProfileNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProfileService {

    private final ProfileRepository profileRepository;

    public Profile getProfileById(Long profileId) {
        Optional<Profile> op = profileRepository.findById(profileId);
        if(op.isEmpty()) {
            throw new ProfileNotFoundException(ErrorCode.PROFILE_NOT_EXISTS);
        }

        return op.get();
    }

    public Profile getProfileByMember(Member member) { // 아이템 뽑기용
        Optional<Profile> op = profileRepository.findByMember(member);
        if(op.isEmpty()) {
            throw new ProfileNotFoundException(ErrorCode.PROFILE_NOT_EXISTS);
        }

        return op.get();
    }
}
