package com.danbi.global.error;

import feign.FeignException;
import feign.Response;
import feign.RetryableException;
import feign.codec.ErrorDecoder;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;

/**
 * OpenFeign 에러가 발생했을 때(200이 아닐 때) 처리해줄 에러 디코더
 *  - 에러(500)가 응답으로 오면 해당 요청을 재시도
 */
@Slf4j
public class FeignClientExceptionErrorDecoder implements ErrorDecoder {

    private ErrorDecoder errorDecoder = new Default();

    @Override
    public Exception decode(String methodKey, Response response) {
        log.error("{} 요청 실패, status : {}, reason : {}", methodKey, response.status(), response.reason());

        FeignException exception = FeignException.errorStatus(methodKey, response);
        HttpStatus httpStatus = HttpStatus.valueOf(response.status());
        // 5xx 에러면 재시작
        if(httpStatus.is5xxServerError()) {
            return new RetryableException(
                    response.status(),
                    exception.getMessage(),
                    response.request().httpMethod(),
                    exception,
                    null,
                    response.request()
            );
        }
        return errorDecoder.decode(methodKey, response);
    }

}
