package com.danbi.domain.Item.service;

import com.danbi.domain.Item.constant.Color;
import com.danbi.domain.Item.constant.Ranking;
import com.danbi.domain.Item.entity.Item;
import com.danbi.domain.Item.repository.ItemRepository;
import com.danbi.domain.Item.vo.ItemVo;
import com.danbi.domain.profile.entity.Profile;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;

@Service
@Transactional
@RequiredArgsConstructor
public class ItemService {

    @PersistenceContext
    private EntityManager em;
    private final ItemRepository itemRepository;

    public ItemVo getRandomColor() {
        double randomValue = Math.random();
        Color color;
        Ranking ranking;

        if (randomValue < 0.1) {
            color = Color.YELLOW;
            ranking = Ranking.PLATINUM;
        } else if (randomValue < 0.4) {
            color = Color.GREEN;
            ranking = Ranking.GOLD;
        } else {
            color = Color.BLACK;
            ranking = Ranking.SILVER;
        }

        return ItemVo.builder()
                .color(color)
                .ranking(ranking).build();
    }

    public Item pickItem(Profile profile) {
        Item item = itemRepository.findByProfile(profile).get();
        ItemVo itemVo = getRandomColor();
        item.update(itemVo.getColor(), itemVo.getRanking());
        em.flush();
        return item;
    }
}
