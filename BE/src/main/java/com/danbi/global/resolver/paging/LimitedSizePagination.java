package com.danbi.global.resolver.paging;

import java.lang.annotation.*;

@Target({ElementType.METHOD})
@Retention(RetentionPolicy.RUNTIME)
@Inherited
public @interface LimitedSizePagination {
    int maxSize() default 500;
}
