package com.store.storefront.service;

import java.util.List;

import com.store.storefront.model.Friends;
import com.store.storefront.repository.FriendsRepo;

import org.springframework.stereotype.Service;

@Service
public class FriendsService {

	//Annotazione che implementa le dependency injection, principio fondamentale dei framework
	//Inietta automaticamente le dipendenze
	//Elimina la necessità di creare manualmente le istanze
	private final FriendsRepo repo;

	public FriendsService(FriendsRepo repo) {
		this.repo = repo;
	}
	
	public List <Friends> getAll() {
		return repo.findAll();
	}
	
	public Friends newFriends(Friends amico) {
		return repo.save(amico);
	}
	
	public Friends updateFriends (Friends amico) {
		return repo.save(amico);
	}
	
	public void deleteFriends(int id) {
		repo.deleteById(id);	
	}
	
	public Friends findById(int id) {
		return repo.findById(id).orElse(null);
	}

	public List<Friends> getFriendsList(int id) {
		return repo.getFriendsByFirstPlayer(id);
	}
}
