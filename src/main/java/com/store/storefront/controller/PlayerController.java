package com.store.storefront.controller;

import java.util.List;

import com.store.storefront.model.Player;
import com.store.storefront.repository.PlayerService;
import jakarta.validation.Valid;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
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
