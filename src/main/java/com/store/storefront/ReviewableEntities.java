package com.store.storefront;

public enum ReviewableEntities {
    GAME("GAME"),
    PLAYER("PLAYER");

    private final String value;
    private ReviewableEntities(String value) {
        this.value = value;
    }
    public String getValue() {
        return value;
    }
}
