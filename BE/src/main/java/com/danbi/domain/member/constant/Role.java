package com.danbi.domain.member.constant;

import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.BusinessException;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum Role {

    ROLE_UNDEFINED,
    ROLE_UNSUBMIT_IP,
    ROLE_UNCERTIFICATED_IP,
    ROLE_IP,
    ROLE_HELPER,
    ROLE_ADMIN
    ;

    public static Role from(String role) {
        validateRole(role);
        return Role.valueOf(role.toUpperCase());
    }

    public static boolean isMemberRole(String role) {
        List<Role> roles = Arrays.stream(Role.values())
                .filter(memberRole -> memberRole.name().equals(role))
                .collect(Collectors.toList());

        return roles.size() != 0;
    }

    public static boolean isMemberRole(Role role) {
        List<Role> roles = Arrays.stream(Role.values())
                .filter(memberRole -> memberRole == role)
                .collect(Collectors.toList());

        return roles.size() != 0;
    }

    private static void validateRole(String role) {
        if(!Role.isMemberRole(role.toUpperCase())) {
            throw new BusinessException(ErrorCode.MEMBER_ROLE_NOT_EXIST);
        }
    }
}
