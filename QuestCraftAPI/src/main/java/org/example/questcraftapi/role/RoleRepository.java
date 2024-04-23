package org.example.questcraftapi.role;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface RoleRepository extends MongoRepository<RoleDocument, String> {
    RoleDocument findByRoleId(String roleId);
}