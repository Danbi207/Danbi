package com.danbi.global.util;

import org.springframework.http.ContentDisposition;

import java.nio.charset.StandardCharsets;
import java.time.LocalDateTime;

public class FileUtils {

    private static final String FILE_EXTENSION_SEPARATOR = ".";
    private static final String CATEGORY_PREFIX = "/";
    private static final String TIME_SEPARATOR = "_";
    private static final int UNDER_BAR_INDEX = 1;

    public static String buildFileName(String category, Long memberId, String originalFileName, LocalDateTime now) {
        // 파일 확장자
        int fileExtensionIndex = originalFileName.lastIndexOf(FILE_EXTENSION_SEPARATOR);
        String fileExtension = originalFileName.substring(fileExtensionIndex);
        // 파일 이름
        String fileName = originalFileName.substring(0, fileExtensionIndex);

        return category +  CATEGORY_PREFIX + memberId + CATEGORY_PREFIX  + fileName + TIME_SEPARATOR + now + fileExtension;
    }

    public static ContentDisposition createContentDisposition(String categoryWithFileName) {
        String fileName = categoryWithFileName.substring(
                categoryWithFileName.lastIndexOf(CATEGORY_PREFIX) + UNDER_BAR_INDEX);
        return ContentDisposition.builder("attachment")
                .filename(fileName, StandardCharsets.UTF_8)
                .build();
    }
}
