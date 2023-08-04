package com.danbi.domain.Item.constant;

import lombok.Getter;

@Getter
public enum Ranking {

    RARE("rare"),
    EPIC("epic"),
    LEGENDARY("legendary")
    ;

    public static Ranking from(String rank) {
        return Ranking.valueOf(rank.toUpperCase());
    }
    Ranking(String tier) {
        this.tier = tier;
    }
    private String tier;

}
