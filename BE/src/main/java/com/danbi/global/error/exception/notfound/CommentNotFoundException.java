package com.danbi.global.error.exception;

import com.danbi.global.error.ErrorCode;

public class CommentNotFoundException extends EntityNotFoundException{

    public CommentNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
