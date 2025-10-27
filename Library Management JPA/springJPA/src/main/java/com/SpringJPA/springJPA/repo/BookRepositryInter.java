package com.SpringJPA.springJPA.repo;

import com.SpringJPA.springJPA.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BookRepositryInter extends JpaRepository<Book,Integer> {

    @Query("SELECT b FROM Book b WHERE b.name = ?1")
    List<Book> findByName(String name);

    List<Book> findByAuthor(String author);
}
