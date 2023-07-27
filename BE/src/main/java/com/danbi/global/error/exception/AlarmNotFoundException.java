package com.danbi.global.error.exception;

import com.danbi.global.error.ErrorCode;

public class AlarmNotFoundException extends EntityNotFoundException{
    public AlarmNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
