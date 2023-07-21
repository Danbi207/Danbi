package com.danbi.domain.Item.constant;

public enum Shape {

    STAR,
    SQUARE,
    ;

    public static Shape from(String shape) {
        return Shape.valueOf(shape.toUpperCase());
    }

}
