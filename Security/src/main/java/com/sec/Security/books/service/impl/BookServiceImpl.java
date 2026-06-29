package com.sec.Security.books.service.impl;

import com.sec.Security.books.dto.request.BookRequestDto;
import com.sec.Security.books.dto.response.BookResponseDto;
import com.sec.Security.books.entity.Book;
import com.sec.Security.books.mapper.BookMapper;
import com.sec.Security.books.repository.BookRepository;
import com.sec.Security.books.service.BookService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class BookServiceImpl implements BookService {

    private final BookRepository repository;

    public BookServiceImpl(BookRepository repository) {
        this.repository = repository;
    }

    @Override
    public BookResponseDto addBook(BookRequestDto dto) {

        Book book = BookMapper.toEntity(dto);

        return BookMapper.toResponse(repository.save(book));
    }

    @Override
    public List<BookResponseDto> getAllBooks() {

        return repository.findAll()
                .stream()
                .map(BookMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public BookResponseDto getBookById(Long id) {

        Book book = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book Not Found"));

        return BookMapper.toResponse(book);
    }

    @Override
    public BookResponseDto updateBook(Long id, BookRequestDto dto) {

        Book book = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("Book Not Found"));

        book.setName(dto.getName());
        book.setAuthor(dto.getAuthor());
        book.setPrice(dto.getPrice());

        return BookMapper.toResponse(repository.save(book));
    }

    @Override
    public void deleteBook(Long id) {

        repository.deleteById(id);
    }
}