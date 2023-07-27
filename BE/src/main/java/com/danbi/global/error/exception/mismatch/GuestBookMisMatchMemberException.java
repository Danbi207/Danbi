package com.danbi.global.error.exception;

import com.danbi.global.error.ErrorCode;

public class GuestBookMisMatchMemberException extends MisMatchException{

    public GuestBookMisMatchMemberException(ErrorCode errorCode) {
        super(errorCode);
    }
}
