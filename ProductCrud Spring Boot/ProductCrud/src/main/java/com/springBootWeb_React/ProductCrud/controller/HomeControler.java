package com.springBootWeb_React.ProductCrud.controller;

import com.springBootWeb_React.ProductCrud.model.Product;
import com.springBootWeb_React.ProductCrud.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173/")
public class HomeControler {
    @Autowired
    ProductService productService;

    @RequestMapping("/")
    @ResponseBody
    public List<Product> view(){

        return productService.getAllProducts();
    }

    @GetMapping("/findById/{id}")
    public ResponseEntity<Product> getById(@PathVariable int id) {
        Product product = productService.deleteById(id);
        if (product != null) {
            return ResponseEntity.ok(product);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
    @PostMapping("/saveProduct")
    public void saveProduct(@RequestBody Product product){
        System.out.println(product);
        productService.saveProduct(product);
    }


}
