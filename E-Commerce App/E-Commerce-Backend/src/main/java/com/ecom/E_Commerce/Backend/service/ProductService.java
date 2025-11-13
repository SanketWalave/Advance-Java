package com.ecom.E_Commerce.Backend.service;

import com.ecom.E_Commerce.Backend.model.Catagory;
import com.ecom.E_Commerce.Backend.model.Product;
import com.ecom.E_Commerce.Backend.model.dto.CatagoryDto;
import com.ecom.E_Commerce.Backend.model.dto.ProductDto;
import com.ecom.E_Commerce.Backend.repo.CatagoryRepo;
import com.ecom.E_Commerce.Backend.repo.ProductRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.Date;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class ProductService {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private CatagoryRepo catagoryRepo;


    public List<ProductDto> getAllProducts() {
        List<Product> products = productRepo.findAll();

        return products.stream()
                .map(product -> new ProductDto(
                        product.getProductId(),
                        product.getName(),
                        product.getDescription(),
                        product.getBrand(),
                        product.getQuantity(),
                        product.getPrice(),
                        product.getDiscount(),
                        product.getProductAddDate(), // ✅ added this line
                        product.isAvalable(),
                        product.getImagePath(),
                        product.getCatagory() != null ? product.getCatagory().getId() : 0
                ))
                .toList();
    }

    public ProductDto getProductById(int id) {
        Optional<Product> optionalProduct = productRepo.findById(id);

        if (optionalProduct.isPresent()) {
            Product product = optionalProduct.get();
            return new ProductDto(
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
                    product.getCatagory() != null ? product.getCatagory().getId() : 0
            );
        } else {
            return null; // or throw new RuntimeException("Product not found");
        }
    }

    public ProductDto addProduct(ProductDto productDto, MultipartFile multipartFile) throws IOException {
        try {
            String imagePath = productDto.imagePath(); // default

            if (!multipartFile.isEmpty()) {
                String fileName = UUID.randomUUID() + "_" + multipartFile.getOriginalFilename();

                // 1️⃣ Save image to static/ProductImage (for development)
                Path sourcePath = Paths.get("src/main/resources/static/ProductImages/");
                Files.createDirectories(sourcePath);
                Path savedImagePath = sourcePath.resolve(fileName);
                multipartFile.transferTo(savedImagePath);

                // 2️⃣ Copy to target/classes/static/images (for runtime)
                Path targetPath = Paths.get("target/classes/static/images/");
                Files.createDirectories(targetPath);
                Files.copy(savedImagePath, targetPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

                // 3️⃣ Set relative path
                imagePath = "/images/" + fileName;
            }

            // 🧩 Map DTO → Entity
            Product product = new Product();
            product.setName(productDto.name());
            product.setBrand(productDto.brand());
            product.setDiscount(productDto.discount());
            product.setImagePath(imagePath);
            product.setAvalable(productDto.isAvalable());
            product.setPrice(productDto.price());
            product.setQuantity(productDto.quantity());
            product.setDescription(productDto.description());
            product.setProductAddDate(new Date()); // ✅ proper Date type

            // Set category
            Catagory catagory = catagoryRepo.findById(productDto.catagoryId()).orElse(null);
            if (catagory == null) {
                throw new RuntimeException("Category not found with id: " + productDto.catagoryId());
            }
            product.setCatagory(catagory);

            // 🧾 Save entity
            Product savedProduct = productRepo.save(product);

            // ✅ Return new DTO
            return new ProductDto(
                    savedProduct.getProductId(),
                    savedProduct.getName(),
                    savedProduct.getDescription(),
                    savedProduct.getBrand(),
                    savedProduct.getQuantity(),
                    savedProduct.getPrice(),
                    savedProduct.getDiscount(),
                    savedProduct.getProductAddDate(),
                    savedProduct.isAvalable(),
                    savedProduct.getImagePath(),
                    savedProduct.getCatagory().getId()
            );

        } catch (IOException e) {
            throw new RuntimeException("Image saving failed: " + e.getMessage());
        }
    }

    public ProductDto updateProduct(int id, ProductDto productDto, MultipartFile multipartFile) {
        try {
            // 1️⃣ Find existing product by ID
            Product existingProduct = productRepo.findById(id)
                    .orElseThrow(() -> new RuntimeException("Product not found with ID: " + id));

            // 2️⃣ Handle new image upload (if provided)
            if (multipartFile != null && !multipartFile.isEmpty()) {

                // --- Delete old image (if exists) ---
                if (existingProduct.getImagePath() != null) {
                    String oldImageName = existingProduct.getImagePath().replace("/images/", "");
                    Path oldImage1 = Paths.get("src/main/resources/static/ProductImages/").resolve(oldImageName);
                    Path oldImage2 = Paths.get("target/classes/static/images/").resolve(oldImageName);

                    Files.deleteIfExists(oldImage1);
                    Files.deleteIfExists(oldImage2);
                }

                // --- Save new image ---
                String fileName = UUID.randomUUID() + "_" + multipartFile.getOriginalFilename();

                Path devPath = Paths.get("src/main/resources/static/ProductImages/");
                Files.createDirectories(devPath);
                Path savedImage = devPath.resolve(fileName);
                multipartFile.transferTo(savedImage);

                Path targetPath = Paths.get("target/classes/static/images/");
                Files.createDirectories(targetPath);
                Files.copy(savedImage, targetPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

                existingProduct.setImagePath("/images/" + fileName);
            }

            // 3️⃣ Update product details
            if (productDto.name() != null) existingProduct.setName(productDto.name());
            if (productDto.description() != null) existingProduct.setDescription(productDto.description());
            if (productDto.brand() != null) existingProduct.setBrand(productDto.brand());
            if (productDto.price() > 0) existingProduct.setPrice(productDto.price());
            if (productDto.quantity() >= 0) existingProduct.setQuantity(productDto.quantity());
            existingProduct.setDiscount(productDto.discount());
            existingProduct.setAvalable(productDto.isAvalable());

            // 🧩 Update category (if changed)
            if (productDto.catagoryId() > 0) {
                Catagory catagory = catagoryRepo.findById(productDto.catagoryId())
                        .orElseThrow(() -> new RuntimeException("Category not found with id: " + productDto.catagoryId()));
                existingProduct.setCatagory(catagory);
            }

            // 4️⃣ Save updated product
            Product updatedProduct = productRepo.save(existingProduct);

            // 5️⃣ Return updated DTO
            return new ProductDto(
                    updatedProduct.getProductId(),
                    updatedProduct.getName(),
                    updatedProduct.getDescription(),
                    updatedProduct.getBrand(),
                    updatedProduct.getQuantity(),
                    updatedProduct.getPrice(),
                    updatedProduct.getDiscount(),
                    updatedProduct.getProductAddDate(),
                    updatedProduct.isAvalable(),
                    updatedProduct.getImagePath(),
                    updatedProduct.getCatagory().getId()
            );

        } catch (IOException e) {
            throw new RuntimeException("Failed to update product image: " + e.getMessage());
        }
    }

    public boolean deleteProductByID(int id) {
        Optional<Product> productOptional = productRepo.findById(id);

        if (productOptional.isPresent()) {
            Product product = productOptional.get();

            // 🧹 Delete associated image file if exists
            if (product.getImagePath() != null) {
                String fileName = product.getImagePath().replace("/images/", "");
                try {
                    Path path1 = Paths.get("src/main/resources/static/ProductImages/").resolve(fileName);
                    Path path2 = Paths.get("target/classes/static/images/").resolve(fileName);
                    Files.deleteIfExists(path1);
                    Files.deleteIfExists(path2);
                } catch (IOException e) {
                    System.err.println("Failed to delete image file: " + e.getMessage());
                }
            }

            // 🗑️ Delete product from database
            productRepo.delete(product);
            return true;
        } else {
            return false; // Product not found
        }
    }

//    public void addProduct(Product product, MultipartFile multipartFile) throws IOException {
//        product.setImageName(multipartFile.getOriginalFilename());
//        product.setImageType(multipartFile.getContentType());
//        product.setImageData(multipartFile.getBytes());
//        product.setProductAddDate(new Date()); // set date automatically
//        product.setAvalable(true); // default availability
//
//        System.out.println(product);
//        productRepo.save(product);
//    }



}
