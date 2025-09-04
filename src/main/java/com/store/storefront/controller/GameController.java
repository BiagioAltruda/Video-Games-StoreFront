package com.store.storefront.controller;

import com.store.storefront.repository.GameService;
import com.store.storefront.model.Game;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(value = "*")
@RestController
@RequestMapping("/smoke/games")
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

    @GetMapping("/{id}")
    public Game getGame(@PathVariable int id){
        return service.getGameById(id);
    }
    @GetMapping("/title/{name}")
    public Game getGamesByName(@PathVariable String name){
        return service.getGameByName(name);
    }
    @PostMapping("/add")
    public Game addGame(@Validated @RequestBody Game game){
        return service.save(game);
    }
    @PutMapping("/update")
    public Game updateGame(@Validated @RequestBody Game game){
        return service.save(game);
    }
    @DeleteMapping("/delete/{id}")
    public String deleteGame(@PathVariable int id){
        return service.deleteGameById(id);
    }

}
