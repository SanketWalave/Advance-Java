package com.ecom.E_Commerce.Backend.model;

import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;
import org.hibernate.annotations.Fetch;
import org.hibernate.annotations.FetchMode;

import java.time.LocalDate;
import java.util.Date;
import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int productId;
    private String name;
    private String description;
    private String brand;
    private int quantity;
    private double price;
    private double discount;
    @JsonFormat(shape = JsonFormat.Shape.STRING,pattern = "dd-MM-yyyy")
    private Date productAddDate;
    private boolean isAvalable;
    private String imagePath;


    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "catagory_id")
    @JsonIgnore
    private Catagory catagory;

    @OneToMany(mappedBy = "product",cascade = CascadeType.ALL)
    private List<CartItems> cartItemsList;

}
