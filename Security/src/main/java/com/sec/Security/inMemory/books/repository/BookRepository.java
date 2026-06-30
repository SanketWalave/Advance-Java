package com.sec.Security.inMemory.books.repository;

import com.sec.Security.inMemory.books.entity.Book;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BookRepository extends JpaRepository<Book, Long> {

}