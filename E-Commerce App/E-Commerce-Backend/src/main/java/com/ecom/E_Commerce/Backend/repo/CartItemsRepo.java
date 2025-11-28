package com.ecom.E_Commerce.Backend.repo;

import com.ecom.E_Commerce.Backend.model.CartItems;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface CartItemsRepo extends JpaRepository<CartItems,Integer> {


    List<CartItems> findByCart_CartId(int cartId);

    Optional<CartItems> findByCart_CartIdAndProduct_ProductId(int cartId, int productId);
}
