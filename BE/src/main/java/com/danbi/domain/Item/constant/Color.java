package com.danbi.domain.Item.constant;

import com.danbi.domain.member.constant.Gender;

public enum Color {

    // TODO: Color RGB값 넣기
    YELLOW("FFFFFF"),
    BLACK("FFFFFF"),
    GREEN("FFFFFF")
    ;

    public static Color from(String color) {
        return Color.valueOf(color.toUpperCase());
    }

    Color(String rgb) {
        this.rgb = rgb;
    }
    private String rgb;
}
