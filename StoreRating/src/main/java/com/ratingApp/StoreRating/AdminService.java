package com.ratingApp.StoreRating;

import com.ratingApp.StoreRating.model.User;
import com.ratingApp.StoreRating.model.dto.UseDto;
import com.ratingApp.StoreRating.repository.UserRepository;
import jakarta.annotation.Nullable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.UUID;

@Service
public class AdminService {

    @Autowired
    private UserRepository userRepository;


    // ⬇ SAVE ADMIN
    public UseDto saveAdmin(UseDto useDto, MultipartFile multipartFile) {

        try {
            String imagePath = useDto.imagePath();

            if (!multipartFile.isEmpty()) {

                String fileName = UUID.randomUUID() + "_" + multipartFile.getOriginalFilename();

                // Correct folder name = AdminImages
                Path devPath = Paths.get("src/main/resources/static/AdminImages/");
                Files.createDirectories(devPath);

                Path savedPath = devPath.resolve(fileName);
                multipartFile.transferTo(savedPath);

                // Copy to runtime folder
                Path runPath = Paths.get("target/classes/static/images/");
                Files.createDirectories(runPath);
                Files.copy(savedPath, runPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

                imagePath = "/images/" + fileName;
            }

            User user = new User();
            user.setName(useDto.name());
            user.setEmail(useDto.email());
            user.setPassword(useDto.password());
            user.setImagePath(imagePath);
            user.setUserType("Admin");

            User saved = userRepository.save(user);

            return new UseDto(
                    saved.getId(),
                    saved.getName(),
                    saved.getEmail(),
                    saved.getImagePath(),
                    saved.getPassword(),
                    saved.getUserType()
            );

        } catch (IOException e) {
            throw new RuntimeException("Image saving failed: " + e.getMessage());
        }
    }



    // ⬇ GET ALL ADMINS
    public @Nullable List<UseDto> getAllAdmins() {

        List<User> admins = userRepository.findAllByUserType("Admin");
        if (admins.isEmpty()) return null;

        return admins.stream().map(u -> new UseDto(
                u.getId(),
                u.getName(),
                u.getEmail(),
                u.getImagePath(),
                u.getPassword(),
                u.getUserType()
        )).toList();
    }



    // ⬇ UPDATE ADMIN + DELETE OLD IMAGE
    public UseDto updateAdminProfile(int id, UseDto useDto, MultipartFile multipartFile) {

        User existingUser = userRepository.findById(id).orElse(null);
        if (existingUser == null) return null;

        try {
            String oldImage = existingUser.getImagePath();  // /images/xx.png
            String newImage = oldImage;


            // If new image is uploaded
            if (!multipartFile.isEmpty()) {

                // ⬅ FIRST DELETE OLD IMAGE
                if (oldImage != null && oldImage.startsWith("/images/")) {

                    String oldFileName = oldImage.replace("/images/", "");

                    Path devDelete = Paths.get("src/main/resources/static/AdminImages/" + oldFileName);
                    Path runDelete = Paths.get("target/classes/static/images/" + oldFileName);

                    Files.deleteIfExists(devDelete);
                    Files.deleteIfExists(runDelete);
                }


                // ⬅ NOW SAVE NEW IMAGE
                String fileName = UUID.randomUUID() + "_" + multipartFile.getOriginalFilename();

                Path devPath = Paths.get("src/main/resources/static/AdminImages/");
                Files.createDirectories(devPath);

                Path savedPath = devPath.resolve(fileName);
                multipartFile.transferTo(savedPath);

                Path runPath = Paths.get("target/classes/static/images/");
                Files.createDirectories(runPath);
                Files.copy(savedPath, runPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

                newImage = "/images/" + fileName;
            }


            // Update user data
            existingUser.setName(useDto.name());
            existingUser.setEmail(useDto.email());
            existingUser.setPassword(useDto.password());
            existingUser.setImagePath(newImage);

            User updated = userRepository.save(existingUser);

            return new UseDto(
                    updated.getId(),
                    updated.getName(),
                    updated.getEmail(),
                    updated.getImagePath(),
                    updated.getPassword(),
                    updated.getUserType()
            );

        } catch (IOException e) {
            throw new RuntimeException("Image update failed: " + e.getMessage());
        }
    }

}
