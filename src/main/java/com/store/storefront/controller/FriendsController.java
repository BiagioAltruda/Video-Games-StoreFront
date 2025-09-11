package com.store.storefront.controller;

import java.util.List;

import com.store.storefront.model.Friends;
import com.store.storefront.service.FriendsService;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;
@CrossOrigin(origins = "*")
@RestController
@RequestMapping("/smoke/friends")

public class FriendsController {

	// DEPENDENCY INJECTION
	private final FriendsService service;

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

	@GetMapping("friend-list")
	public List<Friends> getFriendsList(@RequestParam int id) {
		return service.getFriendsList(id);
	}
}
