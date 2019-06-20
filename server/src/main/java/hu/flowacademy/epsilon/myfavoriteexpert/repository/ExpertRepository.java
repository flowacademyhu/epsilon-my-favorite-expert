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

    @Query("{\"function_score\": {\"query\": {\"multi_match\": {\"query\": \"?0\",\"type\": \"best_fields\", \"fields\": [\"name\",\"address.city^5\",\"address.country^10\",\"address.street\",\"address.number\",\"phone\",\"profession^17\"],\"fuzziness\" : \"auto\",\"prefix_length\" : \"2\"} }}}")
    Page<Expert> findExpertTest(String params,Pageable pageable);
//JSONArray
    //@Query("{\"bool\": {\"must\": {\"terms\": {\"your_field_name\":?0}}}}")
    //List<ParsedContent> searchInBody(JSONArray keyword);

}