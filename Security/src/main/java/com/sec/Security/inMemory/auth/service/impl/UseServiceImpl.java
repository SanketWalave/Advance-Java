package com.sec.Security.inMemory.auth.service.impl;

import com.sec.Security.inMemory.auth.dto.request.CreateUserRequest;
import com.sec.Security.inMemory.auth.dto.request.UpdateUserRequest;
import com.sec.Security.inMemory.auth.dto.response.UserResponse;
import com.sec.Security.inMemory.auth.entity.User;
import com.sec.Security.inMemory.auth.mapper.UserMapper;
import com.sec.Security.inMemory.auth.repository.UserRepository;
import com.sec.Security.inMemory.auth.service.UserService;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
class UserServiceImpl implements UserService {

    private final UserRepository repository;

    public UserServiceImpl(UserRepository repository) {
        this.repository = repository;
    }

    @Override
    public UserResponse create(CreateUserRequest request) {

        User user = UserMapper.toEntity(request);

        return UserMapper.toResponse(repository.save(user));
    }

    @Override
    public List<UserResponse> getAll() {

        return repository.findAll()
                .stream()
                .map(UserMapper::toResponse)
                .collect(Collectors.toList());
    }

    @Override
    public UserResponse getById(Long id) {

        User user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        return UserMapper.toResponse(user);
    }

    @Override
    public UserResponse update(Long id, UpdateUserRequest request) {

        User user = repository.findById(id)
                .orElseThrow(() -> new RuntimeException("User Not Found"));

        user.setName(request.getName());
        user.setRole(request.getRole());

        return UserMapper.toResponse(repository.save(user));
    }

    @Override
    public void delete(Long id) {

        repository.deleteById(id);

    }
}