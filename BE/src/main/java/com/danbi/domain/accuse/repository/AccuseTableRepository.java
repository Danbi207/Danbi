package com.danbi.domain.accuse.repository;

import com.danbi.domain.accuse.entity.AccuseTable;
import com.danbi.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AccuseTableRepository extends JpaRepository<AccuseTable, Long> {
    List<AccuseTable> findByFromMember(Member member);
}
