package com.danbi.domain.Item.constant;


import lombok.Getter;

@Getter
public enum Color {

    // TODO: Color RGB값 넣기
    YELLOW("YYYYYY"),
    BLACK("BBBBBB"),
    GREEN("GGGGGG")
    ;

    public static Color from(String color) {
        return Color.valueOf(color.toUpperCase());
    }

    Color(String rgb) {
        this.rgb = rgb;
    }
    private String rgb;
}
