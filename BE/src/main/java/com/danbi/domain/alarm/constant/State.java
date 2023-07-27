package com.danbi.domain.alarm.constant;

public enum State {

    ACTIVATE("활성화"),
    DESTROY("삭제"),
    SENDER_DESTROY("발신자삭제"),
    RECEIVER_DESTROY("수신자삭제"),

    ;

    private String description;
    State(String description){
        this.description = description;
    }

    public static State from(String state) {
        return State.valueOf(state.toUpperCase());
    }

}
