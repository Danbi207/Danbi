package com.danbi.global.error.exception;

import com.danbi.global.error.ErrorCode;

public class NegativePointException extends BusinessException{

    public NegativePointException(ErrorCode errorCode) {
        super(errorCode);
    }
}
