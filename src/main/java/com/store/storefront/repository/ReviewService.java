package com.store.storefront.repository;

import com.store.storefront.ReviewableEntities;
import com.store.storefront.model.Review;
import com.store.storefront.model.Reviewable;
import org.springframework.beans.factory.annotation.Autowired;

public class ReviewService{

    private final ReviewRepo reviewRepo;
    private final GameRepo gameRepo;
    private final PlayerRepo playerRepo;

    public ReviewService(ReviewRepo reviewRepo, GameRepo gameRepo, PlayerRepo playerRepo) {
        this.reviewRepo = reviewRepo;
        this.gameRepo = gameRepo;
        this.playerRepo = playerRepo;
    }

    public Reviewable createReview(Review review){
        if ("GAME".equals(review.getReviewedType().getValue()))
            return gameRepo.findById(review.getReviewedId()).orElse(null);
        if ("PLAYER".equals(review.getReviewedType().getValue()))
            return playerRepo.findById(review.getReviewedId()).orElse(null);
        return null;
    }



}
