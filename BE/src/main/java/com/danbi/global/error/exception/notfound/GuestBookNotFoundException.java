package com.danbi.global.error.exception.notfound;

import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.EntityNotFoundException;

public class GuestBookNotFoundException extends EntityNotFoundException {

    public GuestBookNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
