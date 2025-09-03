package com.store.storefront.players_friends;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/player")
public class PlayerController {
		
	//DIPENDENCY INJECTION
	private final PlayerService service;
	//Crea un'istanza di "LibroService" Classe dove all'interno ho i metodi 
	
	@Autowired
	public PlayerController (PlayerService service) {
		this.service = service;
	}
	
	
}
