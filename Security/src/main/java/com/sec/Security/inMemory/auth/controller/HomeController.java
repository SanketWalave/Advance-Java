package com.sec.Security.inMemory.auth.controller;

import com.sec.Security.inMemory.auth.dto.request.CreateUserRequest;
import com.sec.Security.inMemory.auth.dto.request.UpdateUserRequest;
import com.sec.Security.inMemory.auth.dto.response.UserResponse;
import com.sec.Security.inMemory.auth.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/home")
public class HomeController {

    @Autowired
     final UserService service;


    @GetMapping("/")
    public String home() {
        return "Welcome Home";
    }

    @GetMapping("/user")
    public String user() {
        return "Welcome User";
    }

    @GetMapping("/admin")
    public String admin() {
        return "Welcome Admin";
    }






    public HomeController(UserService service) {
        this.service = service;
    }

    @PostMapping("/addUser")
    public UserResponse create(@RequestBody CreateUserRequest request){

        return service.create(request);
    }

    @GetMapping("/getAll")
    public List<UserResponse> getAll(){

        return service.getAll();
    }

    @GetMapping("/{id}")
    public UserResponse getById(@PathVariable Long id){

        return service.getById(id);
    }

    @PutMapping("/{id}")
    public UserResponse update(@PathVariable Long id,
                               @RequestBody UpdateUserRequest request){

        return service.update(id,request);
    }

    @DeleteMapping("/{id}")
    public String delete(@PathVariable Long id){

        service.delete(id);

        return "User Deleted Successfully";
    }

}