package com.store.storefront.controller;

import java.time.LocalDate;
import java.util.List;
import com.store.storefront.model.Player;
import com.store.storefront.service.PlayerService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.bind.annotation.CrossOrigin;
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

	@GetMapping("/{id}")
	public Player getById(@PathVariable int id){
		return service.findById(id);
	}

	@PostMapping("/new") //For manual adding/debugging only
	public Player newPlayer(@Validated @RequestBody Player account) {
		System.out.println("test");
		System.out.println(account);
		return service.newAccount(account);
	}
	
	@PutMapping("/update")
	public Player updatePlayer(@Validated @RequestBody Player p) {
		return service.updateAccount(p);
	}
	
	@DeleteMapping("/{id}")
	public void deleteAccount (@PathVariable int id) {
		service.deleteAccount(id);
	}

}
