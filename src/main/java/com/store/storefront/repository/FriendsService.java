package com.store.storefront.repository;

import java.util.List;

import com.store.storefront.model.Friends;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class FriendsService {
	
	@Autowired
	//Annotazione che implementa le dependency injection, principio fondamentale dei framework
	//Inietta automaticamente le dipendenze
	//Elimina la necessità di creare manualmente le istanze
	private FriendsRepo repo;
	
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
		return repo.findById(id).get();
	}
}
