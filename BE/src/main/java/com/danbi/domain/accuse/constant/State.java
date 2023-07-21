package com.danbi.domain.accuse.constant;

public enum State {

    STAND_BY("신고 대기"),
    APPROVAL("신고 승인"),
    REFUSE("신고 거절")
    ;

    public static State from(String state) {
        return State.valueOf(state.toUpperCase());
    }

    private String description;

    State(String description) {
        this.description = description;
    }
}