package com.danbi.domain.profile.repository;

import com.danbi.domain.member.entity.Member;
import com.danbi.domain.profile.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ProfileRepository extends JpaRepository<Profile, Long> {
    Optional<Profile> findByMember(Member member);
}
