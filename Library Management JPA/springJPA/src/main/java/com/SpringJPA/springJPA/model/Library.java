package com.SpringJPA.springJPA.model;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

@Entity
@Table(name = "library")
@Data
@NoArgsConstructor
@AllArgsConstructor
@ToString
public class Library {
    @Id
    private int lId;
    private String lname;
    private String address;
}
