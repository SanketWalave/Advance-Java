package com.SpringJPA.springJPA.model.dto;

import com.SpringJPA.springJPA.model.Book;

import java.util.List;

public record LibraryDto(int lId,
                         String name,
                         String address,
                         List<Book> bookList) {

}
