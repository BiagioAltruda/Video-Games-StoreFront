package com.store.storefront;

import com.store.storefront.model.Game;
import com.store.storefront.repository.GameService;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.orm.jpa.DataJpaTest;

import static org.junit.jupiter.api.Assertions.*;

@DataJpaTest
public class GameTest {

    private final GameService service;

    @Autowired
    public GameTest(GameService service) {
        this.service = service;
    }

    @Test
    public void createGameTest(){ //Controls proper game creation
    Game game = new Game();
    game.setId(1);
    game.setName("test"); //with mandatory fields
    game.setDeveloper("test");
    game.setGenre("test");

    service.save(game); //commits the game to the db
    assertAll(
            () -> assertTrue(game.getId()>0),
            () -> assertFalse(game.getName().isBlank()),
            () -> assertFalse(game.getDeveloper().isBlank()),
            () -> assertFalse(game.getGenre().isBlank())
            );

    }
}
