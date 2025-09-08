package com.store.storefront.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.store.storefront.model.Trending;
import com.store.storefront.repository.TrendingRepo;

@Service
public class TrendingService {
	
	private TrendingRepo trendingRepo;
	
	
	public TrendingService(TrendingRepo trendingRepo) {
		//costrutto
		this.trendingRepo = trendingRepo;
	}
	
	 public Trending save(Trending trending){
	        return trendingRepo.save(trending);
	    }
	 
	 public List<Trending> getAllTrend() {
			// TODO Auto-generated method stub
			return trendingRepo.findAll();
		}

	
		// Metodo per ottenere un nuovo tred tramite id

		public Trending getIdTrending(Integer id) {

			return trendingRepo.findById(id).orElse(null);
		}
		
		 //  Metodo per creare un nuovo trend
	    public Trending createTrending(Trending trending) {
	      
	        return trendingRepo.save(trending);    //// save() inserisce un nuovo record se l'id è null,
	}
	    
	    //metodo per eliminare
	    
	    public String deleteTrend(int id) {
	    	if(trendingRepo.existsById(id)) {
	    		trendingRepo.deleteById(id);
	    		return "Trend cancellato con successo";
	    	}
	    	else
	    		return "Trend non trovato";
	    }

		


}
