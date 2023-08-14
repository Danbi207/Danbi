package com.danbi.domain.member.constant;

import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.BusinessException;

import java.util.Arrays;
import java.util.List;
import java.util.stream.Collectors;

public enum State {

    ACTIVATE("활성화"),
    DESTROY("탈퇴"),
    SUSPENSION("정지")
    ;

    private String description;

    State(String description) {
        this.description = description;
    }

    public static State from(String state) {
        validateState(state);
        return State.valueOf(state.toUpperCase());
    }

    public static boolean isMemberState(String state) {
        List<State> states = Arrays.stream(State.values())
                .filter(memberState -> memberState.name().equals(state))
                .collect(Collectors.toList());

        return states.size() != 0;
    }

    public static boolean isMemberState(State state) {
        List<State> states = Arrays.stream(State.values())
                .filter(memberState -> memberState == state)
                .collect(Collectors.toList());

        return states.size() != 0;
    }

    private static void validateState(String state) {
        if(!State.isMemberState(state.toUpperCase())) {
            throw new BusinessException(ErrorCode.MEMBER_STATE_NOT_EXIST);
        }
    }
}
