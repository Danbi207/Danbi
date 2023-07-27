package com.danbi.domain.fcm.repository;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Repository;

import java.util.Set;

@Repository
@RequiredArgsConstructor
public class FcmTokenRepository {

    //RedisTemplate : 트랜잭션을 지원한다. 트랜잭션으로 묶게 되면 트랜잭션 내부에서 하나의 로직이 실패하여 오류가 나는 경우 수행한 작업을 모두 취소시킨다.
//    private final StringRedisTemplate tokenRedisTemplate;
    private final RedisTemplate<String, String> redisTemplate;

    public void saveToken(String key, String value) {
        redisTemplate.opsForValue()
                .set(key, value);
    }

    public String getToken(String key) {
        return redisTemplate.opsForValue().get(key);
    }

    public void deleteToken(String key) {
        redisTemplate.delete(key);
    }

    public boolean hasKey(String key) {
        return redisTemplate.hasKey(key);
    }


}
