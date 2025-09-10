package com.store.storefront.utils;

public enum languages {
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

    languages(String code) {
        this.code = code;
    }

    public String getCode() {
        return code;
    }
}
