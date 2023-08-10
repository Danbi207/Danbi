package com.danbi.domain.alarm.constant;

import lombok.Getter;

@Getter
public enum Type {

    HELP_MATCHING("도움매칭"),
    HELP_IP_COMPLETE("IP 도움완료"),
    HELP_HELPER_COMPLETE("HELPER 도움완료"),
    HELP_CANCEL("도움취소"),

    FRIEND_REQUEST("친구신청"),
    FRIEND_PERMIT("친구승인"),

    ACCUSE_SENT("신고발신"),
    ACCUSE_PERMIT("신고승인"),
    ;


    private String description;

    Type(String description) {
        this.description = description;
    }
}
