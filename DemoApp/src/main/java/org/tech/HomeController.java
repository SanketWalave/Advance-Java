package org.tech;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.ModelAndView;
import org.tech.model.Employee;
import org.tech.model.Player;
import org.tech.repo.PlayerRepo;

@Controller
public class HomeController {	

    @Autowired
    private PlayerRepo playerRepo;

    @GetMapping("/viewPlayer")
    public ModelAndView viewPlayers() {
        ModelAndView mv = new ModelAndView();
        mv.addObject("players", playerRepo.getPlayers()); 
//        playerRepo.getPlayers().forEach(System.out::println);
        mv.setViewName("home"); 
        return mv;
    }

    @GetMapping("/savePlayer")
    public String saveEmployee( ) {
    	
    	return "savePlayer";    	
    }
    
    @PostMapping("/savePlayer")
    public String saveEmployee( Player player) {
    	playerRepo.savePlayer(player);
    	return "savePlayer";    	
    }
    @PostMapping("/deletePlayer")
    public String deleteEmployee(@RequestParam("id")int id){

    	playerRepo.deletePlayer(id);
        return "redirect:/viewPlayer";

    }
    @GetMapping("/updatePlayer")
    public String updateEmployee(@RequestParam("id") int id, Model model) {
        Player player = playerRepo.getPlayerById(id);
        model.addAttribute("player", player);
        return "updatePlayer";  
    }
    @PostMapping("/saveUpdatePlayer")
    public String saveUpdatedEmployee(@ModelAttribute("player") Player player) {
    	playerRepo.updatePlayer(player);
        return "redirect:/viewPlayer";
    }
    @GetMapping("/search")
    @ResponseBody
    public List<Player> search(@RequestParam("skey")String skey ){
    	System.out.println(skey);
    	playerRepo.searchPlayer(skey).forEach(System.out::println);
    	return playerRepo.searchPlayer(skey);
    }
    
}
