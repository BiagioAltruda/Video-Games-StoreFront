package com.store.storefront.controller;

import com.store.storefront.model.Game;
import com.store.storefront.service.GameService;

import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(value = "*")
@RestController
@RequestMapping("smoke/games")
public class GameController { //Restful controller for the Games table

    GameService service;

    public GameController(GameService service) { //DI for service
        this.service = service;
    }

    //Basic CRUD methods, including fetching by game name
    @GetMapping("/all")
    public List<Game> getAllGames(){
        return service.getAllGames();
    }
    //da gioco per id
    @GetMapping("/{id}")
    public Game getGame(@PathVariable int id){
        return service.getGameById(id);
    }
    // prende il gioco per titolo
    @GetMapping("/title/{name}")
    public Game getGamesByName(@PathVariable String name){
        return service.getGameByName(name);
    }
    //aggiungi gioco
    @PostMapping("/add")
    public Game addGame(@Validated @RequestBody Game game){
        return service.save(game);
    }
    //aggiorna gioco
    @PutMapping("/update")
    public Game updateGame(@Validated @RequestBody Game game){
        return service.save(game);
    }
    //elimina
    @DeleteMapping("/delete/{id}")
    public String deleteGame(@PathVariable int id){
        return service.deleteGameById(id);
    }

}
