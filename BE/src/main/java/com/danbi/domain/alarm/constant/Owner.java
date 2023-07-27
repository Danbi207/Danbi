package com.danbi.domain.alarm.constant;

public enum Owner {

    SENDER("발송자"),
    RECEIVER("수신자"),
    ;

    private String description;

    Owner(String description) {
        this.description = description;
    }

    public static Owner from(String state) {
        return Owner.valueOf(state.toUpperCase());
    }

}
