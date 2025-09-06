package com.store.storefront.model;

import java.sql.Date;
import java.util.HashSet;
import java.util.List;
import java.util.Set;

import com.store.storefront.trending.Trending;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Positive;
import jakarta.validation.constraints.PositiveOrZero;

@Entity
@Table(name = "players")
public class Player { //Entity responsible for storing the player data
	
	//Attributi classe players
	@Id
	@Positive(message = "id cannot be negative")
	private int id;
	@NotBlank(message = "name cannot be blank")
	private String name;
	@NotBlank(message = "password cannot be blank")
	private String password;


	@PositiveOrZero(message = "player level cannot be negative")
	private int playerLevel;
	@NotNull(message = "account creation date cannot be null")
	private Date creationDate;

	private String language;
	//Token field for storing temporary session tokens for authentication's sake
	//This way we can include the token directly into the player object sent and recived from the client
	@Transient
	private String token;

	@ManyToMany
	@JoinTable(
			name = "friends", //name of the relationships table
			joinColumns = @JoinColumn(name = "player_1"), //name THIS entity in the other table
			inverseJoinColumns = @JoinColumn(name = "player_2") //name of the other entity
	)
	private Set<Player> friends = new HashSet<>(); //Set containing friend list

	@ManyToMany(mappedBy = "friends") //bidirectional relation with mappedby
	private Set<Player> friendOf = new HashSet<>();

	//One-to-Many relationship to the games table using the transactions table
	@OneToMany(mappedBy = "player", cascade = CascadeType.ALL, fetch = FetchType.LAZY)
	private Set<Transaction> transactions = new HashSet<>();

	//Player class constructors
	public Player(int id, String name, String password, int playerLevel, Date creation_date, String language) {
		this.id=id;
		this.name=name;
		this.password=password;
		this.playerLevel =playerLevel;
		this.creationDate =creation_date;
		this.language = language;
	}

	public Player(String name, String password){
		this.name=name;
		this.password=password;
	}
	public Player(){}


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

	public Date getCreationDate() {
		return creationDate;
	}

	public void setCreationDate(Date creation_date) {
		this.creationDate = creation_date;
	}

	public String getLanguage() {
		return language;
	}

	public void setLanguage(String Language) {
		this.language = Language;
	}

	public String getToken() {
		return token;
	}

	public void setToken(String token) {
		this.token = token;
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
}
