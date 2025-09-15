package com.store.storefront.model;
 
import java.sql.Date;
import java.time.LocalDate;
import java.util.HashSet;
import java.util.Set;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.fasterxml.jackson.databind.annotation.JsonDeserialize;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;
 
@Entity
@Table(name = "players")
public class Player implements Reviewable{ //Entity responsible for storing the player data
 
	//Attributi classe players
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private int id;
	@NotBlank(message = "name cannot be blank")
	private String name;
	@NotBlank(message = "password cannot be blank")
	private String password;

	@PositiveOrZero(message = "player level cannot be negative")
	private int playerLevel;
	private LocalDate creationDate;
 
	private String language;

	@Column(name = "is_Admin")
	@JsonIgnore
	private boolean isAdmin;

	@JsonIgnore
	@ManyToMany
	@JoinTable(
			name = "friends", //name of the relationships table
			joinColumns = @JoinColumn(name = "player_1"), //name THIS entity in the other table
			inverseJoinColumns = @JoinColumn(name = "player_2") //name of the other entity
	)
	private Set<Player> friends = new HashSet<>(); //Set containing friend list

	@JsonIgnore
	@ManyToMany(mappedBy = "friends") //bidirectional relation with mappedby
	private Set<Player> friendOf = new HashSet<>();
 
	//One-to-Many relationship to the games table using the transactions table

	@JsonIgnore //avoids looping
	@OneToMany(mappedBy = "player", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Transaction> transactions = new HashSet<>();
 
	//One-To-Many side of review relation
 
	@OneToMany(mappedBy = "player", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Review> reviews = new HashSet<>();
 
	//Player class constructors
	public Player(int id, String name, String password, int playerLevel, LocalDate creation_date, String language, Set<Review> reviews) {
		this.id=id;
		this.name=name;
		this.password=password;
		this.playerLevel =playerLevel;
		this.creationDate =creation_date;
		this.language = language;
		this.reviews = reviews;
	}
 
	public Player(String name, String password){
		this.name=name;
		this.password=password;
	}
	public Player(){}
 
 
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
 
	//Getters and setters
	public int getId() {
		return id;
	}
 
	public void setId(int id) {
		this.id = id;
	}
 
	public String getName() {
		return name;
	}
 
	public void setName(String name) {
		this.name = name;
	}
 
	public String getPassword() {
		return password;
	}
 
	public void setPassword(String password) {
		this.password = password;
	}
 
	public int getPlayerLevel() {
		return playerLevel;
	}
 
	public void setPlayerLevel(int playerLevel) {
		this.playerLevel = playerLevel;
	}
 
	public LocalDate getCreationDate() {
		return creationDate;
	}
 
	public void setCreationDate(LocalDate creation_date) {
		this.creationDate = creation_date;
	}
 
	public String getLanguage() {
		return language;
	}
 
	public void setLanguage(String Language) {

		this.language = Language;
	}
 
	public Set<Player> getFriends() {
		return friends;
	}
 
	public void setFriends(Set<Player> friends) {
		this.friends = friends;
	}
 
	public Set<Player> getFriendOf() {
		return friendOf;
	}
 
	public void setFriendOf(Set<Player> friendOf) {
		this.friendOf = friendOf;
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

	public boolean isAdmin() {
		return isAdmin;
	}

	public void setAdmin(boolean admin) {
		isAdmin = admin;
	}

	@Override
	public String toString() {
		return "Player{" +
				"id=" + id +
				", name='" + name + '\'' +
				", password='" + password + '\'' +
				'}';
	}
}
