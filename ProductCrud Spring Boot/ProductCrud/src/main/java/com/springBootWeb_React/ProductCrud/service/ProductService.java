package com.springBootWeb_React.ProductCrud.service;

import com.springBootWeb_React.ProductCrud.model.Product;
import com.springBootWeb_React.ProductCrud.repo.ProductRepoClass;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ProductService {

    @Autowired
    ProductRepoClass productRepoClass;
    public List<Product> getAllProducts() {
        return productRepoClass.getAllProducts();
    }

    public Product deleteById(int id) {
        return productRepoClass.deleteById(id);
    }

    public void saveProduct(Product product) {
        productRepoClass.saveProduct(product);
    }
}
