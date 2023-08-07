package com.danbi.domain.member.constant;

public enum State {

    ACTIVATE("활성화"),
    DESTROY("탈퇴"),
    SUSPENSION("정지")
    ;

    public static State from(String state) {
        return State.valueOf(state.toUpperCase());
    }

    private String description;

    State(String description) {
        this.description = description;
    }
}
