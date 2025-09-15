package com.store.storefront.controller;

import com.store.storefront.model.Player;
import com.store.storefront.service.PlayerService;

import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;
import java.text.SimpleDateFormat;
import java.util.*;

@CrossOrigin(origins = "*") // Consente richieste CORS da qualsiasi origine (solo per sviluppo)
@Controller
@RequestMapping("/smoke/accounts") // Endpoint for account and login management
public class LoginController {
    PlayerService service;
    private final Map<String, Player> validSessions = new HashMap<>();
    public LoginController(PlayerService service) {
        this.service = service;
    }

    @ResponseBody
    @PostMapping("/register")
    public String register(@RequestParam String name, @RequestParam String password) {

        if (service.findByName(name) != null)
            return "A player with the same name already exists";
        Date date = new Date(); //get current timestamp
        long time = date.getTime();
        SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss"); //format it in that pattern
        String str = sdf.format(time); //save it as string
        Player p =  new Player();
        p.setName(name);
        p.setPassword(password);
        //p.setCreation_date();
        service.newAccount(p);
        return "Account created successfully";
    }

    @ResponseBody
    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestParam String username, @RequestParam String password) {

        Player p = service.findByNameAndPass(username, password);
        if (p == null)
            return ResponseEntity.status(404).body(null);
        if (!password.equals(p.getPassword()))
            return ResponseEntity.status(404).body(null);
        System.out.println(p);
        String token = UUID.randomUUID().toString();
        //p.getTransactions();
        validSessions.put(token, p);
        return ResponseEntity.ok(token);
    }


    @GetMapping("/profile")
    public ResponseEntity<Player> profile(@RequestHeader(value = "X-Token", required = false) String token) {
        System.out.println(token);
        if (token != null) {

            System.out.println(validSessions.containsKey(token));
            if (!validSessions.containsKey(token))
                return ResponseEntity.status(404).build();
            System.out.println(validSessions.get(token));
            int playerId = validSessions.get(token).getId();
            return ResponseEntity.ok(service.findById(playerId));
        }
        return ResponseEntity.notFound().build();

    }
    @PostMapping("/logout")
    public ResponseEntity<String> logout(@RequestHeader(value = "X-Token", required = false) String token) {
        validSessions.remove(token);
        return ResponseEntity.status(200).build();
    }

    @GetMapping("is-admin")
    public ResponseEntity<Boolean> isAdmin(@RequestHeader(value = "X-Token", required = false) String token) {
        if (!validSessions.containsKey(token))
            return ResponseEntity.status(404).build();
        return ResponseEntity.ok(validSessions.get(token).isAdmin());
    }
}



