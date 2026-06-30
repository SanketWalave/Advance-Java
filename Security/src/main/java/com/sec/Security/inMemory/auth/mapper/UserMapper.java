package com.sec.Security.inMemory.auth.mapper;

import com.sec.Security.inMemory.auth.dto.request.CreateUserRequest;
import com.sec.Security.inMemory.auth.dto.response.UserResponse;
import com.sec.Security.inMemory.auth.entity.User;

public class UserMapper {

        public static User toEntity(CreateUserRequest dto) {
        User user = new User();
        user.setName(dto.getName());
        user.setRole(dto.getRole());
        return user;
    }

    public static UserResponse toResponse(User user) {
        return new UserResponse(
                user.getId(),
                user.getName(),
                user.getRole()
        );
    }
}