package com.SpringJPA.springJPA.service;

import com.SpringJPA.springJPA.model.Book;
import com.SpringJPA.springJPA.model.Library;
import com.SpringJPA.springJPA.repo.BookRepositryInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

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

    public  Optional<Book> findById(int id) {

        return bookRepositryInter.findById(id);
    }

    public List<Book> findByName(String name) {

        return bookRepositryInter.findByName(name);
    }

    public List<Book> findByAuthor(String author) {
        return bookRepositryInter.findByAuthor(author);
    }

    public void saveBookLibrary(Book book, Library library) {
        bookRepositryInter.save(book);
//        bookRepositryInter.save(library);
    }
}
