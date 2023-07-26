package com.danbi.global.error.exception;

import com.danbi.global.error.ErrorCode;

public class CommentMisMatchMemberException extends MisMatchException{

    public CommentMisMatchMemberException(ErrorCode errorCode) {
        super(errorCode);
    }
}
