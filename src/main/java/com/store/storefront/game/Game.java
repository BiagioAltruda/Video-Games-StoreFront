package com.store.storefront.game;

import jakarta.persistence.*;

import java.sql.Blob;
import java.sql.Date;
@Entity
@Table(name = "games_test")
public class Game {

    @Id
    @GeneratedValue
    @Column(name = "appid")
    private Integer id;

    private String name;
    private String developer;
    private Double price;
    private String genre;
    @Column(name = "release_date")
    private Date releaseDate;
    private String description;
    private Integer rating;
    @Column(name = "banner")
    private String bannerPath;

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

}
