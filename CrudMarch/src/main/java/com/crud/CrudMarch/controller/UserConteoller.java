package com.crud.CrudMarch.controller;

import com.crud.CrudMarch.model.Dto.UserDto;
import com.crud.CrudMarch.model.User;
import com.crud.CrudMarch.services.UserService;
import jakarta.servlet.annotation.MultipartConfig;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@CrossOrigin("*")
public class UserConteoller {

    @Autowired
    private UserService userService;

    @GetMapping("/")
    public  String home(){

        return "hii i am starting";
    }

    @PostMapping("/addUser")
    public ResponseEntity<UserDto> addUser(@RequestBody UserDto userDto) {
        System.out.println("\n\ni am in save user ");
        UserDto savedUser = userService.saveUser(userDto);
        return new ResponseEntity<>(savedUser, HttpStatus.CREATED);
    }

    @DeleteMapping("/deleteUser/{id}")
    public String deleteUser(@PathVariable int id){
        boolean isDelete=userService.deleteUser(id);
        return isDelete?"deleted successfully ":"some problem is there";
    }

    @PutMapping("/updateUsers/{id}")
    public String updateUser(@PathVariable int id, @RequestBody UserDto userDto){
        System.out.println("\n\n"+id);
        System.out.println(userDto);
        boolean isUpdate = userService.isUpdate(id, userDto);
        return isUpdate ? "updated successfully" : "some problem is there";
    }

    @GetMapping("/getAllUsers")
    public List<User> getAllUsers() {
//        System.out.println("\n\ni am inside get all users ");
        return userService.getAllUsers();
    }

    @PostMapping("/getCsv")
    public String addByCsv(@RequestBody MultipartFile multipartFile){
        boolean isUpdate = userService.addByCsv(multipartFile);
        return isUpdate ? "updated successfully" : "some problem is there";
    }


}
