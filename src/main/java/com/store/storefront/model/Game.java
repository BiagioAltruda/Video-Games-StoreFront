package com.store.storefront.model;

import com.store.storefront.trending.Trending;
import jakarta.persistence.*;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Positive;

import java.sql.Date;
import java.util.List;

@Entity
@Table(name = "games_test") //Table responsible for containing the whole game catalogue
public class Game {

    @Id             //field with basic validation, not validated field are optional for game creation's sake
    @GeneratedValue //can be added later with no issue
    @Column(name = "appid")
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
    private String description;
    private Integer rating;
    @Column(name = "banner")
    private String bannerPath;
    @OneToMany(mappedBy = "game", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
    private List<Trending> trending;

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
}
