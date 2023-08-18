package com.danbi.domain.preset.repository;

import com.danbi.domain.preset.entity.Preset;
import com.danbi.domain.profile.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface PresetRepository extends JpaRepository<Preset, Long> {

    List<Preset> findAllByProfileOrderBySequence(Profile profile);
}
