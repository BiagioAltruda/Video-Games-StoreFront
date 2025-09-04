package com.store.storefront.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;

@Entity
public class Friends {

	//Attributi 
	@Id
	private int id;
	private int player_1;
	private int player_2;
	
	//Costruttore
	public Friends(int id, int player_1, int player_2) {
		this.id=id;
		this.player_1=player_1;
		this.player_2=player_2;
	}

	public Friends() {}

	//Metodi Get e Setter
	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public int getPlayer_1() {
		return player_1;
	}

	public void setPlayer_1(int player_1) {
		this.player_1 = player_1;
	}

	public int getPlayer_2() {
		return player_2;
	}

	public void setPlayer_2(int player_2) {
		this.player_2 = player_2;
	}
	
	
}
