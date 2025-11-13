package com.ecom.E_Commerce.Backend.service;

import com.ecom.E_Commerce.Backend.model.Catagory;
import com.ecom.E_Commerce.Backend.model.Product;
import com.ecom.E_Commerce.Backend.model.dto.CatagoryDto;
import com.ecom.E_Commerce.Backend.model.dto.ProductDto;
import com.ecom.E_Commerce.Backend.repo.CatagoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CatagoryService {

    @Autowired
    private CatagoryRepo catagoryRepo;



    public CatagoryDto saveCatagory(CatagoryDto catagoryDto, MultipartFile multipartFile) throws IOException {
        try {
            String imagePath = catagoryDto.imagePath(); // default

            if (!multipartFile.isEmpty()) {
                String fileName = UUID.randomUUID() + "_" + multipartFile.getOriginalFilename();

                // 1️⃣ Save image to static/Catagoryimages (dev)
                Path sourcePath = Paths.get("src/main/resources/static/Catagoryimages/");
                Files.createDirectories(sourcePath);
                Path savedImagePath = sourcePath.resolve(fileName);
                multipartFile.transferTo(savedImagePath);

                // 2️⃣ Copy to target/classes/static/images (runtime)
                Path targetPath = Paths.get("target/classes/static/images/");
                Files.createDirectories(targetPath);
                Files.copy(savedImagePath, targetPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

                // 3️⃣ Set relative path
                imagePath = "/images/" + fileName;
            }

            // 🧩 Map DTO to entity
            Catagory catagory = new Catagory();
            catagory.setName(catagoryDto.name());
            catagory.setImagePath(imagePath);

            // 🧾 Save to DB
            Catagory savedCatagory = catagoryRepo.save(catagory);

            // ✅ Return new DTO
            return new CatagoryDto(savedCatagory.getId(), savedCatagory.getName(), savedCatagory.getImagePath(), savedCatagory.getProductList());
        } catch (IOException e) {
            throw new RuntimeException("Image saving failed: " + e.getMessage());
        }
    }


    public List<Catagory> getAllCatagory() {
        return catagoryRepo.findAll();
    }

    public boolean deleteCatagoryById(int id) {
        Optional<Catagory> catagory = catagoryRepo.findById(id);

        if (catagory.isPresent()) {
            Catagory catagory1 = catagory.get();
            List<Product> productList= catagory1.getProductList();
            for (Product product : productList) {
                if (product.getImagePath() != null) {
                    String imageName = product.getImagePath().replace("/images/", "");
                    Path path1 = Paths.get("src/main/resources/static/ProductImages/").resolve(imageName);
                    Path path2 = Paths.get("target/classes/static/images/").resolve(imageName);

                    try {
                        Files.deleteIfExists(path1);
                        Files.deleteIfExists(path2);
                    } catch (IOException e) {
                        System.err.println("❌ Failed to delete image: " + imageName + " - " + e.getMessage());
                    }
                }
            }
            // 🧹 Delete associated image file if exists
            if (catagory1.getImagePath() != null) {
                String fileName = catagory1.getImagePath().replace("/images/", "");
                try {
                    Path path1 = Paths.get("src/main/resources/static/Catagoryimages/").resolve(fileName);
                    Path path2 = Paths.get("target/classes/static/images/").resolve(fileName);
                    Files.deleteIfExists(path1);
                    Files.deleteIfExists(path2);
                } catch (IOException e) {
                    System.err.println("Failed to delete image file: " + e.getMessage());
                }
            }

            // 🗑️ Delete product from database
            catagoryRepo.delete(catagory1);
            return true;
        } else {
            return false; // Product not found
        }
    }

    public CatagoryDto updateCatagory(int id, CatagoryDto catagoryDto, MultipartFile multipartFile) {
        Optional<Catagory> optionalCatagory = catagoryRepo.findById(id);

        if (optionalCatagory.isEmpty()) {
            throw new RuntimeException("Category with ID " + id + " not found");
        }

        Catagory catagory = optionalCatagory.get();

        try {
            // 🧩 Update basic fields
            catagory.setName(catagoryDto.name());

            // 🖼️ If new image is uploaded
            if (multipartFile != null && !multipartFile.isEmpty()) {

                // 🧹 Delete old image if exists
                if (catagory.getImagePath() != null) {
                    String oldFileName = catagory.getImagePath().replace("/images/", "");
                    Path oldPath1 = Paths.get("src/main/resources/static/Catagoryimages/").resolve(oldFileName);
                    Path oldPath2 = Paths.get("target/classes/static/images/").resolve(oldFileName);
                    Files.deleteIfExists(oldPath1);
                    Files.deleteIfExists(oldPath2);
                }

                // 🆕 Save new image
                String fileName = UUID.randomUUID() + "_" + multipartFile.getOriginalFilename();

                Path sourcePath = Paths.get("src/main/resources/static/Catagoryimages/");
                Files.createDirectories(sourcePath);
                Path savedImagePath = sourcePath.resolve(fileName);
                multipartFile.transferTo(savedImagePath);

                Path targetPath = Paths.get("target/classes/static/images/");
                Files.createDirectories(targetPath);
                Files.copy(savedImagePath, targetPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

                catagory.setImagePath("/images/" + fileName);
            }

            // 💾 Save updated entity
            Catagory updatedCatagory = catagoryRepo.save(catagory);

            // 🎯 Return updated DTO
            return new CatagoryDto(
                    updatedCatagory.getId(),
                    updatedCatagory.getName(),
                    updatedCatagory.getImagePath(),
                    updatedCatagory.getProductList()
            );

        } catch (IOException e) {
            throw new RuntimeException("Image update failed: " + e.getMessage());
        }
    }

    public List<ProductDto> getProductsByCatagoryId(int id) {
        Optional<Catagory> catagory=catagoryRepo.findById(id);
        List<ProductDto> productDtoList=new ArrayList<>();
        for(Product product:catagory.get().getProductList()){
            productDtoList.add(new ProductDto(
                    product.getProductId(),
                    product.getName(),
                    product.getDescription(),
                    product.getBrand(),
                    product.getQuantity(),
                    product.getPrice(),
                    product.getDiscount(),
                    product.getProductAddDate(),
                    product.isAvalable(),
                    product.getImagePath(),
                    product.getCatagory().getId()
            ));
        }
        return productDtoList;

    }
}
