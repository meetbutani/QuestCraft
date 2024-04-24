package org.example.questcraftapi.auth;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.concurrent.CompletableFuture;
import java.util.function.Function;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/auth")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@RequestBody UserDocument user) {
        UserDocument registeredUser = userService.createUser(user);
        // Construct a map containing the required fields
        Map<String, Object> responseBody = new HashMap<>();
        responseBody.put("firstName", registeredUser.getFirstName());
        responseBody.put("lastName", registeredUser.getLastName());
        responseBody.put("username", registeredUser.getUsername());
        responseBody.put("email", registeredUser.getEmail());
        responseBody.put("roleId", registeredUser.getRole().getRoleId());
        responseBody.put("accessList", registeredUser.getRole().getAccessList());
        responseBody.put("roleStatus", registeredUser.getRole().getStatus());
        responseBody.put("contactNo", registeredUser.getContactNo());
        responseBody.put("officeLocation", registeredUser.getOfficeLocation());
        responseBody.put("status", registeredUser.getStatus());
        return ResponseEntity.ok().body(responseBody);
    }

    @PostMapping("/login")
    public ResponseEntity<?> loginUser(@RequestBody UserDocument user) {
        Optional<UserDocument> existingUser = userService.findUserByUsername(user.getUsername());
        if (existingUser.isPresent()) {
            if (userService.comparePassword(existingUser.get(), user.getPassword())) {
                // Construct a map containing the required fields
                Map<String, Object> responseBody = new HashMap<>();
                responseBody.put("firstName", existingUser.get().getFirstName());
                responseBody.put("lastName", existingUser.get().getLastName());
                responseBody.put("username", existingUser.get().getUsername());
                responseBody.put("email", existingUser.get().getEmail());
                responseBody.put("roleId", existingUser.get().getRole().getRoleId());
                responseBody.put("accessList", existingUser.get().getRole().getAccessList());
                responseBody.put("roleStatus", existingUser.get().getRole().getStatus());
                responseBody.put("contactNo", existingUser.get().getContactNo());
                responseBody.put("officeLocation", existingUser.get().getOfficeLocation());
                responseBody.put("status", existingUser.get().getStatus());
                return ResponseEntity.ok().body(responseBody);
                // return ResponseEntity.ok().body(existingUser.get());
            } else {
                return ResponseEntity.ok().body("Password is incorrect.");
            }
        } else {
            existingUser = userService.findUserByEmail(user.getEmail());
            if (existingUser.isPresent()) {
                if (userService.comparePassword(existingUser.get(), user.getPassword())) {
                    // Construct a map containing the required fields
                    Map<String, Object> responseBody = new HashMap<>();
                    responseBody.put("firstName", existingUser.get().getFirstName());
                    responseBody.put("lastName", existingUser.get().getLastName());
                    responseBody.put("username", existingUser.get().getUsername());
                    responseBody.put("email", existingUser.get().getEmail());
                    responseBody.put("roleId", existingUser.get().getRole().getRoleId());
                    responseBody.put("accessList", existingUser.get().getRole().getAccessList());
                    responseBody.put("roleStatus", existingUser.get().getRole().getStatus());
                    responseBody.put("contactNo", existingUser.get().getContactNo());
                    responseBody.put("officeLocation", existingUser.get().getOfficeLocation());
                    responseBody.put("status", existingUser.get().getStatus());
                    return ResponseEntity.ok().body(responseBody);
                    // return ResponseEntity.ok().body(existingUser.get());
                } else {
                    return ResponseEntity.ok().body("Password is incorrect.");
                }
            } else {
                return ResponseEntity.ok().body("User not found");
            }
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<UserDocument> getUserById(@PathVariable String id) {
        Optional<UserDocument> user = userService.findById(id);
        return user.map(userDocument -> ResponseEntity.ok().body(userDocument))
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @GetMapping
    public ResponseEntity<List<Map<String, Object>>> getAllUsers() {
        List<Map<String, Object>> users = userService.getAllUsers();
        return ResponseEntity.ok().body(users);
    }

    @PutMapping("/{id}")
    public ResponseEntity<UserDocument> updateUser(@PathVariable String id, @RequestBody UserDocument updates) {
        UserDocument updatedUser = userService.updateUser(id, updates);
        return ResponseEntity.ok().body(updatedUser);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable String id) {
        userService.deleteUser(id);
        return ResponseEntity.noContent().build();
    }
}