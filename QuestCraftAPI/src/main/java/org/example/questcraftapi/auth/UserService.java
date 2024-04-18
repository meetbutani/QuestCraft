package org.example.questcraftapi.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    private final BCryptPasswordEncoder bCryptPasswordEncoder = new BCryptPasswordEncoder();

    public UserDocument createUser(UserDocument user) {
//        user.setPassword(bCryptPasswordEncoder.encode(user.getPassword()));
        return userRepository.save(user);
    }

    public Optional<UserDocument> findUserByUsername(String username) {
        return Optional.ofNullable(userRepository.findByUsername(username));
    }

    public Optional<UserDocument> findUserByEmail(String email) {
        return Optional.ofNullable(userRepository.findByEmail(email));
    }

    public boolean comparePassword(UserDocument user, String password) {
        return bCryptPasswordEncoder.matches(password, user.getPassword());
    }

    public List<UserDocument> getAllUsers() {
        return userRepository.findAll();
    }

    public UserDocument updateUser(String userId, UserDocument updates) {
        UserDocument user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if (updates.getEmail() != null) {
            UserDocument existingUser = userRepository.findByEmail(updates.getEmail());
            if (existingUser.getId().equals(user.getId())) {
                throw new RuntimeException("Email already exists");
            }
            user.setEmail(updates.getEmail());
        }
        if (updates.getUsername() != null) {
            UserDocument existingUser = userRepository.findByUsername(updates.getUsername());
            if (existingUser.getId().equals(user.getId())) {
                throw new RuntimeException("Username already exists");
            }
            user.setUsername(updates.getUsername());
        }
//        if (updates.getRole() != null) {
//            user.setRole(updates.getRole());
//        }
        if (updates.getStatus() != null) {
            user.setStatus(updates.getStatus());
        }
        if (updates.getPassword() != null) {
            user.setPassword(bCryptPasswordEncoder.encode(updates.getPassword()));
        }
        if (updates.getFirstName() != null) {
            user.setFirstName(updates.getFirstName());
        }
        if (updates.getLastName() != null) {
            user.setLastName(updates.getLastName());
        }
        if (updates.getContactNo() != null) {
            user.setContactNo(updates.getContactNo());
        }
        if (updates.getOfficeLocation() != null) {
            user.setOfficeLocation(updates.getOfficeLocation());
        }
        return userRepository.save(user);
    }

    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }
}
