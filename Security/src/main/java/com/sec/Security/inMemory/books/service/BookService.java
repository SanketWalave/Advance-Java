package com.sec.Security.inMemory.books.service;

import com.sec.Security.inMemory.books.dto.request.BookRequestDto;
import com.sec.Security.inMemory.books.dto.response.BookResponseDto;

import java.util.List;

public interface BookService {

    BookResponseDto addBook(BookRequestDto dto);

    List<BookResponseDto> getAllBooks();

    BookResponseDto getBookById(Long id);

    BookResponseDto updateBook(Long id, BookRequestDto dto);

    void deleteBook(Long id);

}