package hu.flowacademy.epsilon.myfavoriteexpert.repository;

import hu.flowacademy.epsilon.myfavoriteexpert.model.UserElastic;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;

@Repository
public interface UserElasticRepository extends ElasticsearchRepository<UserElastic, UUID> {


}
