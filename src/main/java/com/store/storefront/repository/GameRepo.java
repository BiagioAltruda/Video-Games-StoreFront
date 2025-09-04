package com.store.storefront.repository;

import com.store.storefront.model.Game;
import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepo extends JpaRepository<Game, Integer> { //Main Repository for Games table

    public Game save(Game game);
    public Game findGameByName(String name);
}

