package com.sec.Security.books.dto.response;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class BookResponseDto {

    private Long id;
    private String name;
    private String author;
    private Double price;

}