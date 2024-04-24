package org.example.questcraftapi.auth;

import org.example.questcraftapi.role.RoleDocument;
import org.example.questcraftapi.role.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class UserService {

    @Autowired
    private UserRepository userRepository;

    @Autowired
    private RoleRepository roleRepository;

    public UserDocument createUser(UserDocument user) {
        user.setPassword(BCrypt.hashpw(user.getPassword(), BCrypt.gensalt(10)));
        RoleDocument role = roleRepository.findByRoleId(user.getRoleId());
        user.setRoleId(null);
        user.setRole(role);
        return userRepository.save(user);
    }

    public Optional<UserDocument> findUserByUsername(String username) {
        return Optional.ofNullable(userRepository.findByUsername(username));
    }

    public Optional<UserDocument> findUserByEmail(String email) {
        return Optional.ofNullable(userRepository.findByEmail(email));
    }

    public Optional<UserDocument> findById(String id) {
        return userRepository.findById(id);
    }

    public boolean comparePassword(UserDocument user, String password) {
        return BCrypt.checkpw(password, user.getPassword());
    }

    public List<Map<String, Object>> getAllUsers() {
        List<UserDocument> users = userRepository.findAll();
        return IntStream.range(0, users.size())
                .mapToObj(index -> {
                    UserDocument user = users.get(index);
                    Map<String, Object> userMap = new HashMap<>();
                    userMap.put("id", index + 1);
                    userMap.put("firstName", user.getFirstName());
                    userMap.put("lastName", user.getLastName());
                    userMap.put("username", user.getUsername());
                    userMap.put("email", user.getEmail());
                    userMap.put("roleId", user.getRole().getRoleId());
                    userMap.put("contactNo", user.getContactNo());
                    userMap.put("officeLocation", user.getOfficeLocation());
                    userMap.put("status", user.getStatus());
                    return userMap;
                })
                .collect(Collectors.toList());
    }

    public UserDocument updateUser(String userId, UserDocument updates) {
        UserDocument user = userRepository.findById(userId).orElseThrow(() -> new RuntimeException("User not found"));
        if (updates.getEmail() != null) {
            // UserDocument existingUser = userRepository.findByEmail(updates.getEmail());
            // if (existingUser.getId().equals(user.getId())) {
            // throw new RuntimeException("Email already exists");
            // }
            user.setEmail(updates.getEmail());
        }
        if (updates.getUsername() != null) {
            // UserDocument existingUser =
            // userRepository.findByUsername(updates.getUsername());
            // if (existingUser.getId().equals(user.getId())) {
            // throw new RuntimeException("Username already exists");
            // }
            user.setUsername(updates.getUsername());
        }
        // if (updates.getRole() != null) {
        // user.setRole(updates.getRole());
        // }
        if (updates.getStatus() != null) {
            user.setStatus(updates.getStatus());
        }
        if (updates.getPassword() != null) {
            user.setPassword(BCrypt.hashpw(updates.getPassword(), BCrypt.gensalt(10)));
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
