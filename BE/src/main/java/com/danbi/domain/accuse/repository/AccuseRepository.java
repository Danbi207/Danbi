package com.danbi.domain.accuse.repository;

import com.danbi.domain.accuse.entity.Accuse;
import com.danbi.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AccuseRepository extends JpaRepository<Accuse, Long> {

    List<Accuse> findByTargetMember(Member member);

    @Query("SELECT a FROM Accuse a WHERE a.targetMember = :member AND a.state = 'APPROVAL'")
    List<Accuse> findApprovalAccusesByMember(@Param("member") Member member); // TODO : 확인 필요
}
