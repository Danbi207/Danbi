package com.danbi.domain.helppost.constant;

public enum Category {
    ETC,
    MOBILE,
    ;

    public static State from(String state) {
        return State.valueOf(state.toUpperCase());
    }
}
