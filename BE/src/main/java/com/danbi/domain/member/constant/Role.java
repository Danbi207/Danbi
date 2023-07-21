package com.danbi.domain.member.constant;

public enum Role {

    ROLE_IP,
    ROLE_HELPER,
    ROLE_ADMIN
    ;

    public static Role from(String role) {
        return Role.valueOf(role.toUpperCase());
    }
}
