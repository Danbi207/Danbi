package com.danbi.global.error.exception.mismatch;

import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.MisMatchException;

public class PresetMisMatchMemberException extends MisMatchException {

    public PresetMisMatchMemberException(ErrorCode errorCode) {
        super(errorCode);
    }
}
