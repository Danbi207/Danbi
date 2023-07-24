package com.danbi.api.login.validator;

import com.danbi.domain.member.constant.OauthType;
import com.danbi.global.error.ErrorCode;
import com.danbi.global.error.exception.BusinessException;
import org.springframework.stereotype.Service;

@Service
public class OauthValidator {

    public void validateMemberType(String memberType) {
        if(!OauthType.isMemberType(memberType)) {
            throw new BusinessException(ErrorCode.INVALID_MEMBER_TYPE);
        }
    }

}
