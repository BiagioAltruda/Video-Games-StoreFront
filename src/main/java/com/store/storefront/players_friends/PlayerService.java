package com.store.storefront.players_friends;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PlayerService {
	
	@Autowired
	//Annotazione che implementa le dependency injection, principio fondamentale dei framework
	//Inietta automaticamente le dipendenze
	//Elimina la necessità di creare manualmente le istanze

	private PlayerRepo repo;
	
	public Player newAccount(Player account) {
		return repo.save(account);	}
	//.save è un metodo preimpostato che salva gli oggetti "libro" nel database.
	
	public Player updateAccount (Player account) {
		return repo.save(account);
	}
	
	public void deleteAccount (int id) {
		repo.deleteById(id);
	}
	
	public List <Player> getAll() {
		return repo.findAll();
	}
	
	public Player findByNameAndPass(String name, String password) {
		return repo.findByNameAndPassword(name, password);
	}
	public Player findByName(String name) {
		return repo.findByName(name);
	}
}

	