package com.danbi.domain.Item.service;

import com.danbi.domain.Item.constant.Color;
import com.danbi.domain.Item.constant.Rank;
import com.danbi.domain.Item.entity.Item;
import com.danbi.domain.Item.repository.ItemRepository;
import com.danbi.domain.Item.vo.ItemVo;
import com.danbi.domain.point.service.PointService;
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
    private final EntityManager em;

    private final PointService pointService;
    private final ItemRepository itemRepository;

    public ItemVo getRandomColor() {
        double randomValue = Math.random();
        Color color;
        Rank rank;

        if (randomValue < 0.1) {
            color = Color.YELLOW;
            rank = Rank.PLATINUM;
        } else if (randomValue < 0.4) {
            color = Color.GREEN;
            rank = Rank.GOLD;
        } else {
            color = Color.BLACK;
            rank = Rank.SILVER;
        }

        return ItemVo.builder()
                .color(color)
                .rank(rank).build();
    }

    public Item pickItem(Profile profile) {
        Item item = itemRepository.findByProfile(profile).get();
        ItemVo itemVo = getRandomColor();
        item.update(itemVo.getColor(), itemVo.getRank());
        em.flush();
        return item;
    }
}
