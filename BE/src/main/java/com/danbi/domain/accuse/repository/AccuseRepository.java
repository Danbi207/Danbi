package com.danbi.domain.accuse.repository;

import com.danbi.domain.accuse.entity.Accuse;
import com.danbi.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface AccuseRepository extends JpaRepository<Accuse, Long>, AccuseRepositoryCustom {

}
