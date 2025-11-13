package com.ecom.E_Commerce.Backend.model.dto;

import com.ecom.E_Commerce.Backend.model.Product;

import java.util.List;

public record CatagoryDto(
        int id,
        String name,
        String imagePath,
        List<Product> productList
) {
}
