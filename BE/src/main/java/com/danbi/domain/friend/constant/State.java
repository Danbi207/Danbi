package com.danbi.domain.friend.constant;

public enum State {


    PERMIT("승인"),
    WAITE("대기"),
    REFUSE("거절")
    ;

    private String description;

    State(String description){
        this.description = description;
    }

    public static State from(String state) {
        return State.valueOf(state.toUpperCase());
    }

}
