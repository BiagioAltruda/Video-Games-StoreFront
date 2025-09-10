package com.store.storefront.utils;

public enum Language {
    ENGLISH("en"),
    SPANISH("es"),
    FRENCH("fr"),
    GERMAN("de"),
    ITALIAN("it"),
    PORTUGUESE("pt"),
    CHINESE("zh"),
    JAPANESE("ja"),
    RUSSIAN("ru"),
    ARABIC("ar"),
    HINDI("hi"),
    DUTCH("nl"),
    SWEDISH("sv"),
    NORWEGIAN("no"),
    DANISH("da"),
    FINNISH("fi"),
    GREEK("el"),
    KOREAN("ko"),
    TURKISH("tr"),
    POLISH("pl"),
    HUNGARIAN("hu"),
    CZECH("cs"),
    ROMANIAN("ro"),
    THAI("th");

    private final String code;

    Language(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }

    public static boolean fromCode(String code) {
        for (Language lang : Language.values()) {
            if (lang.code.equalsIgnoreCase(code)) {
                return true;
            }
        }
        return false;
    }
}
