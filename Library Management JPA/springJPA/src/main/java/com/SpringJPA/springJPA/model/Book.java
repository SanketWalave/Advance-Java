package com.SpringJPA.springJPA.model;

import com.fasterxml.jackson.annotation.JsonBackReference;
import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.Cascade;
import org.hibernate.annotations.CascadeType;
import org.springframework.stereotype.Component;

@Component
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
@Entity
public class Book {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int id;
    private String name;
    private String author;
    private double price;
    private String imagePath;


    /*
    {
        "name":"don",
        "author":"don",
        "price":123
    } */

    @ManyToOne
    @JoinColumn(name = "library_id")
//    @JsonBackReference
    private Library library;


}
