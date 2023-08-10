package com.danbi.global.interceptor;

import com.danbi.api.ApiResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Component;
import org.springframework.web.method.HandlerMethod;
import org.springframework.web.servlet.HandlerInterceptor;
import org.springframework.web.servlet.ModelAndView;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.lang.reflect.ParameterizedType;
import java.lang.reflect.Type;

@Component
@RequiredArgsConstructor
public class NotificationInterceptor implements HandlerInterceptor {

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        return true;
    }

    @Override
    public void postHandle(HttpServletRequest request, HttpServletResponse response, Object handler, ModelAndView modelAndView) throws Exception {
        System.out.println("NotificationInterceptor postHandle");

        // Check if the handler is a RestController method.
        if (handler instanceof HandlerMethod) {
            HandlerMethod handlerMethod = (HandlerMethod) handler;

            // Get the return type of the RestController method.
            Class<?> returnType = handlerMethod.getReturnType().getParameterType();

            // Check if the return type is ApiResponse<String>.
            if (returnType.equals(ApiResponse.class) && handlerMethod.getMethod().getGenericReturnType() instanceof ParameterizedType) {
                ParameterizedType genericReturnType = (ParameterizedType) handlerMethod.getMethod().getGenericReturnType();
                Type[] actualTypeArguments = genericReturnType.getActualTypeArguments();
                if (actualTypeArguments.length > 0 && actualTypeArguments[0].equals(String.class)) {
                    // Retrieve the return value and print it.
                    ApiResponse<String> apiResponse = (ApiResponse<String>) modelAndView.getModel().get("returnValue");
                    if (apiResponse != null && apiResponse.getData() != null) {
                        System.out.println("ApiResponse<String> return value: " + apiResponse.getData());
                    }
                }
            }
        }
    }
}


