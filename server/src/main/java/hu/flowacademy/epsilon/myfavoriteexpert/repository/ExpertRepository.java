package hu.flowacademy.epsilon.myfavoriteexpert.repository;

import hu.flowacademy.epsilon.myfavoriteexpert.model.Expert;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.elasticsearch.annotations.Query;
import org.springframework.data.elasticsearch.repository.ElasticsearchRepository;
import org.springframework.stereotype.Repository;

import java.util.UUID;


@Repository
public interface ExpertRepository  extends ElasticsearchRepository<Expert, UUID> {

    @Query("{\"function_score\": {\"query\": {\"multi_match\": {\"query\": \"Szeged\",\"type\": \"best_fields\", \"fields\": [\"name\",\"address.city\",\"address.country\",\"phone\"],\"fuzziness\" : \"auto\"} }}}")
    Page<Expert> findExpertTest(Pageable pageable);
//JSONArray
    //@Query("{\"bool\": {\"must\": {\"terms\": {\"your_field_name\":?0}}}}")
    //List<ParsedContent> searchInBody(JSONArray keyword);

}