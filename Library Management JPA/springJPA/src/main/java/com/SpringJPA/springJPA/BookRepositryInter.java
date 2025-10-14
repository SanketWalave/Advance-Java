package com.SpringJPA.springJPA;

import com.SpringJPA.springJPA.model.Book;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BookRepositryInter extends JpaRepository<Book,Integer> {


}
