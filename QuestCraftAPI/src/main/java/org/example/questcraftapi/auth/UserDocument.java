package org.example.questcraftapi.auth;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.util.StringJoiner;

@Document("users")
public class UserDocument {

    @Id
    private String id;

    @Field("firstName")
    private String firstName;

    @Field("lastName")
    private String lastName;

    @Field("username")
    @Indexed(unique = true)
    private String username;

    @Field("email")
    @Indexed(unique = true)
    private String email;

    @Field("password")
    private String password;

//    @Field("role")
//    @DBRef
//    private RoleDocument role;

    @Field("contactNo")
    private String contactNo;

    @Field("officeLocation")
    private String officeLocation;

    @Field("status")
    private String status = "active";

    // toString() method
    @Override
    public String toString() {
        return new StringJoiner(", ", UserDocument.class.getSimpleName() + "[", "]")
                .add("id='" + id + "'")
                .add("firstName='" + firstName + "'")
                .add("lastName='" + lastName + "'")
                .add("username='" + username + "'")
                .add("email='" + email + "'")
                .add("password='" + password + "'")
//                .add("role=" + role)
                .add("contactNo='" + contactNo + "'")
                .add("officeLocation='" + officeLocation + "'")
                .add("status=" + status)
                .toString();
    }

    // Constructors, Getters and Setters

    public UserDocument() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getFirstName() {
        return firstName;
    }

    public void setFirstName(String firstName) {
        this.firstName = firstName;
    }

    public String getLastName() {
        return lastName;
    }

    public void setLastName(String lastName) {
        this.lastName = lastName;
    }

    public String getUsername() {
        return username;
    }

    public void setUsername(String username) {
        this.username = username;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getPassword() {
        return password;
    }

    public void setPassword(String password) {
        this.password = password;
    }

//    public RoleDocument getRole() {
//        return role;
//    }
//
//    public void setRole(RoleDocument role) {
//        this.role = role;
//    }

    public String getContactNo() {
        return contactNo;
    }

    public void setContactNo(String contactNo) {
        this.contactNo = contactNo;
    }

    public String getOfficeLocation() {
        return officeLocation;
    }

    public void setOfficeLocation(String officeLocation) {
        this.officeLocation = officeLocation;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}