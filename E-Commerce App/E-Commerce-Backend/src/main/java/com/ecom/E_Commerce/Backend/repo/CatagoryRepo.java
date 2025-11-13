package com.ecom.E_Commerce.Backend.repo;

import com.ecom.E_Commerce.Backend.model.Catagory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CatagoryRepo extends JpaRepository<Catagory,Integer> {

}
