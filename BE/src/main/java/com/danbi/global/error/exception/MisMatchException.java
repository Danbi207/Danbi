package com.danbi.global.error.exception;

import com.danbi.global.error.ErrorCode;

public class MisMatchException extends BusinessException{

    public MisMatchException(ErrorCode errorCode) {
        super(errorCode);
    }
}
