package com.danbi.domain.Item.constant;

import lombok.Getter;

@Getter
public enum Rank {

    SILVER("silver"),
    GOLD("gold"),
    PLATINUM("platinum")
    ;

    public static Rank from(String rank) {
        return Rank.valueOf(rank.toUpperCase());
    }
    Rank(String tier) {
        this.tier = tier;
    }
    private String tier;

}
