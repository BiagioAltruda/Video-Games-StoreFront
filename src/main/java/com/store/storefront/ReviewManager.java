package com.store.storefront;

public interface ReviewManager {
    public Integer addReview (Integer reviewerId, Integer reviewedId, boolean positive);

    public void removeReview(Integer reviewId);
}
