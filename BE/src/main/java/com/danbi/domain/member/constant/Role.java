package com.danbi.domain.member.constant;

public enum Role {

    ROLE_UNDEFINED,
    ROLE_IP,
    ROLE_HELPER,
    ROLE_ADMIN
    ;

    public static Role from(String role) {
        return Role.valueOf(role.toUpperCase());
    }
}
