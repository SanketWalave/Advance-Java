package com.SpringJPA.springJPA.service;

import com.SpringJPA.springJPA.model.Book;
import com.SpringJPA.springJPA.model.Library;
import com.SpringJPA.springJPA.model.dto.LibraryDto;
import com.SpringJPA.springJPA.repo.BookRepositryInter;
import com.SpringJPA.springJPA.repo.LibraryRepositryInter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class BookService {

    @Autowired
    BookRepositryInter bookRepositryInter;

    @Autowired
    private LibraryRepositryInter libraryRepositryInter;

    public Book saveBook(Book book, MultipartFile file) {
        try {
            if (!file.isEmpty()) {
                String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

                // 1️⃣ Save image to src (for development)
                Path sourcePath = Paths.get("src/main/resources/static/images/");
                Files.createDirectories(sourcePath);
                Path imagePath = sourcePath.resolve(fileName);
                file.transferTo(imagePath);

                // 2️⃣ Also copy to target/classes/static (for runtime access)
                Path targetPath = Paths.get("target/classes/static/images/");
                Files.createDirectories(targetPath);
                Files.copy(imagePath, targetPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

                // 3️⃣ Store path in DB
                book.setImagePath("/images/" + fileName);
            }

            return bookRepositryInter.save(book);
        } catch (IOException e) {
            throw new RuntimeException("Image saving failed: " + e.getMessage());
        }
    }

    public List<Book> getBooks(){
        return bookRepositryInter.findAll();
    }

    public  Optional<Book> findById(int id) {

        return bookRepositryInter.findById(id);
    }

    public List<Book> findByName(String name) {

        return bookRepositryInter.findByName(name);
    }

    public List<Book> findByAuthor(String author) {
        return bookRepositryInter.findByAuthor(author);
    }

    public void saveBookLibrary(Book book, Library library, MultipartFile multipartFile) {
        try {
            if (!multipartFile.isEmpty()) {
                String fileName = UUID.randomUUID() + "_" + multipartFile.getOriginalFilename();

                // 1️⃣ Save image to src (for development)
                Path sourcePath = Paths.get("src/main/resources/static/images/");
                Files.createDirectories(sourcePath);
                Path imagePath = sourcePath.resolve(fileName);
                multipartFile.transferTo(imagePath);

                // 2️⃣ Also copy to target/classes/static (for runtime access)
                Path targetPath = Paths.get("target/classes/static/images/");
                Files.createDirectories(targetPath);
                Files.copy(imagePath, targetPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

                // 3️⃣ Store path in DB
                book.setImagePath("/images/" + fileName);
            }
        book.setLibrary(library);
        libraryRepositryInter.save(library);
        bookRepositryInter.save(book);
        } catch (IOException e) {
            throw new RuntimeException("Image saving failed: " + e.getMessage());
        }
//        bookRepositryInter.save(book);
    }

    public void updateBook(Book updatedBook, MultipartFile file) {
        try {
            // 1️⃣ Find existing book by ID
            Optional<Book> optionalBook = bookRepositryInter.findById(updatedBook.getId());
            if (optionalBook.isEmpty()) {
                throw new RuntimeException("Book not found with ID: " + updatedBook.getId());
            }

            Book existingBook = optionalBook.get();

            // 2️⃣ Handle new image upload (if any)
            if (file != null && !file.isEmpty()) {
                // --- Delete old image ---
                if (existingBook.getImagePath() != null) {
                    String oldImageName = existingBook.getImagePath().replace("/images/", "");
                    Path oldImagePath1 = Paths.get("src/main/resources/static/images/").resolve(oldImageName);
                    Path oldImagePath2 = Paths.get("target/classes/static/images/").resolve(oldImageName);

                    Files.deleteIfExists(oldImagePath1);
                    Files.deleteIfExists(oldImagePath2);
                }

                // --- Save new image ---
                String fileName = UUID.randomUUID() + "_" + file.getOriginalFilename();

                Path sourcePath = Paths.get("src/main/resources/static/images/");
                Files.createDirectories(sourcePath);
                Path imagePath = sourcePath.resolve(fileName);
                file.transferTo(imagePath);

                Path targetPath = Paths.get("target/classes/static/images/");
                Files.createDirectories(targetPath);
                Files.copy(imagePath, targetPath.resolve(fileName), StandardCopyOption.REPLACE_EXISTING);

                existingBook.setImagePath("/images/" + fileName);
            }

            // 3️⃣ Update other fields
            existingBook.setName(updatedBook.getName());
            existingBook.setAuthor(updatedBook.getAuthor());
            existingBook.setPrice(updatedBook.getPrice());

            // 4️⃣ Save to database
            bookRepositryInter.save(existingBook);

        } catch (IOException e) {
            throw new RuntimeException("Failed to update book image: " + e.getMessage());
        }
    }

    public Library saveLibrary(LibraryDto libraryDto) {

        Library library=new Library();
        library.setName(libraryDto.name());
        library.setAddress(libraryDto.address());
        return libraryRepositryInter.save(library);

    }

}
