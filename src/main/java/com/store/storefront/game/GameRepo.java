package com.store.storefront.game;

import org.springframework.data.jpa.repository.JpaRepository;

public interface GameRepo extends JpaRepository<Game, Integer> {

    public Game save(Game game);

    public Game findGameByName(String name);
}

