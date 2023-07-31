package com.danbi.domain.helppost.service;

import com.danbi.domain.helppost.entity.HelpPost;
import com.danbi.domain.helppost.entity.Positions;
import com.danbi.domain.helppost.repository.HelpPostRepository;
import com.danbi.domain.helppost.repository.PositionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Service
@RequiredArgsConstructor
@Transactional
public class PositionService {

    @PersistenceContext
    private final EntityManager em;
    private final PositionRepository positionRepository;
    private final HelpPostRepository helpPostRepository;

    public Positions create(Positions position) {
        return positionRepository.save(position);
    }

    public Positions update(Long helpPostId, Positions positions) {
        HelpPost helpPost = helpPostRepository.findById(helpPostId).get();
        Positions position = positionRepository.findByHelpPost(helpPost).get();
        position.update(positions);
        em.flush();
        return position;
    }

    public void updateHelpPost(HelpPost helpPost, Positions positions) {
        positions.updateHelpPost(helpPost);
    }

    public Positions searchPositions(HelpPost helpPost) {
        return positionRepository.findByHelpPost(helpPost).get();
    }
}
