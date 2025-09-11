package com.store.storefront.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Friends { //support entity for the Many to Many relation to and from the players table

	//Attributi
	@JsonIgnore
	@Id
	private int id;
	@Column(name = "player_1")
	private int firstPlayer;
	@Column(name = "player_2")
	private int secondPlayer;
	
	//Costruttore
	public Friends(int id, int firstPlayer, int secondPlayer) {
		this.id=id;
		this.firstPlayer = firstPlayer;
		this.secondPlayer = secondPlayer;
	}

	public Friends() {}

	//Metodi Get e Setter
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getFirstPlayer() {
		return firstPlayer;
	}

	public void setFirstPlayer(int player_1) {
		this.firstPlayer = player_1;
	}

	public int getSecondPlayer() {
		return secondPlayer;
	}

	public void setSecondPlayer(int player_2) {
		this.secondPlayer = player_2;
	}
	
	
}
