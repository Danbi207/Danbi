package com.danbi.global.error.exception.notfound;

import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.EntityNotFoundException;

public class FriendNotFoundException extends EntityNotFoundException {
    public FriendNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
