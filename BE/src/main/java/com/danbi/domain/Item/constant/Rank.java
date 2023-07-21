package com.danbi.domain.Item.constant;

public enum Rank {

    SILVER,
    GOLD,
    PLATINUM
    ;

    public static Rank from(String rank) {
        return Rank.valueOf(rank.toUpperCase());
    }
}
