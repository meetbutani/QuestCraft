package org.example.questcraftapi.role;

import org.example.questcraftapi.auth.UserDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.Optional;
import java.util.stream.Collectors;
import java.util.stream.IntStream;

@Service
public class RoleService {

    @Autowired
    private RoleRepository roleRepository;

    public RoleDocument createRole(RoleDocument role) {
        return roleRepository.save(role);
    }

    public Optional<RoleDocument> findRoleById(String id) {
        return roleRepository.findById(id);
    }

    public Optional<RoleDocument> findRoleByRoleId(String roleId) {
        return Optional.ofNullable(roleRepository.findByRoleId(roleId));
    }

    public List<String> findAllActiveRoleIds() {
        return roleRepository.findAll().stream()
                .filter(role -> "Active".equals(role.getStatus()))
                .map(RoleDocument::getRoleId)
                .collect(Collectors.toList());
    }

    public List<Map<String, Object>> getAllRoles() {
        List<RoleDocument> roles = roleRepository.findAll();
        return IntStream.range(0, roles.size()).mapToObj(index -> {
            RoleDocument role = roles.get(index);
            Map<String, Object> roleMap = new HashMap<>();
            roleMap.put("serialNo", index + 1);
            roleMap.put("id", role.getId());
            roleMap.put("roleId", role.getRoleId());
            roleMap.put("accessList", role.getAccessList());
            roleMap.put("status", role.getStatus());
            return roleMap;
        }).collect(Collectors.toList());
//        return roleRepository.findAll();
    }

    public RoleDocument updateRole(RoleDocument updates) {
        return roleRepository.save(updates);
    }

    public void deleteRole(String roleId) {
        roleRepository.deleteById(roleId);
    }

    public void deleteRoleByRoleId(String roleId) {
        findRoleByRoleId(roleId).ifPresent(roleDocument -> deleteRole(roleDocument.getId()));
    }
}