package hu.flowacademy.epsilon.myfavoriteexpert.repository;

import hu.flowacademy.epsilon.myfavoriteexpert.model.Expert;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface ExpertRepository  extends ElasticsearchRepository<Expert, UUID> {

}
