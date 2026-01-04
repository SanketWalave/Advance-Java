package com.ratingApp.StoreRating.controller;



import com.ratingApp.StoreRating.AdminService;
import com.ratingApp.StoreRating.model.dto.UseDto;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@Tag(name = "Admin API", description = "Operations related to Admin management")
public class AdminControler {

    @Autowired
    private AdminService adminService;

    @GetMapping("/adminHome")
    public String adminHome() {
        System.out.println("Admin home page accessed.");
        return "This is the admin home page.";
    }

    @PostMapping("/addAdmin")
    public ResponseEntity<UseDto> addAdmin(@RequestPart UseDto useDto, @RequestPart MultipartFile multipartFile) {
        System.out.println("\n\n\nin addAdmin controller\n\n"+useDto);
        UseDto save = null;
        save = adminService.saveAdmin(useDto, multipartFile);
        if (save != null) return ResponseEntity.ok(save);
        else return ResponseEntity.internalServerError().build();
    }


    @GetMapping("/getAdminInfo")
    public ResponseEntity<List<UseDto>> getAdminInfo() {
        return ResponseEntity.ok(adminService.getAllAdmins());
    }

    @PostMapping("/editAdminProfile/{id}")
    public ResponseEntity<UseDto> editAdminProfile(@RequestPart UseDto useDto, @RequestPart MultipartFile multipartFile,@PathVariable int id) {
        UseDto updatedAdmin = adminService.updateAdminProfile(id, useDto, multipartFile);
        if (updatedAdmin != null) {
            return ResponseEntity.ok(updatedAdmin);
        } else {
            return ResponseEntity.internalServerError().build();
        }
    }

}
