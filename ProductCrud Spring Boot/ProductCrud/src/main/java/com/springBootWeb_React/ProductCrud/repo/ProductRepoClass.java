package com.springBootWeb_React.ProductCrud.repo;

import com.springBootWeb_React.ProductCrud.model.Product;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class ProductRepoClass {
    @Autowired
    JdbcTemplate jdbcTemplate;
    public List<Product> getAllProducts() {

        String sql="select *from product";
        return jdbcTemplate.query(sql, new RowMapper<Product>() {
            @Override
            public Product mapRow(ResultSet rs, int rowNum) throws SQLException {
                Product p=new Product();
                p.setId(rs.getInt("id"));
                p.setName(rs.getString("name"));
                p.setPrice(rs.getInt("price"));
                return p;
            }
        });
    }

    public Product deleteById(int id) {
        String sql="select *from product where id=?";
        return jdbcTemplate.queryForObject(sql,new Object[]{id}, new RowMapper<Product>() {
            @Override
            public Product mapRow(ResultSet rs, int rowNum) throws SQLException {
                Product p=new Product();
                p.setId(rs.getInt("id"));
                p.setName(rs.getString("name"));
                p.setPrice(rs.getInt("price"));
                return p;
            }
        });
    }

    public void saveProduct(Product product) {
        String sql="insert into product values('0',?,?)";
        if(jdbcTemplate.update(sql,product.getName(),product.getPrice())>0)
            System.out.println("saved sucsess");
        else System.out.println("some problem");
    }
}
