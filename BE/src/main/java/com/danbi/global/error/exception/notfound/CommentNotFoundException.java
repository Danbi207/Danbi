package com.danbi.global.error.exception.notfound;

import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.EntityNotFoundException;

public class CommentNotFoundException extends EntityNotFoundException {

    public CommentNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
