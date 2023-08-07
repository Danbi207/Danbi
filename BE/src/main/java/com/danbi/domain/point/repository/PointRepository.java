package com.danbi.domain.point.repository;

import com.danbi.domain.point.entity.Point;
import com.danbi.domain.profile.entity.Profile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PointRepository extends JpaRepository<Point, Long> {
    Optional<Point> findByProfile(Profile profile);
}
