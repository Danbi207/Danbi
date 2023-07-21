package com.danbi.domain.helppost.constant;

public enum State {

    ACTIVATE,
    DELETE,
    ;

    public static State from(String state) {
        return State.valueOf(state.toUpperCase());
    }


}