package com.ecom.E_Commerce.Backend.controller;

import com.ecom.E_Commerce.Backend.model.Catagory;
import com.ecom.E_Commerce.Backend.model.dto.CatagoryDto;
import com.ecom.E_Commerce.Backend.model.dto.ProductDto;
import com.ecom.E_Commerce.Backend.service.CatagoryService;
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
@CrossOrigin
@Tag( name = "catagory",description = "all catagory Controer")
public class CatagoryControler {

    @Autowired
    private CatagoryService catagoryService;

    @Operation(summary = "save new catagory with image")
    @PostMapping("/saveCatagory")
    public ResponseEntity<String> saveCatagory(@RequestPart CatagoryDto catagoryDto, @RequestPart MultipartFile multipartFile)
    {
//        System.out.println("\n\nin save catagory \n\n");
        CatagoryDto save= null;
        try {
            save = catagoryService.saveCatagory(catagoryDto,multipartFile);
            return new ResponseEntity<>("save sucsess", HttpStatus.OK);
        } catch (IOException e) {
//            throw new RuntimeException(e);
            return new ResponseEntity<>(e.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @Operation(summary = "get all catagory")
    @GetMapping("/getAllCatagory")
    public ResponseEntity<List<Catagory>> getAllCatagory(){
        return new ResponseEntity<>(catagoryService.getAllCatagory(),HttpStatus.OK);
    }

    @Operation(summary = "delete catagory with id")
    @DeleteMapping("/deleteCatagoryById/{id}")
    public ResponseEntity<String> deleteCatagoryById(@PathVariable int id){
        if(catagoryService.deleteCatagoryById(id)){
            return new ResponseEntity<>("delete sucsess",HttpStatus.OK);
        }
        return new ResponseEntity<>("fail to delete ",HttpStatus.NOT_FOUND);
    }
    @Operation(summary = "update catagory with name ")
    @PutMapping("/updateCatagory/{id}")
    public ResponseEntity<CatagoryDto> updateCatagory(@PathVariable int id,@RequestPart CatagoryDto catagoryDto,@RequestPart MultipartFile multipartFile){
        CatagoryDto catagoryDto1=catagoryService.updateCatagory(id,catagoryDto,multipartFile);
        if(catagoryDto1!=null) return new ResponseEntity<>(catagoryDto1,HttpStatus.OK);
        else return new ResponseEntity<>(null,HttpStatus.INTERNAL_SERVER_ERROR);
    }

    @Operation(summary = "finding all products with related catagory id")
    @GetMapping("/getProductsByCatagoryId/{id}")
    public ResponseEntity<List<ProductDto>> getProductsByCatagoryId(@PathVariable int id){
        return new ResponseEntity<>(catagoryService.getProductsByCatagoryId(id), HttpStatus.OK);

    }

}
