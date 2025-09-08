package com.store.storefront;

import java.io.Serializable;

public enum ReviewableEntities implements Serializable {
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
