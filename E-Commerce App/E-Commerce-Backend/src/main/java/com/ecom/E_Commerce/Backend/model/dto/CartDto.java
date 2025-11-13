package com.ecom.E_Commerce.Backend.model.dto;

import java.util.Date;

public record CartDto(
        int cartId,
        int userId,
        int productId,
        int quantity,
        Date cartInteractionDate
) {
}
