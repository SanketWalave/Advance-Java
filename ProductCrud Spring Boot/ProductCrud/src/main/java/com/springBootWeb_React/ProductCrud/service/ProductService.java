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

    public void deleteById(int id) {
         productRepoClass.deleteById(id);
    }
    public Product getById(int id) {
        return productRepoClass.getById(id);
    }

    public void saveProduct(Product product) {
        productRepoClass.saveProduct(product);
    }

    public void updateProduct( Product product) {
        System.out.println("in services of update ");
        productRepoClass.updateProduct(product);
    }
}
