package com.danbi.global.error.exception.mismatch;

import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.MisMatchException;

public class CommentMisMatchMemberException extends MisMatchException {

    public CommentMisMatchMemberException(ErrorCode errorCode) {
        super(errorCode);
    }
}
