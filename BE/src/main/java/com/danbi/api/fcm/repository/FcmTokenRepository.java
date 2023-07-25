package com.danbi.api.fcm.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
@RequiredArgsConstructor
public class FcmTokenRepository {

    //RedisTemplate : 트랜잭션을 지원한다. 트랜잭션으로 묶게 되면 트랜잭션 내부에서 하나의 로직이 실패하여 오류가 나는 경우 수행한 작업을 모두 취소시킨다.
    private final StringRedisTemplate tokenRedisTemplate;


    public void saveToken(String key, String value) {
        tokenRedisTemplate.opsForValue()
                .set(key, value);
    }

    public String getToken(String key) {
        return tokenRedisTemplate.opsForValue().get(key);
    }

    public void deleteToken(String key) {
        tokenRedisTemplate.delete(key);
    }

    public boolean hasKey(String key) {
        return tokenRedisTemplate.hasKey(key);
    }


}
