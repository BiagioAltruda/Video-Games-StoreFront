package com.store.storefront.controller;

import com.store.storefront.ReviewableEntities;
import com.store.storefront.model.Review;
import com.store.storefront.model.Reviewable;
import com.store.storefront.repository.PlayerService;
import com.store.storefront.repository.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("smoke.com/review")
public class ReviewController {
    private final ReviewService reviewService;
    private final PlayerService  playerService;
    @Autowired
    public ReviewController(ReviewService reviewService,  PlayerService playerService) {
        this.reviewService = reviewService;
        this.playerService = playerService;
    }
    @GetMapping("/all")
    public List<Review> getAllReviews() {
        return reviewService.getAll();
    }
    @GetMapping("/{id}")
    public Review getReviewById(@PathVariable int id) {
        return reviewService.getReviewById(id);
    }
    @GetMapping("/entity/{id}-{type}")
    public ResponseEntity<List<Review>> getReviewByEntity(@PathVariable int id, @PathVariable String type) {
        if (type.equals("PLAYER"))
            return ResponseEntity.ok(reviewService.findReviewsByEntityIdAndType(id, ReviewableEntities.PLAYER));
        if (type.equals("GAME"))
            return ResponseEntity.ok(reviewService.findReviewsByEntityIdAndType(id, ReviewableEntities.GAME));
        return ResponseEntity.notFound().build();
    }

    @GetMapping("/player/{playerId}")
    public List<Review> getReviewByPlayerId(@PathVariable int playerId) {
        return reviewService.findReviewsByPlayerId(playerId);
    }
    @PostMapping("/add/{posterId}")
    public Reviewable addReview(@RequestBody Review review, @RequestBody Reviewable reviewable, @PathVariable int posterId) {
        review.setReviewedId(reviewable.getId());
        review.setPlayer(playerService.findById(posterId));
        return reviewService.createReview(review);
    }
    @DeleteMapping("/delete/{id}")
    public void deleteReview(@PathVariable int id) {
        reviewService.deleteReviewById(id);
    }

}
