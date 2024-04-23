package org.example.questcraftapi.role;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.List;
import java.util.StringJoiner;

@Document("roles")
public class RoleDocument {

    @Id
    private String id;

    @Indexed(unique = true)
    private String roleId;

    private List<String> accessList; // Assuming accessList is an array of strings representing access rights or permissions

    private String status;

    // toString() method
    @Override
    public String toString() {
        return new StringJoiner(", ", RoleDocument.class.getSimpleName() + "[", "]")
                .add("id='" + id + "'")
                .add("roleId='" + roleId + "'")
                .add("accessList=" + accessList)
                .add("status=" + status)
                .toString();
    }

    // Constructors, Getters and Setters

    public RoleDocument() {
    }

    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getRoleId() {
        return roleId;
    }

    public void setRoleId(String roleId) {
        this.roleId = roleId;
    }

    public List<String> getAccessList() {
        return accessList;
    }

    public void setAccessList(List<String> accessList) {
        this.accessList = accessList;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}