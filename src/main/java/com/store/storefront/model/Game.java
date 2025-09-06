package com.store.storefront.model;

import com.store.storefront.trending.Trending;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "games_test") //Table responsible for containing the whole game catalogue
public class Game implements Reviewable{

    @Id             //field with basic validation, not validated field are optional for game creation's sake
    @GeneratedValue //can be added later with no issue
    @Column(insertable = false,updatable = false, name = "appid")
    @Min(1)
    @Positive(message = "id has to be a positive number")
    private Integer id;
    @NotBlank(message = "game name cannot be blank")
    private String name;
    @NotBlank(message = "developer name cannot be blank")
    private String developer;
    @Positive(message = "price cannot be negative")
    private Double price;
    @NotBlank(message = "genre cannot be blank")
    private String genre;
    @Column(name = "release_date")
    private Date releaseDate;
    @Column(length = 1000)
    private String description;
    private Integer rating;
    @Column(name = "banner")
    private String bannerPath;
    //One-to-many relationship to the trending table
    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Trending> trending;


    //One-to-Many relationship to the players table using the transactions table
    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Transaction> transactions = new HashSet<>();

    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private Set<Review> reviews = new HashSet<>();

    public Game() {}

    public Game(Integer id, String name, String developer, Double price, String genre, Date releaseDate, String description, Integer rating, String bannerPath, List<Trending> trending, Set<Transaction> transactions, Set<Review> reviews) {
        this.id = id;
        this.name = name;
        this.developer = developer;
        this.price = price;
        this.genre = genre;
        this.releaseDate = releaseDate;
        this.description = description;
        this.rating = rating;
        this.bannerPath = bannerPath;
        this.trending = trending;
        this.transactions = transactions;
        this.reviews = reviews;
    }

    @Override
    public void addReview(Review review) {
        this.reviews.add(review);
    }

    @Override
    public String removeReview(Review review) {
        if(this.reviews.contains(review)) {
            this.reviews.remove(review);
            return "200";
        }
        else
            return "404";
    }
    public void setId(Integer id) {
        this.id = id;
    }

    public Integer getId() {
        return id;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public String getDeveloper() {
        return developer;
    }

    public void setDeveloper(String developer) {
        this.developer = developer;
    }

    public Double getPrice() {
        return price;
    }

    public void setPrice(Double price) {
        this.price = price;
    }

    public String getGenre() {
        return genre;
    }

    public void setGenre(String genre) {
        this.genre = genre;
    }

    public Date getReleaseDate() {
        return releaseDate;
    }

    public void setReleaseDate(Date releaseDate) {
        this.releaseDate = releaseDate;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public Integer getRating() {
        return rating;
    }

    public void setRating(Integer rating) {
        this.rating = rating;
    }

    public String getBannerPath() {
        return bannerPath;
    }

    public void setBannerPath(String bannerPath) {
        this.bannerPath = bannerPath;
    }

    public List<Trending> getTrending() {
        return trending;
    }

    public void setTrending(List<Trending> trending) {
        this.trending = trending;
    }

    public Set<Transaction> getTransactions() {
        return transactions;
    }

    public void setTransactions(Set<Transaction> transactions) {
        this.transactions = transactions;
    }

    public Set<Review> getReviews() {
        return reviews;
    }

    public void setReviews(Set<Review> reviews) {
        this.reviews = reviews;
    }


}
