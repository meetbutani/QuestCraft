package org.example.questcraftapi.auth;

import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserRepository extends MongoRepository<UserDocument, String> {

    UserDocument findByUsername(String username);

    UserDocument findByEmail(String email);
}
