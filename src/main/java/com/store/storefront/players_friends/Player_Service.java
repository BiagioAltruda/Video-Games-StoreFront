package com.store.storefront.players_friends;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class Player_Service {
	
	@Autowired
	//Annotazione che implementa le dependency injection, principio fondamentale dei framework
	//Inietta automaticamente le dipendenze
	//Elimina la necessità di creare manualmente le istanze

	private Player_Repo repo;
	
	public Player_Model newAccount(Player_Model account) {
		return repo.save(account);	}
	//.save è un metodo preimpostato che salva gli oggetti "libro" nel database.
	
	public Player_Model updateAccount (Player_Model account) {
		return repo.save(account);
	}
	
	public void deleteAccount (int id) {
		repo.deleteById(id);
	}
	
	public List <Player_Model> getAll() {
		return repo.findAll();
	}
	
	public List<Player_Model> findByNameAndPass(String name, String password) {
		return repo.findByNameAndPass(name, password);
	}
}

	