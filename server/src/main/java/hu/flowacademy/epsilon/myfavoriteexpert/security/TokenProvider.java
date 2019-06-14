package hu.flowacademy.epsilon.myfavoriteexpert.security;

import hu.flowacademy.epsilon.myfavoriteexpert.config.AppProperties;
import hu.flowacademy.epsilon.myfavoriteexpert.model.User;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.UserRepository;
import io.jsonwebtoken.*;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.Authentication;
import org.springframework.stereotype.Service;

import java.util.Date;
import java.util.Optional;
import java.util.UUID;

@Service
public class TokenProvider {

    private static final Logger logger = LoggerFactory.getLogger(TokenProvider.class);

    private AppProperties appProperties;

    private UserRepository userRepository;

    public TokenProvider(AppProperties appProperties, UserRepository userRepository) {
        this.appProperties = appProperties;
        this.userRepository = userRepository;
    }

    public String createToken(Authentication authentication) {
        UserPrincipal userPrincipal = (UserPrincipal) authentication.getPrincipal();

        Optional<User> user = userRepository.findFirstByEmail(userPrincipal.getEmail());
        if (user.isPresent() && user.get().getAccessToken()!=null) {
            return user.get().getAccessToken();
        }

        Date now = new Date();
        Date expiryDate = new Date(now.getTime() + appProperties.getAuth().getTokenExpirationMsec());

        String compact = Jwts.builder()
                .setSubject(Optional.ofNullable(userPrincipal.getId()).map(UUID::toString).orElse(""))
                .setIssuedAt(new Date())
                .setExpiration(expiryDate)
                .signWith(SignatureAlgorithm.HS512, appProperties.getAuth().getTokenSecret())
                .compact();

        updateUser(userPrincipal.getId(), compact);

        return compact;
    }

    private void updateUser(UUID id, String compact) {
        userRepository.findById(id).ifPresent(user -> {
            user.setAccessToken(compact);
            userRepository.save(user);
        });
    }

    public String getUserIdFromToken(String token) {
        Claims claims = Jwts.parser()
                .setSigningKey(appProperties.getAuth().getTokenSecret())
                .parseClaimsJws(token)
                .getBody();

        return claims.getSubject();
    }

    public boolean validateToken(String authToken) {
        try {
            Jwts.parser().setSigningKey(appProperties.getAuth().getTokenSecret()).parseClaimsJws(authToken);
            return true;
        } catch (SignatureException ex) {
            logger.error("Invalid JWT signature");
        } catch (MalformedJwtException ex) {
            logger.error("Invalid JWT token");
        } catch (ExpiredJwtException ex) {
            logger.error("Expired JWT token");
        } catch (UnsupportedJwtException ex) {
            logger.error("Unsupported JWT token");
        } catch (IllegalArgumentException ex) {
            logger.error("JWT claims string is empty.");
        }
        return false;
    }

}

