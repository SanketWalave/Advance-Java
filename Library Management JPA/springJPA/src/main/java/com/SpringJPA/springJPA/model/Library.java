package com.SpringJPA.springJPA.model;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "library")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Library {
    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private int lId;
    private String name;
    private String address;

    @OneToMany( cascade = CascadeType.ALL)
//    @JsonManagedReference
    @ToString.Exclude
    private List<Book> bookList ;

//    {
//        "name":"l1",
//        "address":"pune"
//    }

}
