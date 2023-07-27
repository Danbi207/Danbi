package com.danbi.global.error.exception;

import com.danbi.global.error.ErrorCode;

public class GuestBookNotFoundException extends EntityNotFoundException{

    public GuestBookNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
