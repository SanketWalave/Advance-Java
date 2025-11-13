package com.ecom.E_Commerce.Backend.controller;

import com.ecom.E_Commerce.Backend.model.Product;
import com.ecom.E_Commerce.Backend.model.dto.ProductDto;
import com.ecom.E_Commerce.Backend.service.ProductService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.HttpStatusCode;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.sql.Time;
import java.time.LocalTime;
import java.util.List;

@RestController
@CrossOrigin("http://localhost:5173/")
@Tag(name = "Product API", description = "Operations related to product management")
public class ProductControler {

    @Autowired
    private ProductService productService;



    @Operation(summary = "Add a new product", description = "Uploads product details with image")
    @PostMapping("/addProduct")
    public ResponseEntity addProduct(@RequestPart ProductDto productDto, @RequestPart MultipartFile multipartFile){
//        System.out.println("\n\n\nin addProduct");
        try {
            productService.addProduct(productDto,multipartFile);
            return new ResponseEntity<>("product saved sucsess", HttpStatus.CREATED);
        } catch (IOException e) {
            return new ResponseEntity(e.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);

//               throw new RuntimeException(e);
        }
    }

    //    @PostMapping("/addProduct")
//    public ResponseEntity<?> addProduct(
//            @RequestPart("product") Product product,
//            @RequestPart("image") MultipartFile imageFile) {
//
//        try {
//            productService.addProduct(product, imageFile);
//            return new ResponseEntity<>("Product saved successfully!", HttpStatus.CREATED);
//        } catch (IOException e) {
//            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
//        }
//    }

    @GetMapping("/getAllProducts")
    public ResponseEntity<List<ProductDto>> getAllProduct() {
        productService.getAllProducts().forEach(System.out::println);
        return new ResponseEntity<>(productService.getAllProducts(), HttpStatus.OK);
    }

    @GetMapping("/getProductById/{id}")
    public ResponseEntity<ProductDto> getProductById(@PathVariable int id) {
        if (productService.getProductById(id) != null)
            return new ResponseEntity<>(productService.getProductById(id), HttpStatus.FOUND);
        else
            return new ResponseEntity<>( HttpStatus.NOT_FOUND);
    }

    @PutMapping("/updateProduct/{id}")
    public ResponseEntity<ProductDto> updateProduct(@RequestPart ProductDto productDto,@RequestPart MultipartFile multipartFile,@PathVariable int id){
        ProductDto productDto1=null;
        productDto1= productService.updateProduct(id,productDto,multipartFile);
        if(productDto1!=null) return new ResponseEntity<>(productDto1,HttpStatus.CREATED);
        else return new ResponseEntity<>(HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @DeleteMapping("/deleteProductByID/{id}")
    public ResponseEntity<String> deleteProductByID(@PathVariable int id){
        if(productService.deleteProductByID(id)){
            return new ResponseEntity<>("delete sucsess",HttpStatus.OK);
        }
        return new ResponseEntity<>("fail to delete ",HttpStatus.NOT_FOUND);
    }




}
