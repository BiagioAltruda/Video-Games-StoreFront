package com.store.storefront.repository;

import com.store.storefront.model.Player;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
//fà comunicare i dati tra il database e Spreengboot
public interface PlayerRepo extends JpaRepository <Player, Integer>{
//estende l'interfaccia con JPARepositoryche è una generica di Spreeng e specifica l'entità Player_Model e il tipo della chiave primaria

	Player findByNameAndPassword(String name, String password);
	 //SELECT * FROM player WHERE name = ? AND password = ?
	Player findByName(String name);
}
