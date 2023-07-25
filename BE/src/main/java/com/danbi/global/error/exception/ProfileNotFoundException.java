package com.danbi.global.error.exception;

import com.danbi.global.error.ErrorCode;

public class ProfileNotFoundException extends EntityNotFoundException{

    public ProfileNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
