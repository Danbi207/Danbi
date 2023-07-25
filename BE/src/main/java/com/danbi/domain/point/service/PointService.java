package com.danbi.domain.point.service;

import com.danbi.domain.point.entity.Point;
import com.danbi.domain.point.repository.PointRepository;
import com.danbi.domain.profile.entity.Profile;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Service
@RequiredArgsConstructor
@Transactional
public class PointService {

    @PersistenceContext
    private final EntityManager em;

    private final PointRepository pointRepository;


    public Point getPoint(Profile profile) {
        Point point = pointRepository.findByProfile(profile).get();
        return point;
    }

    public Long pickItem(Profile profile) {
        Point point = pointRepository.findByProfile(profile).get();
        point.pick((long)3);
        em.flush();
        return point.getDewPoint();
    }
}
