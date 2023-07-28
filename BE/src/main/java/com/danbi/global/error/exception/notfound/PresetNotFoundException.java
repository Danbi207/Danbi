package com.danbi.global.error.exception.notfound;

import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.EntityNotFoundException;

public class PresetNotFoundException extends EntityNotFoundException {

    public PresetNotFoundException(ErrorCode errorCode) {
        super(errorCode);
    }
}
