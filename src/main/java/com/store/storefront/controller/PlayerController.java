package com.store.storefront.controller;

import java.util.List;
import java.util.Map;

import com.store.storefront.model.Player;
import com.store.storefront.service.PlayerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(origins = "*") // Consente richieste CORS da qualsiasi origine (solo per sviluppo)
@RestController // Indica che questa classe gestisce richieste REST
@RequestMapping("/api/player") // Prefisso comune per tutti gli endpoint 
public class PlayerController {
		
	//DEPENDENCY INJECTION
	private final PlayerService service;


	
	@Autowired
	public PlayerController (PlayerService service) {
		this.service = service;
	}
	
	@GetMapping
	public List<Player> getAll(){
		return service.getAll();
	}
	
	@PostMapping("/new")
	public Player newPlayer(@Validated @RequestBody Player account) {
		return service.newAccount(account);
	}
	
	@PostMapping("/update")
	public Player updatePlayer(@Validated @RequestBody Player p) {
		return service.updateAccount(p);
	}
	
	@DeleteMapping("/{id}")
	public void deleteAccount (@PathVariable int id) {
		service.deleteAccount(id);
	}

}
