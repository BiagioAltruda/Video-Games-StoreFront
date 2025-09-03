package com.store.storefront.players_friends;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
//fà comunicare i dati tra il database e Spreengboot
public interface FriendsRepo extends JpaRepository <Friends, Integer>{
	//estende l'interfaccia con JPARepositoryche è una generica di Spreeng e specifica l'entità Friends_Model e il tipo della chiave primaria


}
