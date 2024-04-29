package org.example.questcraftapi.auth;

import org.example.questcraftapi.role.RoleDocument;
import org.example.questcraftapi.role.RoleRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCrypt;
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
        return IntStream.range(0, users.size()).mapToObj(index -> {
            UserDocument user = users.get(index);
            Map<String, Object> userMap = new HashMap<>();
            userMap.put("serialNo", index + 1);
            userMap.put("id", user.getId());
            userMap.put("firstName", user.getFirstName());
            userMap.put("lastName", user.getLastName());
            userMap.put("username", user.getUsername());
            userMap.put("email", user.getEmail());
            userMap.put("roleId", user.getRole().getRoleId());
            userMap.put("contactNo", user.getContactNo());
            userMap.put("officeLocation", user.getOfficeLocation());
            userMap.put("status", user.getStatus());
            return userMap;
        }).collect(Collectors.toList());
    }

    public UserDocument updateUser(UserDocument updates) {
        if (updates.getRoleId() != null) {
            RoleDocument role = roleRepository.findByRoleId(updates.getRoleId());
            updates.setRoleId(null);
            updates.setRole(role);
        }
        return userRepository.save(updates);
    }

    public void deleteUser(String userId) {
        userRepository.deleteById(userId);
    }

    public void deleteUserByUsername(String username) {
        findUserByUsername(username).ifPresent(userDocument -> deleteUser(userDocument.getId()));
    }
}
