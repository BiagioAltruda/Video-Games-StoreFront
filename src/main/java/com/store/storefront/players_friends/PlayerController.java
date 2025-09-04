package com.store.storefront.players_friends;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
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
	
	@GetMapping
	public List<Player> getAll(){
		return service.getAll();
	}
	
	@PostMapping("/new")
	public Player newPlayer(@RequestBody Player account) {
		return service.newAccount(account);
	}
	
	@PostMapping("/update")
	public Player updatePlayer(@RequestBody Player p) {
		return service.updateAccount(p);
	}
	
	@DeleteMapping("/{id}")
	public void deleteAccount (@PathVariable int id) {
		service.deleteAccount(id);
	}
	
}
