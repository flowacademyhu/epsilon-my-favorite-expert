package hu.flowacademy.epsilon.myfavoriteexpert.service;

import hu.flowacademy.epsilon.myfavoriteexpert.model.User;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.servlet.handler.HandlerInterceptorAdapter;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.time.LocalDateTime;

@Service
public class AccesTokenValidationService extends HandlerInterceptorAdapter {

    Logger logger = LoggerFactory.getLogger(this.getClass());


    @Autowired
    private UserService userService;

    public void validateAccesToken(String accestoken) {
        if (accestoken == null) {
            throw new RuntimeException("ACCESTOKENISNULL");
        }
        var userId = userService.getIdFromAccesToken(accestoken);
        if (userId == null) {
            throw new RuntimeException("Invalid access token!!!");
        }
        User user=userService.findByid(accestoken);

        if (user.getExpiresAt().isBefore(LocalDateTime.now())) {
            throw new RuntimeException("Accestoken expired");
        }
        user.setExpiresAt(user.getExpiresAt().plusHours(1));
        userService.save(user);
    }

    @Override
    public boolean preHandle(HttpServletRequest request, HttpServletResponse response, Object handler) throws Exception {
        validateAccesToken(request.getHeader("Authorization"));
        return super.preHandle(request, response, handler);
    }
}