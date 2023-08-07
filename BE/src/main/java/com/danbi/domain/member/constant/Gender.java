package com.danbi.domain.member.constant;

public enum Gender {

    male,
    female
    ;

    public static Gender from(String gender) {
        return Gender.valueOf(gender.toLowerCase());
    }
}
