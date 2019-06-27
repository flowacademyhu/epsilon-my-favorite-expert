package hu.flowacademy.epsilon.myfavoriteexpert.e2e;

import hu.flowacademy.epsilon.myfavoriteexpert.controller.ExpertResource;
import hu.flowacademy.epsilon.myfavoriteexpert.model.Expert;
import hu.flowacademy.epsilon.myfavoriteexpert.security.CustomUserDetailsService;
import hu.flowacademy.epsilon.myfavoriteexpert.service.ExpertService;

import org.junit.Ignore;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.mockito.Mock;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.WebMvcTest;
import org.springframework.boot.test.mock.mockito.MockBean;
import org.springframework.http.MediaType;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.test.web.servlet.MockMvc;

import java.util.Arrays;
import java.util.List;

import static org.assertj.core.api.Assertions.*;
import static org.hamcrest.Matchers.hasSize;
import static org.hamcrest.Matchers.is;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.get;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.status;

@Ignore
@RunWith(SpringRunner.class)
@WebMvcTest(ExpertResource.class)
public class ExpertResourceTest {
    private final static String accesToken = "Bearer eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiI4MDA0YTZkZC0zZWEwLTRiNDQtODUyNS1iZmE4ODRkZGFjN2YiLCJpYXQiOjE1NjE1NDA0NTIsImV4cCI6MTU2MjQwNDQ1Mn0.0c0cQJdkp9f6hG4XQjZyBPHEaxo5djCUM_AAa8q4w_epmXW5pb5XfgXXLIyI3UfXRGZgcS8odWPmiLnolGcy4Q";


    @Autowired
    private MockMvc mvc;

    @Autowired
    private CustomUserDetailsService customUserDetailsService;

    @MockBean
    private ExpertService expertService;

    @Test
    public void givenTodoItems_whenTodoItems_thenReturnJsonArray() throws Exception {

        Expert expertShouldBeFound= new Expert();
        expertShouldBeFound.setName("Hajnal Andor");

        List<Expert> allExpertShouldBeFound = Arrays.asList(expertShouldBeFound);

        given(expertService.find()).willReturn(allExpertShouldBeFound);

        mvc.perform(get("/expert").header("Authorization",accesToken)
                .contentType(MediaType.APPLICATION_JSON))
                .andExpect(status().isOk())
                .andExpect(jsonPath("$", hasSize(1)))
                .andExpect(jsonPath("$[0].name", is(expertShouldBeFound.getName())));
    }

}
