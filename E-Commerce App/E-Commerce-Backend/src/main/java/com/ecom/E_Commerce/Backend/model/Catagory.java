package com.ecom.E_Commerce.Backend.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Catagory {
    @Id
    @Column(name ="catagory_id")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int id;
    private String name;
    private String imagePath;

    @OneToMany(mappedBy = "catagory",cascade = CascadeType.ALL)
    @ToString.Exclude
    @JsonIgnore
    private List<Product> productList;
}
