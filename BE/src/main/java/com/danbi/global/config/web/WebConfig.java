package com.danbi.global.config.web;

import com.danbi.global.interceptor.AdminAuthorizationInterceptor;
import com.danbi.global.interceptor.AuthenticationInterceptor;
import com.danbi.global.resolver.memberinfo.MemberInfoArgumentResolver;
import com.danbi.global.resolver.paging.LimitedPageableArgumentResolver;
import lombok.RequiredArgsConstructor;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.web.method.support.HandlerMethodArgumentResolver;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.InterceptorRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import java.util.List;

@Configuration
@RequiredArgsConstructor
public class WebConfig implements WebMvcConfigurer {

    private final AuthenticationInterceptor authenticationInterceptor;
    private final MemberInfoArgumentResolver memberInfoArgumentResolver;
    private final AdminAuthorizationInterceptor adminAuthorizationInterceptor;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/api/v1/**") // 어떤 api 경로에 매핑할지
                .allowedOrigins(
                        "http://localhost:3000",
                        "http://localhost:8080",
                        "http://i9d207.p.ssafy.io:8080",
                        "https://i9d207.p.ssafy.io:8080",
                        "http://i9d207.p.ssafy.io3000",
                        "https://i9d207.p.ssafy.io:3000",
                        "https://i9d207.p.ssafy.io")// cors 허용할 경로
                .allowedMethods(
                        HttpMethod.GET.name(),
                        HttpMethod.POST.name(),
                        HttpMethod.PUT.name(),
                        HttpMethod.PATCH.name(),
                        HttpMethod.DELETE.name(),
                        HttpMethod.OPTIONS.name()
                )
                .allowCredentials(true)
                .maxAge(3600); // preflight
    }

    @Override
    public void addInterceptors(InterceptorRegistry registry) {
        registry.addInterceptor(authenticationInterceptor)
                .order(1) // 가장 먼저 인증 인터셉터가 실행
                .addPathPatterns("/api/v1/**")
                .excludePathPatterns(
                        "/api/v1/oauth/kakao/callback",
                        "/api/v1/oauth/login",
                        "/api/v1/access-token/issue",
                        "/api/v1/logout",
                        "/api/v1/health",
                        "/api/v1/scheduler/help-post",
                        "/api/v1/scheduler/accuse-stack",
                        "/api/v1/test/login");

        registry.addInterceptor(adminAuthorizationInterceptor)
                .order(2)
                .addPathPatterns("/api/v1/admin/**");
    }

    @Override
    public void addArgumentResolvers(List<HandlerMethodArgumentResolver> resolvers) {
        resolvers.add(memberInfoArgumentResolver);
        resolvers.add(new LimitedPageableArgumentResolver());
    }

}
