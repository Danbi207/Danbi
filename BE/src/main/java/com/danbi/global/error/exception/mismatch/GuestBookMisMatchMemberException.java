package com.danbi.global.error.exception.mismatch;

import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.MisMatchException;

public class GuestBookMisMatchMemberException extends MisMatchException {

    public GuestBookMisMatchMemberException(ErrorCode errorCode) {
        super(errorCode);
    }
}
