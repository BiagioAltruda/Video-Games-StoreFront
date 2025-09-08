package com.store.storefront.model;

import jakarta.persistence.Entity;
import org.springframework.boot.autoconfigure.domain.EntityScan;

@EntityScan(basePackageClasses = Reviewable.class)
public interface Reviewable {

    public void addReview (Review review);

    public String removeReview(Review review);

    public int getId();
}
