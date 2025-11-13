package com.ecom.E_Commerce.Backend.repo;

import com.ecom.E_Commerce.Backend.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepo extends JpaRepository<Product,Integer> {

}
