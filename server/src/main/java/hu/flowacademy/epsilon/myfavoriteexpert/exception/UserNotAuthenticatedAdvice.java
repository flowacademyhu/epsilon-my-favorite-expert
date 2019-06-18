package hu.flowacademy.epsilon.myfavoriteexpert.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;


@ControllerAdvice
public class UserNotAuthenticatedAdvice {

    @ResponseBody
    @ExceptionHandler(UserNotAuthenticatedExeption.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public String errorHandler(UserNotAuthenticatedExeption e) {

        return e.getMessage();
    }
}
