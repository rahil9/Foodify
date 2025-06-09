package com.example.service;

import com.example.dto.UserRequest;
import com.example.dto.UserResponse;
import com.example.entity.User;
import com.example.exception.NoUsersFoundException;
import com.example.exception.UserAlreadyExistsException;
import com.example.exception.UserNotFoundException;
import com.example.mapper.UserMapper;
import com.example.repository.UserRepository;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final UserMapper userMapper;

    public UserServiceImpl(UserRepository userRepository, UserMapper userMapper) {
        this.userRepository = userRepository;
        this.userMapper = userMapper;
    }

    @Override
    public UserResponse createUser(UserRequest user) {
        System.out.println("Control here");
        if (userRepository.findByEmail(user.getEmail()).isPresent()) {
            throw new UserAlreadyExistsException("User with email " + user.getEmail() + " already exists");
        }
        return userMapper.mapToDTO(userRepository.save(userMapper.mapToModel(user)));
    }

    @Override
    public UserResponse getUserByEmail(String emailId) {
        User exisitingUser = userRepository.findByEmail(emailId)
                .orElseThrow(() -> new UserNotFoundException("User with Email " + emailId + " not found."));
        return userMapper.mapToDTO(exisitingUser);
    }

    @Override
    public UserResponse getUserById(int userId) {
        return userMapper.mapToDTO(userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("User with Id " + userId + " not found.")));
    }

    @Override
    public List<UserResponse> getAllUsers() {
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            throw new NoUsersFoundException("No Users Found");
        }
        return users.stream().map(userMapper::mapToDTO).collect(Collectors.toList());
    }

    @Override
    public UserResponse updateUser(UserRequest user) {
        User existingUser = userRepository.findById(user.getId())
                .orElseThrow(() -> new UserNotFoundException("Cannot update. User not found with ID: " + user.getId()));

        existingUser.setName(user.getName());
        existingUser.setEmail(user.getEmail());
        existingUser.setPassword(existingUser.getPassword());
        existingUser.setRole(user.getRole());

        UserResponse userSaved = userMapper.mapToDTO(userRepository.save(existingUser));
        return userSaved;
    }

    @Override
    public void deleteUserById(int userId) {
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new UserNotFoundException("Cannot delete. User not found with ID: " + userId));

        userRepository.deleteById(userId);
    }

    @Override
    public void deleteAllUsers() {
        List<User> users = userRepository.findAll();
        if (users.isEmpty()) {
            throw new NoUsersFoundException("No users to delete.");
        }
        userRepository.deleteAll();
    }

    @Override
    public UserResponse getUserProfile(String email) {
        User user = userRepository.findByEmail(email)
                .orElseThrow(() -> new UserNotFoundException("User with email " + email + " not found"));
        return userMapper.mapToDTO(user);
    }

}
