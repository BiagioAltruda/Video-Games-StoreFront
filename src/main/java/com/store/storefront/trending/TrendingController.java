package com.store.storefront.trending;

import java.util.List;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@CrossOrigin(value = "*") // per connettere fronte4nd
@RestController
@RequestMapping("/api/trending")
public class TrendingController {

	TrendingService service;

	public TrendingController() {

	}

	public TrendingController(TrendingService service) {
		// costruttore pieno
		this.service = service;
	}

	@GetMapping("/all") // per prendere tutti i trend
	public List<Trending> getAllTrend() {
		return service.getAllTrend();
	}

	@GetMapping("/{id}")
	public Trending getIdTrending(@PathVariable int id) {
		return service.getIdTrending(id);
	}

	@PostMapping("/add")
	public Trending createTrending(@RequestBody Trending trending) {
		return service.save(trending); //// save() inserisce un nuovo record se l'id è null,
	}
	
	@DeleteMapping("/delete/{id}")
	public String deleteTrend(@PathVariable int id) {
		return service.deleteTrend(id);
	}
	
	@PutMapping("/update")
	public Trending updateTrend (@RequestBody Trending trending) {
		return service.save(trending);
	}
}
