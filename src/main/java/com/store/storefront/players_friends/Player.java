package com.store.storefront.players_friends;

import java.sql.Date;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Player {
	
	//Attributi classe players
	@Id
	private int id;
	private String name;
	private String password;
	private int games;
	private int player_livel;
	private Date creation_date;
	private String game_language;
	
	//Costruttore classe players
	public Player(int id, String name, String password, int games, int player_livel, Date creation_date, String game_language) {
		this.id=id;
		this.name=name;
		this.password=password;
		this.games=games;
		this.player_livel=player_livel;
		this.creation_date=creation_date;
		this.game_language=game_language;		
	}

	
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

	public int getPlayer_livel() {
		return player_livel;
	}

	public void setPlayer_livel(int player_livel) {
		this.player_livel = player_livel;
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
	
	
}
