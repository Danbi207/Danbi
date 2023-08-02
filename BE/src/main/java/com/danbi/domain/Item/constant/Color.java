package com.danbi.domain.Item.constant;


import lombok.Getter;

@Getter
public enum Color {

    // TODO: Color RGB값 넣기
    RED("빨강","#ea8686","#c92b2a"),
    YELLOW("노랑", "#f9df8b","#ec992f"),
    ORANGE("주황","#ef9c68","#d9480f"),
    GREEN("초록","#a3cd69","#5c940d"),
    BLUE("파랑","#6ca8dc","#1764aa"),
    NAVY("남색","#8597e9","#364fc6"),
    PURPLE("보라","#c283d4","#a558b8"),
    BRONZE("브론즈","#cd9a6b","#ac5600"),
    SILVER("실버","#90a0b0","#445f7a"),
    GOLD("골드","#f1c16c","#d28200"),
    PLATINUM("플레티넘","#7febc9","#23c187"),
    DIAMOND("다이아몬드","#6ad1fc","#00a5d7"),
    PINK("핑크쏘세지","#FFACAC","#FFEEBB"),
    ;

    public static Color from(String color) {
        return Color.valueOf(color.toUpperCase());
    }

    Color(String name, String uncheckedRgb, String checkedRgb) {
        this.name = name;
        this.uncheckedRgb = uncheckedRgb;
        this.checkedRgb = checkedRgb;
    }
    private String name;
    private String uncheckedRgb;
    private String checkedRgb;
}
