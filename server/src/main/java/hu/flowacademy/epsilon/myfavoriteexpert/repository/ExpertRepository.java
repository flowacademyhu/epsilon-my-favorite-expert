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

//    @Query("{\"function_score\": {\"query\": {\"multi_match\": {\"query\": \"?0\",\"type\": \"best_fields\", \"fields\": [\"name\",\"address.city^5\",\"address.country^10\",\"address.street\",\"address.number\",\"phone\",\"profession^17\"],\"fuzziness\" : \"auto\",\"prefix_length\" : \"2\"} }}}")
//    Page<Expert> findExpertTest(String params,Pageable pageable);
//JSONArray
    //@Query("{\"bool\": {\"must\": {\"terms\": {\"your_field_name\":?0}}}}")
    //List<ParsedContent> searchInBody(JSONArray keyword);


       @Query("{ \"dis_max\": {\"tie_breaker\" : 0.7,\"boost\" : 1.2,\"queries\" : [{\"bool\": {\"should\": [{\"wildcard\": {\"name\": {\"value\": \"?1\"}}},{\"wildcard\": {\"address.country\": {\"value\": \"?1\"}}},{\"wildcard\": {\"address.city\": {\"value\": \"?1\"}}},{\"wildcard\": {\"address.street\": {\"value\": \"?1\"}}},{\"wildcard\": {\"email\": {\"value\": \"?1\"}}},{\"wildcard\": {\"profession\": {\"value\": \"?1\", \"boost\": \"2\"}}}]}},{\"function_score\": {\"query\": {\"multi_match\": {\"query\": \"?0\",\"type\": \"best_fields\", \"fields\": [\"name\",\"address.city^5\",\"address.country^10\",\"address.street\",\"address.number\",\"phone\",\"profession^17\"],\"fuzziness\" : \"auto\",\"prefix_length\" : \"2\"} }}}]}}}")
       Page<Expert> findExpertTest(String params,String searchPartialInWords,Pageable pageable);



}