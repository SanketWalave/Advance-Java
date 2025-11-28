package com.ecom.E_Commerce.Backend.controller;

import com.ecom.E_Commerce.Backend.model.dto.CartDto;
import com.ecom.E_Commerce.Backend.model.dto.CatagoryDto;
import com.ecom.E_Commerce.Backend.model.dto.ProductDto;
import com.ecom.E_Commerce.Backend.model.dto.UserDto;
import com.ecom.E_Commerce.Backend.service.UserServices;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;

@RestController
@Tag(name = "User API", description = "Operations related to user management")
@CrossOrigin("http://localhost:5173/")
public class UserController {

    @Autowired
    private UserServices userServices;

    @Operation(summary = "adding user ")
    @PostMapping("/addUser")
    public ResponseEntity<UserDto> addUser(@RequestPart UserDto userDto, @RequestPart MultipartFile multipartFile) {
        UserDto save = null;
        save = userServices.saveUser(userDto, multipartFile);
        if (save != null) return new ResponseEntity<>(save, HttpStatus.OK);
        else return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);

//        {
//            "userEmail":"sanket@gmail.com",
//            "userPassword":"1234"
//
//        }

        //            "userName":"sanket",

    }

    @Operation(summary = "login user with username and password ")
    @PostMapping("/loginUser")
    public ResponseEntity<UserDto> userLogin(@RequestBody UserDto userDto) {
        System.out.println("/n/ndon");
        UserDto userDto1 = userServices.loginUser(userDto);
        if (userDto1 != null) return new ResponseEntity<>(userDto1, HttpStatus.OK);
        else return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Operation(summary = "get all users for info")
    @GetMapping("/getAllUsers")
    public ResponseEntity<List<UserDto>> getAllUsers() {
        return new ResponseEntity<>(userServices.getAllUsers(), HttpStatus.OK);
    }

    @PostMapping("/addToCart/{id}")
    public ResponseEntity<String> addToCart(@RequestBody CartDto cartDto, @PathVariable int id) {
        System.out.println("🛒 Received CartDto: " + cartDto);
        System.out.println("🧍 User ID PathVar: " + id);
        return new ResponseEntity<>(userServices.addToCart(cartDto, id), HttpStatus.OK);
    }

    @GetMapping("/getCartByUserId/{id}")
    public ResponseEntity<List<ProductDto>> getCartByUserId(@PathVariable int id) {
        return new ResponseEntity<>(userServices.getCartByUserId(id), HttpStatus.OK);

    }

    @DeleteMapping("/removeFromCart/{userId}/{productId}")
    public ResponseEntity<String> removeFromCart(@PathVariable int userId, @PathVariable int productId) {
        return new ResponseEntity<>(userServices.removeFromCart(userId, productId), HttpStatus.OK);
    }


}
