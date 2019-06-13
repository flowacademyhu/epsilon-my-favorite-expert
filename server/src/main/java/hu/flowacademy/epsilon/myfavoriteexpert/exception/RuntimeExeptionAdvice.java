package hu.flowacademy.epsilon.myfavoriteexpert.exception;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

@ControllerAdvice
public class RuntimeExeptionAdvice {
    Logger logger= LoggerFactory.getLogger(RuntimeException.class);

    @ResponseBody
    @ExceptionHandler(RuntimeException.class)
    @ResponseStatus(HttpStatus.I_AM_A_TEAPOT)
    public String runtimeExHandler(RuntimeException e) {
        logger.error(e.getMessage());
        return e.getMessage();
    }
}
