package com.danbi.domain.member.repository;

import com.danbi.domain.member.entity.MemberFile;
import org.springframework.data.jpa.repository.JpaRepository;

public interface MemberFileRepository extends JpaRepository<MemberFile, Long> {
}
