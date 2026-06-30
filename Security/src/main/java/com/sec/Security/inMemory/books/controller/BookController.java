package com.sec.Security.inMemory.books.controller;

import com.sec.Security.inMemory.books.dto.request.BookRequestDto;
import com.sec.Security.inMemory.books.dto.response.BookResponseDto;
import com.sec.Security.inMemory.books.service.BookService;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/books")
public class BookController {

    private final BookService service;

    public BookController(BookService service) {
        this.service = service;
    }

    @PostMapping
    public BookResponseDto addBook(@RequestBody BookRequestDto dto){

        return service.addBook(dto);
    }

    @GetMapping("/getAll")
    public List<BookResponseDto> getAllBooks(){

        return service.getAllBooks();
    }

    @GetMapping("/{id}")
    public BookResponseDto getBook(@PathVariable Long id){

        return service.getBookById(id);
    }

    @PutMapping("/{id}")
    public BookResponseDto updateBook(@PathVariable Long id,
                                      @RequestBody BookRequestDto dto){

        return service.updateBook(id,dto);
    }

    @DeleteMapping("/{id}")
    public String deleteBook(@PathVariable Long id){

        service.deleteBook(id);

        return "Book Deleted Successfully";
    }
}