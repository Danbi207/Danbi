package com.danbi.domain.member.repository;

import com.danbi.domain.member.entity.Member;
import com.danbi.domain.member.entity.MemberFile;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface MemberFileRepository extends JpaRepository<MemberFile, Long> {

    @Query(value = "select f from MemberFile f where f.member = :member", nativeQuery = true)
    List<MemberFile> findIPCertFiles(@Param("member") Member member);
}
