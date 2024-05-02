package org.example.questcraftapi.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.bcrypt.BCrypt;
import org.springframework.web.bind.annotation.*;

import java.util.concurrent.CompletableFuture;
import java.util.function.Function;

import java.util.*;

@RestController
@RequestMapping("/api/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDocument user) {
        Optional<UserDocument> existingUser;
        if (user.getEmail() != null) {
            existingUser = userService.findUserByEmail(user.getEmail());
            if (existingUser.isPresent()) {
                return ResponseEntity.ok().body(Collections.singletonMap("message", "Email already exists"));
            }
        }
        if (user.getUsername() != null) {
            existingUser = userService.findUserByUsername(user.getUsername());
            if (existingUser.isPresent()) {
                return ResponseEntity.ok().body(Collections.singletonMap("message", "Username already exists"));
            }
        }
        userService.createUser(user);
        return ResponseEntity.ok().body(Collections.singletonMap("message", "Registered Successfully"));
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDocument user) {
        Optional<UserDocument> existingUser = Optional.empty();
        if (user.getUsername() != null) {
            existingUser = userService.findUserByUsername(user.getUsername());
        } else if (user.getEmail() != null) {
            existingUser = userService.findUserByEmail(user.getEmail());
        }

        if (existingUser.isPresent() && userService.comparePassword(existingUser.get(), user.getPassword())) {
            UserDocument userDocument = existingUser.get();
            Map<String, Object> responseBody = getUserResponse(userDocument);
            responseBody.put("accessList", userDocument.getRole().getAccessList());
            responseBody.put("roleStatus", userDocument.getRole().getStatus());
            return ResponseEntity.ok().body(Collections.singletonMap("data", responseBody));
        } else if (existingUser.isPresent()) {
            return ResponseEntity.status(201).body(Collections.singletonMap("message", "Password is incorrect."));
        } else {
            return ResponseEntity.status(201).body(Collections.singletonMap("message", "User not found."));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable String id) {
        Optional<UserDocument> user = userService.findById(id);
        if (user.isPresent()) {
            UserDocument userDocument = user.get();
            return ResponseEntity.ok().body(Collections.singletonMap("data", getUserResponse(userDocument)));
        } else {
            return ResponseEntity.status(201).body(Collections.singletonMap("message", "User not found."));
        }
    }

    @GetMapping("/username/{username}")
    public ResponseEntity<?> getUserByUsername(@PathVariable String username) {
        Optional<UserDocument> user = userService.findUserByUsername(username);
        if (user.isPresent()) {
            UserDocument userDocument = user.get();
            return ResponseEntity.ok().body(Collections.singletonMap("data", getUserResponse(userDocument)));
        } else {
            return ResponseEntity.status(201).body(Collections.singletonMap("message", "User not found."));
        }
    }

    @GetMapping
    public ResponseEntity<?> getAllUsers() {
        List<Map<String, Object>> users = userService.getAllUsers();
        return ResponseEntity.ok().body(Collections.singletonMap("data", users));
    }

    @PutMapping
    public ResponseEntity<?> updateUser(@RequestBody UserDocument updates) {
        Optional<UserDocument> existingUser = userService.findById(updates.getId());
        if (existingUser.isPresent()) {
            UserDocument existingUserData = existingUser.get();
            if (updates.getEmail() != null && !updates.getEmail().equals(existingUserData.getEmail())) {
                Optional<UserDocument> existingUserByEmail = userService.findUserByEmail(updates.getEmail());
                if (existingUserByEmail.isPresent()) {
                    return ResponseEntity.ok().body(Collections.singletonMap("message", "Email already exists"));
                }
                existingUserData.setEmail(updates.getEmail());
            }
            if (updates.getUsername() != null && !updates.getUsername().equals(existingUserData.getUsername())) {
                Optional<UserDocument> existingUserByUsername = userService.findUserByUsername(updates.getUsername());
                if (existingUserByUsername.isPresent()) {
                    return ResponseEntity.ok().body(Collections.singletonMap("message", "Username already exists"));
                }
                existingUserData.setUsername(updates.getUsername());
            }
            if (updates.getFirstName() != null) {
                existingUserData.setFirstName(updates.getFirstName());
            }
            if (updates.getLastName() != null) {
                existingUserData.setLastName(updates.getLastName());
            }
            if (updates.getPassword() != null && !updates.getPassword().isEmpty() && !userService.comparePassword(existingUserData, updates.getPassword())) {
                existingUserData.setPassword(BCrypt.hashpw(updates.getPassword(), BCrypt.gensalt(10)));
            }
            if (updates.getContactNo() != null) {
                existingUserData.setContactNo(updates.getContactNo());
            }
            if (updates.getOfficeLocation() != null) {
                existingUserData.setOfficeLocation(updates.getOfficeLocation());
            }
            if (updates.getRoleId() != null) {
                existingUserData.setRoleId(updates.getRoleId());
            }
            if (updates.getStatus() != null) {
                existingUserData.setStatus(updates.getStatus());
            }
            userService.updateUser(existingUserData);
            return ResponseEntity.ok().body(Collections.singletonMap("message", "User updated successfully."));
        } else {
            return ResponseEntity.status(201).body(Collections.singletonMap("message", "User not found."));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.ok().body(Collections.singletonMap("message", "User deleted successfully."));
    }

    @DeleteMapping("/username/{username}")
    public ResponseEntity<?> deleteUserByUsername(@PathVariable String username) {
        userService.deleteUserByUsername(username);
        return ResponseEntity.ok().body(Collections.singletonMap("message", "User deleted successfully."));
    }

    private Map<String, Object> getUserResponse(UserDocument userDocument) {
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("id", userDocument.getId());
        responseBody.put("firstName", userDocument.getFirstName());
        responseBody.put("lastName", userDocument.getLastName());
        responseBody.put("username", userDocument.getUsername());
        responseBody.put("email", userDocument.getEmail());
        responseBody.put("roleId", userDocument.getRole().getRoleId());
        responseBody.put("contactNo", userDocument.getContactNo());
        responseBody.put("officeLocation", userDocument.getOfficeLocation());
        responseBody.put("status", userDocument.getStatus());
        return responseBody;
    }
}
