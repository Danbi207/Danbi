package com.danbi.domain.member.constant;

public enum Gender {

    MALE,
    FEMALE
    ;

    public static Gender from(String gender) {
        return Gender.valueOf(gender.toUpperCase());
    }
}
