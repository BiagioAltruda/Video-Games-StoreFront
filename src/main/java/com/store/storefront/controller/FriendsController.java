package com.store.storefront.controller;

import java.util.List;

import com.store.storefront.model.Friends;
import com.store.storefront.repository.FriendsService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/friends")
public class FriendsController {

	// DIPENDENCY INJECTION
	private final FriendsService service;
	// Crea un'istanza di "LibroService" Classe dove all'interno ho i metodi

	@Autowired
	public FriendsController(FriendsService service) {
		this.service = service;
	}
	
	@GetMapping
	public List<Friends> getAll(){
		return service.getAll();
	}
	
	@PostMapping
	public Friends newFriends(@RequestBody Friends amico) {
		return service.newFriends(amico);
	}
	
	@DeleteMapping("/{id}")
	public void deleteFriends(@PathVariable int id) {
		service.deleteFriends(id);
	}
	
	@GetMapping("/{id}")
	public Friends findById(@PathVariable int id) {
		return service.findById(id);
	}
}
