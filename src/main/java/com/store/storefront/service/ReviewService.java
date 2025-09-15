package com.store.storefront.service;

import com.store.storefront.ReviewableEntities;
import com.store.storefront.model.Review;
import com.store.storefront.repository.GameRepo;
import com.store.storefront.repository.PlayerRepo;
import com.store.storefront.repository.ReviewRepo;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService{

    private final ReviewRepo reviewRepo;
    private final GameRepo gameRepo;
    private final PlayerRepo playerRepo;

    public ReviewService(ReviewRepo reviewRepo, GameRepo gameRepo, PlayerRepo playerRepo) {
        this.reviewRepo = reviewRepo;
        this.gameRepo = gameRepo;
        this.playerRepo = playerRepo;
    }
/*
    public Reviewable createReview(Review review){
        if ("GAME".equals(review.getReviewedType().getValue())){
            return gameRepo.findById(review.getReviewedId()).orElse(null);
        }

        if ("PLAYER".equals(review.getReviewedType().getValue()))
            return playerRepo.findById(review.getReviewedId()).orElse(null);
        return null;
    }
  */
  public Review createReview(Review review) {
      return reviewRepo.save(review);
  }
    public List<Review> getAll(){
        return reviewRepo.findAll();
    }
    public Review getReviewById(int id){
        return reviewRepo.findById(id).orElse(null);
    }
    public void deleteReviewById(int id){
        reviewRepo.deleteById(id);
    }
    public Review updateReview(Review review){
        return reviewRepo.save(review);
    }
    public List<Review> findReviewsByPlayerId(int reviewedId){
        return  reviewRepo.findReviewsByReviewedId(reviewedId);
    }
    public List<Review> findReviewsByEntityIdAndType(int reviewedId, ReviewableEntities reviewedType){
        return reviewRepo.findReviewsByReviewedIdAndReviewedType(reviewedId, reviewedType);
    }

}
