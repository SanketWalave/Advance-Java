package com.ratingApp.StoreRating;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class AdminControler {

    @GetMapping("/admin/home")
    public String adminHome() {
        return "This is the admin home page.";
    }
}
