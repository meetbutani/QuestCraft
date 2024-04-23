package org.example.questcraftapi.role;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/roles")
public class RoleController {

    @Autowired
    private RoleService roleService;

    @PostMapping
    public ResponseEntity<RoleDocument> createRole(@RequestBody RoleDocument role) {
        RoleDocument createdRole = roleService.createRole(role);
        return new ResponseEntity<>(createdRole, HttpStatus.CREATED);
    }

    @GetMapping("/{id}")
    public ResponseEntity<RoleDocument> findRoleById(@PathVariable String id) {
        RoleDocument role = roleService.findRoleById(id);
        if (role == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(role);
    }

    @GetMapping("/byRoleId/{roleId}")
    public ResponseEntity<RoleDocument> findRoleByRoleId(@PathVariable String roleId) {
        RoleDocument role = roleService.findRoleByRoleId(roleId);
        if (role == null) {
            return new ResponseEntity<>(HttpStatus.NOT_FOUND);
        }
        return ResponseEntity.ok().body(role);
    }

    @GetMapping
    public ResponseEntity<List<RoleDocument>> findAllRoles() {
        List<RoleDocument> roles = roleService.findAllRoles();
        return ResponseEntity.ok().body(roles);
    }

    @GetMapping("/active")
    public ResponseEntity<List<String>> findAllActiveRoleIds() {
        List<String> roleIds = roleService.findAllActiveRoleIds();
        return ResponseEntity.ok().body(roleIds);
    }

    @PutMapping("/{id}")
    public ResponseEntity<RoleDocument> updateRole(@PathVariable String id, @RequestBody RoleDocument updates) {
        RoleDocument updatedRole = roleService.updateRole(id, updates);
        return ResponseEntity.ok().body(updatedRole);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteRole(@PathVariable String id) {
        roleService.deleteRole(id);
        return ResponseEntity.noContent().build();
    }
}