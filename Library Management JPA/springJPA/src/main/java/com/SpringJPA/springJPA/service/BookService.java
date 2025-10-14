package com.SpringJPA.springJPA.service;

import com.SpringJPA.springJPA.BookRepositryInter;
import com.SpringJPA.springJPA.model.Book;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class BookService {

    @Autowired
    BookRepositryInter bookRepositryInter;

    public void saveBook(Book book) {
        bookRepositryInter.save(book);
    }
    public List<Book> getBooks(){
        return bookRepositryInter.findAll();
    }
}
