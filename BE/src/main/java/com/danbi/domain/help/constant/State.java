package com.danbi.domain.help.constant;

public enum State {

    ACTIVATE,
    DELETE,
    ;

    public static State from(String state) {
        return State.valueOf(state.toUpperCase());
    }


}
