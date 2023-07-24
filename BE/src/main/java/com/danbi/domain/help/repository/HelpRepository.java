package com.danbi.domain.help.repository;

import com.danbi.domain.help.entity.Help;
import org.springframework.data.jpa.repository.JpaRepository;

public interface HelpRepository extends JpaRepository<Help, Long> {
}
