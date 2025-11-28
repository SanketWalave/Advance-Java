package com.ecom.E_Commerce.Backend.service;

import com.ecom.E_Commerce.Backend.model.Cart;
import com.ecom.E_Commerce.Backend.model.CartItems;
import com.ecom.E_Commerce.Backend.model.Product;
import com.ecom.E_Commerce.Backend.model.User;
import com.ecom.E_Commerce.Backend.model.dto.CartDto;
import com.ecom.E_Commerce.Backend.model.dto.ProductDto;
import com.ecom.E_Commerce.Backend.model.dto.UserDto;
import com.ecom.E_Commerce.Backend.repo.CartItemsRepo;
import com.ecom.E_Commerce.Backend.repo.CartRepo;
import com.ecom.E_Commerce.Backend.repo.ProductRepo;
import com.ecom.E_Commerce.Backend.repo.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.time.LocalDate;
import java.util.*;


@Service
public class UserServices {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private CartItemsRepo cartItemsRepo;


    public UserDto saveUser(UserDto userDto, MultipartFile multipartFile) {
        try {
            String imagePath = userDto.imagePath();

            if (!multipartFile.isEmpty()) {
                String fileName = UUID.randomUUID() + "_" + multipartFile.getOriginalFilename();

                Path sourcePath = Paths.get("src/main/resources/static/UserImages/");
                Files.createDirectories(sourcePath);
                Path savedImagePath = sourcePath.resolve(fileName);
                multipartFile.transferTo(savedImagePath);

                Path targetPath = Paths.get("target/classes/static/images/");
                Files.createDirectories(targetPath);
                Files.copy(savedImagePath, targetPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

                imagePath = "/images/" + fileName;
            }

            // 🧩 Create and save user first
            User user = new User();
            user.setName(userDto.userName());
            user.setEmail(userDto.userEmail());
            user.setPassword(userDto.userPassword());
            user.setUserType("User");
            user.setImagePath(imagePath);

            User savedUser = userRepo.save(user); // ✅ Save user first

            // 🛒 Now create and save cart linked to the persisted user
            Cart cart = new Cart();
            cart.setUser(savedUser);
            cartRepo.save(cart);

            // 🔁 Link back the cart to user (optional if mapped both sides)
            userRepo.save(savedUser);

            return new UserDto(
                    savedUser.getId(),
                    savedUser.getName(),
                    savedUser.getImagePath(),
                    savedUser.getEmail(),
                    savedUser.getPassword(),
                    savedUser.getUserType()
            );
        } catch (IOException e) {
            throw new RuntimeException("Image saving failed: " + e.getMessage());
        }
    }


    public UserDto loginUser(UserDto userDto) {
        List<User> users = userRepo.findAllByEmail(userDto.userEmail());
        if (users.isEmpty()) return null;

        for (User user : users) {
            if (user.getPassword().equals(userDto.userPassword())) {
                return new UserDto(
                        user.getId(),
                        user.getName(),
                        null, // don’t return password
                        user.getEmail(),
                        user.getImagePath(),
                        user.getUserType()
                );
            }
        }

        return null; // no user matched the password
    }


    public List<UserDto> getAllUsers() {
        List<User> userList = userRepo.findAll();

        List<UserDto> userDtoList = new ArrayList<>();

        for (User user : userList) {
            userDtoList.add(new UserDto(
                    user.getId(),
                    user.getName(),
                    user.getPassword(),
                    user.getImagePath(),
                    user.getUserType(),
                    user.getEmail()
            ));
        }

        return userDtoList;
    }

    public String addToCart(CartDto cartDto, int userId) {
        // ✅ Fetch user's cart
        Optional<Cart> cartOpt = cartRepo.findByUserId(userId);
        if (cartOpt.isEmpty()) {
            return "❌ Cart not found for this user!";
        }

        Cart cart = cartOpt.get();

        // ✅ Fetch product
        Optional<Product> productOpt = productRepo.findById(cartDto.productId());
        if (productOpt.isEmpty()) {
            return "❌ Product not found!";
        }

        Product product = productOpt.get();

        // ✅ Create new Cart Item
        CartItems cartItem = new CartItems();
        cartItem.setCart(cart);
        cartItem.setProduct(product);
        cartItem.setQuantity(cartDto.quantity() == 0 ? 1 : cartDto.quantity()); // default 1
        cartItem.setAddedToCartDate(LocalDate.now());

        // ✅ Save to CartItemsRepo
        cartItemsRepo.save(cartItem);

        return "✅ Product added to cart successfully!";
    }




    public UserDto saveAdmin(UserDto userDto, MultipartFile multipartFile) {
        try {
            String imagePath = userDto.imagePath();

            if (!multipartFile.isEmpty()) {
                String fileName = UUID.randomUUID() + "_" + multipartFile.getOriginalFilename();

                Path sourcePath = Paths.get("src/main/resources/static/UserImages/");
                Files.createDirectories(sourcePath);
                Path savedImagePath = sourcePath.resolve(fileName);
                multipartFile.transferTo(savedImagePath);

                Path targetPath = Paths.get("target/classes/static/images/");
                Files.createDirectories(targetPath);
                Files.copy(savedImagePath, targetPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

                imagePath = "/images/" + fileName;
            }

            // 🧩 Create and save user first
            User user = new User();
            user.setName(userDto.userName());
            user.setEmail(userDto.userEmail());
            user.setPassword(userDto.userPassword());
            user.setUserType("Admin");
            user.setImagePath(imagePath);

            User savedUser = userRepo.save(user); // ✅ Save user first



            // 🔁 Link back the cart to user (optional if mapped both sides)
            userRepo.save(savedUser);

            return new UserDto(
                    savedUser.getId(),
                    savedUser.getName(),
                    savedUser.getImagePath(),
                    savedUser.getEmail(),
                    savedUser.getPassword(),
                    savedUser.getUserType()
            );
        } catch (IOException e) {
            throw new RuntimeException("Image saving failed: " + e.getMessage());
        }
    }

    public List<ProductDto> getCartByUserId(int userId) {
        // ✅ Find user
        Optional<User> userOpt = userRepo.findById(userId);
        if (userOpt.isEmpty()) {
            System.out.println("❌ User not found for ID: " + userId);
            return Collections.emptyList();
        }

        // ✅ Find user's cart
        Optional<Cart> cartOpt = cartRepo.findByUserId(userId);
        if (cartOpt.isEmpty()) {
            System.out.println("🛒 No cart found for user ID: " + userId);
            return Collections.emptyList();
        }

        Cart cart = cartOpt.get();

        // ✅ Fetch cart items for this cart
        List<CartItems> cartItems = cartItemsRepo.findByCart_CartId(cart.getCartId());
        if (cartItems.isEmpty()) {
            System.out.println("ℹ️ No items found in cart ID: " + cart.getCartId());
            return Collections.emptyList();
        }

        // ✅ Convert products to ProductDto list
        List<ProductDto> productDtoList = new ArrayList<>();
        for (CartItems item : cartItems) {
            Product product = item.getProduct();
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
                    product.getCatagory() != null ? product.getCatagory().getId() : 0
            ));
        }

        return productDtoList;
    }

    public String removeFromCart(int userId, int productId) {
        // ✅ Find user's cart
        Optional<Cart> cartOpt = cartRepo.findByUserId(userId);
        if (cartOpt.isEmpty()) {
            return "❌ Cart not found for this user!";
        }

        Cart cart = cartOpt.get();

        // ✅ Find the cart item to remove
        Optional<CartItems> cartItemOpt = cartItemsRepo.findByCart_CartIdAndProduct_ProductId(cart.getCartId(), productId);
        if (cartItemOpt.isEmpty()) {
            return "❌ Product not found in cart!";
        }

        // ✅ Remove the cart item
        cartItemsRepo.delete(cartItemOpt.get());

        return "✅ Product removed from cart successfully!";
    }
}
