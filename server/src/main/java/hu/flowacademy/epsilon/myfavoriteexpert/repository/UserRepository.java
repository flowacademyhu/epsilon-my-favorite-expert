package hu.flowacademy.epsilon.myfavoriteexpert.repository;

import hu.flowacademy.epsilon.myfavoriteexpert.model.User;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchCrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;
import java.util.UUID;

@Repository
public interface UserRepository extends ElasticsearchCrudRepository<User, UUID> {

    Optional<User> findFirstByEmail(String email);

    Boolean existsByEmail(String email);

    @Query("{\"function_score\": {\"query\": {\"multi_match\": {\"query\": \"?0\",\"type\": \"best_fields\", \"fields\": [\"name\"],\"fuzziness\" : \"auto\"} }}}")
    Page<User> findBestMatchesUser(String params, Pageable pageable);

    @Query("{\"function_score\": {\"query\": {\"multi_match\": {\"query\": \"?0\",\"type\": \"best_fields\", \"fields\": [\"name\",\"address.city^5\",\"address.country^10\",\"address.street\",\"address.number\",\"phone\",\"profession^7\"],\"fuzziness\" : \"auto\"} }}}")
    Page<User> findExpertsByUser(String params,Pageable pageable);

}
