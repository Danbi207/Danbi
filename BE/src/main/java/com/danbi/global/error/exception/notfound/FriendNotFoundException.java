package com.danbi.global.error.exception;

import com.danbi.global.error.ErrorCode;

public class FriendNotFoundException extends EntityNotFoundException{
    public FriendNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
