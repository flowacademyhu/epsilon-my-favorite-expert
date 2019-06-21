package hu.flowacademy.epsilon.myfavoriteexpert.exception;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;


@ControllerAdvice
public class ExeptionAdvice {

    @ResponseBody
    @ExceptionHandler(UserNotAuthenticatedExeption.class)
    @ResponseStatus(HttpStatus.FORBIDDEN)
    public String errorHandler(UserNotAuthenticatedExeption e) {

        return e.getMessage();
    }

    @ResponseBody
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    public String errorHandler(RuntimeException e) {

        return e.getMessage();
    }
}
