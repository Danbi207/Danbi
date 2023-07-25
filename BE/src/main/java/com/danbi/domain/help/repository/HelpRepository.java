package com.danbi.domain.help.repository;

import com.danbi.domain.help.entity.Help;
import com.danbi.domain.helppost.entity.HelpPost;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HelpRepository extends JpaRepository<Help, Long> {
    Optional<Help> findByHelpPost(HelpPost helpPost);
}
