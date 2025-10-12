package com.springBootWeb_React.ProductCrud.model;

import lombok.*;
import org.springframework.stereotype.Component;

@Component
@NoArgsConstructor
@AllArgsConstructor
@Getter
@Setter
@ToString
public class Product {
    private int id;
    private String name;
    private int price;
}
