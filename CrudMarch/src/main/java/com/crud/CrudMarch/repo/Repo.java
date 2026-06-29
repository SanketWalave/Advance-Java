package com.crud.CrudMarch.repo;

import com.crud.CrudMarch.model.Dto.UserDto;
import com.crud.CrudMarch.model.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public class Repo{

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public User saveUser(User user) {
        String sql = "INSERT INTO users ( name, email) VALUES ( ?, ?)";


      boolean flag=   jdbcTemplate.update(sql,  user.getName(), user.getEmail())>0;
      return  flag?user:new User();
    }

//    public

    public boolean deleteUser(int id) {
        String sql="delete from users where id=?";
        return jdbcTemplate.update(sql,id)>0;
    }

    public boolean updateUser(int id, User user) {
        String sql = "update users set name=?, email=? where id=?";
        return jdbcTemplate.update(sql, user.getName(), user.getEmail(), id) > 0;
    }
    public List<User> findAll() {
        String sql = "SELECT id, name, email FROM users";

        return jdbcTemplate.query(sql, (rs, rowNum) -> new User(
                rs.getInt("id"),
                rs.getString("name"),
                rs.getString("email")
        ));
    }

    public void insertUser(String name, String email) {
        String sql = "INSERT INTO users (name, email) VALUES (?, ?)";
        jdbcTemplate.update(sql, name, email);
    }

//    public boolean updateUser(int id, UserDto userDto) {
//        String sql="update users set name=?,email=? where id=";
//        return jdbcTemplate.update(userDto.neme(),userDto.email(),id)>0;
//
//    }

}
