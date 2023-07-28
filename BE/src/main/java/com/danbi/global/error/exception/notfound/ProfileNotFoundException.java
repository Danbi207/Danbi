package com.danbi.global.error.exception.notfound;

import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.EntityNotFoundException;

public class ProfileNotFoundException extends EntityNotFoundException {

    public ProfileNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
