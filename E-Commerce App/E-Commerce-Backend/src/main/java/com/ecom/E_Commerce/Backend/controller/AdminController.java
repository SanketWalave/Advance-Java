package com.ecom.E_Commerce.Backend.controller;

import com.ecom.E_Commerce.Backend.model.dto.UserDto;
import com.ecom.E_Commerce.Backend.service.UserServices;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@Tag(name = "all operation of Admin" , description = "admin operatin")
public class AdminController {

    @Autowired
    private UserServices userServices;

    @Operation(summary = "adding user ")
    @PostMapping("/saveAdmin")
    public ResponseEntity<UserDto> saveAdmin(@RequestPart UserDto userDto, @RequestPart MultipartFile multipartFile) {
        UserDto save = null;
        save = userServices.saveAdmin(userDto, multipartFile);
        if (save != null) return new ResponseEntity<>(save, HttpStatus.OK);
        else return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

//        {
//            "userName":"sanket",
//            "userPassword":"1234",
//            "userEmail":"sanket@gmail.com"
//        }

    }
}
