package com.SpringJPA.springJPA.controllers;

import com.SpringJPA.springJPA.model.Book;
import com.SpringJPA.springJPA.model.Library;
import com.SpringJPA.springJPA.service.BookService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RestController
@CrossOrigin("http://localhost:5173/")
public class HomeConteroller {

    @Autowired
    BookService bookService;

    @PostMapping("/saveBook")
    public void saveBook(@RequestBody Book book){
        System.out.println(book);
        bookService.saveBook(book);
    }

    @GetMapping("/getBooks")
    @ResponseBody
    public List<Book> getData() {
//        List<Book> books = new ArrayList<>();
//        books.add(new Book(1, "The Alchemist", "Paulo Coelho", 499.99));
//        books.add(new Book(2, "Atomic Habits", "James Clear", 699.50));
//        books.add(new Book(3, "Clean Code", "Robert C. Martin", 899.00));
//        books.add(new Book(4, "Rich Dad Poor Dad", "Robert Kiyosaki", 450.00));
//        books.add(new Book(5, "Think and Grow Rich", "Napoleon Hill", 399.99));
//        return books;
        for(Book b:bookService.getBooks()){
            System.out.println(b);
        }
        return bookService.getBooks();
    }

    @GetMapping("/findById/{id}")
    public Optional<Book> findById(@PathVariable int id){

        return bookService.findById(id);
    }

    @GetMapping("/findByName")
    @ResponseBody
    public List<Book> findByNmae(@RequestBody Book book){
        System.out.println(book.getName());
        System.out.println(bookService.findByName(book.getName()));
        return bookService.findByName(book.getName());
    }

    @GetMapping("findByName/{name}")
    public List<Book> findByNmaePath(@PathVariable String  name){
        System.out.println(name);
        System.out.println(bookService.findByName(name));
        return bookService.findByName(name);
    }

    @GetMapping("/findByAuthor")
    public List<Book> findByAuthor(@RequestBody Book book){
        return bookService.findByAuthor(book.getAuthor());
    }

    @PostMapping("saveBookLibrary")
    public void saveBookLibrary(@RequestBody Book book, Library library){
        bookService.saveBookLibrary(book,library);
    }



}
