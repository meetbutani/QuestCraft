package org.example.questcraftapi.role;

import org.example.questcraftapi.auth.UserDocument;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Collections;
import java.util.List;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping
    public ResponseEntity<?> createRole(@RequestBody RoleDocument role) {
        Optional<RoleDocument> roleDocument = roleService.findRoleByRoleId(role.getRoleId());
        if (roleDocument.isPresent()) {
            return ResponseEntity.ok().body(Collections.singletonMap("message", "Role ID already exists"));
        }
        roleService.createRole(role);
        return ResponseEntity.ok().body(Collections.singletonMap("message", "Role Added Successfully"));
    }

//    @GetMapping("/{id}")
//    public ResponseEntity<?> findRoleById(@PathVariable String id) {
//        Optional<RoleDocument> role = roleService.findRoleById(id);
//        if (role == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        return ResponseEntity.ok().body(role);
//    }
//
//    @GetMapping("/byRoleId/{roleId}")
//    public ResponseEntity<?> findRoleByRoleId(@PathVariable String roleId) {
//        Optional<RoleDocument> role = roleService.findRoleByRoleId(roleId);
//        if (role == null) {
//            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
//        }
//        return ResponseEntity.ok().body(role);
//    }

    @GetMapping
    public ResponseEntity<?> getAllRoles() {
        List<Map<String, Object>> roles = roleService.getAllRoles();
        return ResponseEntity.ok().body(Collections.singletonMap("data", roles));
    }

    @GetMapping("/active")
    public ResponseEntity<List<String>> findAllActiveRoleIds() {
        List<String> roleIds = roleService.findAllActiveRoleIds();
        return ResponseEntity.ok().body(roleIds);
    }

    @PutMapping
    public ResponseEntity<?> updateRole(@RequestBody RoleDocument updates) {
        Optional<RoleDocument> existingRole = roleService.findRoleById(updates.getId());
        if (existingRole.isPresent()) {
            RoleDocument existingRoleData = existingRole.get();
            if (updates.getRoleId() != null && !updates.getRoleId().equals(existingRoleData.getRoleId())) {
                Optional<RoleDocument> existingRoleByRoleId = roleService.findRoleByRoleId(updates.getRoleId());
                if (existingRoleByRoleId.isPresent()) {
                    return ResponseEntity.ok().body(Collections.singletonMap("message", "Role ID already exists"));
                }
                existingRoleData.setRoleId(updates.getRoleId());
            }
            if (updates.getStatus() != null) {
                existingRoleData.setStatus(updates.getStatus());
            }
            if (updates.getAccessList() != null) {
                existingRoleData.setAccessList(updates.getAccessList());
            }
            roleService.updateRole(existingRoleData);
            return ResponseEntity.ok().body(Collections.singletonMap("message", "Role updated successfully."));
        } else {
            return ResponseEntity.status(204).body(Collections.singletonMap("message", "Role not found."));
        }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteRole(@PathVariable String id) {
        roleService.deleteRole(id);
        return ResponseEntity.ok().body(Collections.singletonMap("message", "Role deleted successfully."));
    }

    @DeleteMapping("/roleId/{roleId}")
    public ResponseEntity<?> deleteRoleByRoleId(@PathVariable String roleId) {
        roleService.deleteRoleByRoleId(roleId);
        return ResponseEntity.ok().body(Collections.singletonMap("message", "Role deleted successfully."));
    }
}