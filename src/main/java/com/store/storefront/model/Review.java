package com.store.storefront.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.store.storefront.ReviewableEntities;
import jakarta.persistence.*;

@Entity
@Table(name = "reviews") //table managing comment sections and game reviews
public class Review {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "review_id")
    private Integer id;

    //@Column(name = "reviewer_id")

    @JsonIgnore
    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "reviewer_id")
    private Player player;


    @Column(name = "reviewed_id")
    private int reviewedId;


    @Column(name = "is_positive_review")
    private boolean isPositiveReview;
    @Enumerated(EnumType.STRING)
    @Column(name = "reviewed_type")
    private ReviewableEntities reviewedType;

    private String content;

    public Review() {}

    public Review(Integer id, Player player, int reviewedId, boolean isPositiveReview, ReviewableEntities reviewedType, String content) {
        this.id = id;
        this.player = player;
        this.reviewedId = reviewedId;
        this.isPositiveReview = isPositiveReview;
        this.content = content;
        this.reviewedType = null;
        if(reviewedType.getValue().equals("GAME"))
            this.reviewedType = ReviewableEntities.GAME;
        if(reviewedType.getValue().equals("PLAYER"))
            this.reviewedType = ReviewableEntities.PLAYER;
    }

    /*
    public void assignReviewedEntity(Game game){
        this.reviewedType = ReviewableEntities.GAME;
        this.reviewedId = game.getId();
    }
    public void assignReviewedEntity(Player player){
        this.reviewedType = ReviewableEntities.PLAYER;
        this.reviewedId = player.getId();
    }
*/

    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Player getPlayer() {
        return player;
    }

    public void setPlayer(Player player) {
        this.player = player;
    }


    public boolean isPositiveReview() {
        return isPositiveReview;
    }

    public void setPositiveReview(boolean positiveReview) {
        isPositiveReview = positiveReview;
    }



    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public int getReviewedId() {
        return reviewedId;
    }

    public void setReviewedId(int reviewedId) {
        this.reviewedId = reviewedId;
    }

    public ReviewableEntities getReviewedType() {
        return reviewedType;
    }

    public void setReviewedType(ReviewableEntities reviewedType) {
        this.reviewedType = reviewedType;
    }
}

/*
example of accepted json for posting review
[
    {
        "id": 1,
        "player": {
            "id": 1,
            "name": "biagio",
            "password": "test",
            "playerLevel": 0,
            "creationDate": null,
            "language": null,
            "token": null,
            "friends": [],
            "friendOf": [],
            "transactions": []
        },
        "reviewedId": 10090,
        "reviewedType": "GAME",
        "content": "test",
        "positiveReview": true
    }
]
 */
