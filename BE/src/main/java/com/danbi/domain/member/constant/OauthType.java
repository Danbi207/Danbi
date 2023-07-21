package com.danbi.domain.member.constant;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum OauthType {

    KAKAO
    ;

    public static OauthType from(String type) {
        return OauthType.valueOf(type.toUpperCase());
    }

    public static boolean isMemberType(String type) {
        List<OauthType> memberTypes = Arrays.stream(OauthType.values())
                .filter(memberType -> memberType.name().equals(type))
                .collect(Collectors.toList());

        return memberTypes.size() != 0;
    }

}
