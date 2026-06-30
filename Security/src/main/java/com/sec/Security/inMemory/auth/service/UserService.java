package com.sec.Security.inMemory.auth.service;


import com.sec.Security.inMemory.auth.dto.request.CreateUserRequest;
import com.sec.Security.inMemory.auth.dto.request.UpdateUserRequest;
import com.sec.Security.inMemory.auth.dto.response.UserResponse;

import java.util.List;

public interface UserService {

    UserResponse create(CreateUserRequest request);

    UserResponse update(Long id, UpdateUserRequest request);

    UserResponse getById(Long id);

    List<UserResponse> getAll();

    void delete(Long id);
}