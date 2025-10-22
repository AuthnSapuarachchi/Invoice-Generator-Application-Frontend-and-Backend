package in.authn.InvoiceGenerater.repository;

import in.authn.InvoiceGenerater.entity.User;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.Optional;

public interface UserRepository extends MongoRepository<User, String> {
    Optional<User> findByClerkId(String clerkId);

    boolean existsByClerkId(String s);
}
