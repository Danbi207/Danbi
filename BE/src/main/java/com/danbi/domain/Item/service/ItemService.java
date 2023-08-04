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

        if (randomValue < 0.05) {
            color = Color.PINK;
            ranking = Ranking.LEGENDARY;
        } else if (randomValue < 0.1) {
            color = Color.DIAMOND;
            ranking = Ranking.EPIC;
        } else if (randomValue < 0.15) {
            color = Color.PLATINUM;
            ranking = Ranking.EPIC;
        }else if (randomValue < 0.2) {
            color = Color.GOLD;
            ranking = Ranking.EPIC;
        }else if (randomValue < 0.25) {
            color = Color.SILVER;
            ranking = Ranking.EPIC;
        }else if (randomValue < 0.3) {
            color = Color.BRONZE;
            ranking = Ranking.EPIC;
        }else if (randomValue < 0.4) {
            color = Color.RED;
            ranking = Ranking.RARE;
        }else if (randomValue < 0.5) {
            color = Color.ORANGE;
            ranking = Ranking.RARE;
        }else if (randomValue < 0.6) {
            color = Color.YELLOW;
            ranking = Ranking.RARE;
        }else if (randomValue < 0.7) {
            color = Color.GREEN;
            ranking = Ranking.RARE;
        }else if (randomValue < 0.8) {
            color = Color.BLUE;
            ranking = Ranking.RARE;
        }else if (randomValue < 0.9) {
            color = Color.NAVY;
            ranking = Ranking.RARE;
        } else {
            color = Color.PURPLE;
            ranking = Ranking.RARE;
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
