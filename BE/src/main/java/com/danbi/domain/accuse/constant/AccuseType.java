package com.danbi.domain.accuse.constant;

public enum AccuseType {

    SEXUAL_HARASSMENT("성희롱"),
    ABUSE("욕설"),
    VIOLENCE("폭력")
    ;

    public static AccuseType from(String state) {
        return AccuseType.valueOf(state.toUpperCase());
    }

    private String description;

    AccuseType(String description) {
        this.description = description;
    }
}