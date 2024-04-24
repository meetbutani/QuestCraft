package org.example.questcraftapi.role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public RoleDocument createRole(RoleDocument role) {
        return roleRepository.save(role);
    }

    public RoleDocument findRoleById(String id) {
        return roleRepository.findById(id).orElseThrow();
    }

    public RoleDocument findRoleByRoleId(String roleId) {
        return roleRepository.findByRoleId(roleId);
    }

    public List<String> findAllActiveRoleIds() {
        return roleRepository.findAll().stream()
                .filter(role -> "active".equals(role.getStatus()))
                .map(RoleDocument::getRoleId)
                .collect(Collectors.toList());
    }

    public List<RoleDocument> findAllRoles() {
        return roleRepository.findAll();
    }

    public RoleDocument updateRole(String roleId, RoleDocument updates) {
        RoleDocument existingRole = roleRepository.findByRoleId(roleId);
        if (existingRole == null) {
            throw new RuntimeException("Role not found.");
        }
        // Update the role information
        existingRole.setAccessList(updates.getAccessList());
        existingRole.setStatus(updates.getStatus());
        return roleRepository.save(existingRole);
    }

    public void deleteRole(String roleId) {
        RoleDocument role = roleRepository.findByRoleId(roleId);
        if (role == null) {
            throw new RuntimeException("Role not found.");
        }
        roleRepository.delete(role);
    }
}