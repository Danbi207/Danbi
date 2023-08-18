package com.danbi.domain.accuse.repository;

import com.danbi.domain.accuse.entity.Accuse;

import java.time.LocalDateTime;
import java.util.List;

public interface AccuseRepositoryCustom {
    List<Accuse> checkAccuseTime(LocalDateTime time);
}
