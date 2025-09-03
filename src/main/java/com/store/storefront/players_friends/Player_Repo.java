package com.store.storefront.players_friends;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
//fà comunicare i dati tra il database e Spreengboot
public interface Player_Repo extends JpaRepository <Player, Integer>{
//estende l'interfaccia con JPARepositoryche è una generica di Spreeng e specifica l'entità Player_Model e il tipo della chiave primaria

}
