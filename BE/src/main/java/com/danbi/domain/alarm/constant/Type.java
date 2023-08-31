package com.danbi.domain.alarm.constant;

import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.BusinessException;
import lombok.Getter;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

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
        this.description = description.toUpperCase();
    }

    public static Type from(String type) {
        validateType(type);
        return Type.valueOf(type.toUpperCase());
    }

    public static boolean isAlarmType(String type) {
        List<Type> typeList = Arrays.stream(Type.values())
                .filter(alarmtype -> alarmtype.name().equals(type))
                .collect(Collectors.toList());
        return typeList.size() != 0;
    }

    public static void validateType(String type) {
        if (!Type.isAlarmType(type.toUpperCase())) {
            throw new BusinessException(ErrorCode.ALARM_TYPE_NOT_EXIST);
        }
    }

}
