package com.danbi.domain.helppost.repository;

import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.helppost.entity.Positions;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PositionRepository extends JpaRepository<Positions, Long> {

    Optional<Positions> findByHelpPost(HelpPost helpPost);
}
