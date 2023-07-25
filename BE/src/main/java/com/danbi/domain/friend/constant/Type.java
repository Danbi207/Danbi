package com.danbi.domain.friend.constant;

public enum Type {


    PERMIT("승인"),
    WAIT("대기"),
    REFUSE("거절")
    ;

    private String description;

    Type(String description){
        this.description = description;
    }

    public static Type from(String state) {
        return Type.valueOf(state.toUpperCase());
    }

}
