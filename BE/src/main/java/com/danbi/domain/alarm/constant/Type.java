package com.danbi.domain.alarm.constant;

import lombok.Getter;

@Getter
public enum Type {

    HELP_MATCHING("도움매칭"),
    HELP_COMPLETE("도움완료"),
    HELP_PERMIT("도움승인"),
    JOIN_PERMIT("가입승인"),
    FRIEND_REQUEST("친구신청"),
    ACCUSE_SENT("신고발신"),
    ACCUSE_RECEPTION("신고수신"),

    ;


    private String description;

    Type(String description) {
        this.description = description;
    }
}
