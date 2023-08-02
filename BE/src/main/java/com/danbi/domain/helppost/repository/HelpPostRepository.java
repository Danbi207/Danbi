package com.danbi.domain.helppost.repository;

import com.danbi.domain.helppost.constant.State;
import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.member.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface HelpPostRepository extends JpaRepository<HelpPost, Long> , HelpPostRepositoryCustom {
    List<HelpPost> findAllByMember(Member member);
    List<HelpPost> findAllByState(State state);
}
