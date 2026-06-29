package com.crud.CrudMarch.services;

import com.crud.CrudMarch.model.Dto.UserDto;
import com.crud.CrudMarch.model.User;
import com.crud.CrudMarch.repo.Repo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.util.List;

@Service
public class UserService {

    @Autowired
    private Repo repo;

    public UserDto saveUser(UserDto userDto) {
        User user=new User();
        user.setName(userDto.neme());
        user.setEmail(userDto.email());
       User savedUSer= repo.saveUser(user);

        return  new UserDto(savedUSer.getName(),savedUSer.getEmail());
    }

    public boolean deleteUser(int id) {
        return repo.deleteUser(id);
    }

    public boolean isUpdate(int id, UserDto userDto) {
        User user=new User();
        user.setName(userDto.neme());
        user.setEmail(userDto.email());
        return repo.updateUser(id,user);
    }
    public List<User> getAllUsers() {
        return repo.findAll();
    }






        public boolean addByCsv(MultipartFile multipartFile) {
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(multipartFile.getInputStream()))) {

                String line;
                boolean isFirstLine = true;

                while ((line = reader.readLine()) != null) {
                    // Skip header (optional)
                    if (isFirstLine) {
                        isFirstLine = false;
                        continue;
                    }

                    String[] data = line.split(",");

                    if (data.length >= 2) {
                        String name = data[0].trim();
                        String email = data[1].trim();

                        repo.insertUser(name, email);
                    }
                }

                return true;

            } catch (Exception e) {
                e.printStackTrace();
                return false;
            }
        }
}
