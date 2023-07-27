package com.danbi.domain.preset.repository;

import com.danbi.domain.preset.entity.Preset;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PresetRepository extends JpaRepository<Preset, Long> {
}
