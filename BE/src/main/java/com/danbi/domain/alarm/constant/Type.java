package com.danbi.domain.alarm.constant;

public enum Type {

    HELP("도움"),
    JOIN("가입"),
    FRIEND("친구"),
    ACCUSE("신고")
    ;


    private String description;

    Type(String description) {
        this.description = description;
    }
}
