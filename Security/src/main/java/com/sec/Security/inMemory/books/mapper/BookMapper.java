package com.sec.Security.inMemory.books.mapper;

import com.sec.Security.inMemory.books.dto.request.BookRequestDto;
import com.sec.Security.inMemory.books.dto.response.BookResponseDto;
import com.sec.Security.inMemory.books.entity.Book;

public class BookMapper {

    public static Book toEntity(BookRequestDto dto){

        return Book.builder()
                .name(dto.getName())
                .author(dto.getAuthor())
                .price(dto.getPrice())
                .build();
    }

    public static BookResponseDto toResponse(Book book){

        return BookResponseDto.builder()
                .id(book.getId())
                .name(book.getName())
                .author(book.getAuthor())
                .price(book.getPrice())
                .build();
    }

}