package com.ecom.E_Commerce.Backend.model.dto;

import java.util.Date;

public record ProductDto(
        int productId,
        String name,
        String description,
        String brand,
        int quantity,
        double price,
        double discount,
        Date productAddDate,
        boolean isAvalable,
        String imagePath,
        int catagoryId
) {}


