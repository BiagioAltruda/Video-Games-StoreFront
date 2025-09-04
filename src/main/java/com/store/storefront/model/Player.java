package com.store.storefront.model;

import java.sql.Date;
import java.util.HashSet;
import java.util.Set;

import jakarta.persistence.*;

@Entity
@Table(name = "players")
public class Player {
	
	//Attributi classe players
	@Id
	private int id;
	private String name;
	private String password;
	private int games;
	private int player_level;
	private Date creation_date;
	private String game_language;
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



	//Costruttore classe players
	public Player(int id, String name, String password, int games, int player_livel, Date creation_date, String game_language) {
		this.id=id;
		this.name=name;
		this.password=password;
		this.games=games;
		this.player_level =player_livel;
		this.creation_date=creation_date;
		this.game_language=game_language;		
	}

	public Player(String name, String password){
		this.name=name;
		this.password=password;
	}
	public Player(){}


	//Metodi get e setter
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

	public int getGames() {
		return games;
	}

	public void setGames(int games) {
		this.games = games;
	}

	public int getPlayer_level() {
		return player_level;
	}

	public void setPlayer_level(int player_level) {
		this.player_level = player_level;
	}

	public Date getCreation_date() {
		return creation_date;
	}

	public void setCreation_date(Date creation_date) {
		this.creation_date = creation_date;
	}

	public String getGame_language() {
		return game_language;
	}

	public void setGame_language(String game_language) {
		this.game_language = game_language;
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
}
