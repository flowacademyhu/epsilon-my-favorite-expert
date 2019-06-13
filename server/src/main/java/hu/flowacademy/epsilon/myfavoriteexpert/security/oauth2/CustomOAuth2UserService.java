package hu.flowacademy.epsilon.myfavoriteexpert.security.oauth2;

import hu.flowacademy.epsilon.myfavoriteexpert.exception.OAuth2AuthenticationProcessingException;
import hu.flowacademy.epsilon.myfavoriteexpert.model.*;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.TokenRepository;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.UserElasticRepository;
import hu.flowacademy.epsilon.myfavoriteexpert.repository.UserRepository;
import hu.flowacademy.epsilon.myfavoriteexpert.security.UserPrincipal;
import hu.flowacademy.epsilon.myfavoriteexpert.security.oauth2.user.GoogleOAuth2UserInfo;
import hu.flowacademy.epsilon.myfavoriteexpert.security.oauth2.user.OAuth2UserInfo;
import hu.flowacademy.epsilon.myfavoriteexpert.security.oauth2.user.OAuth2UserInfoFactory;
import hu.flowacademy.epsilon.myfavoriteexpert.service.UserElasticService;
import io.swagger.models.auth.In;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.authentication.InternalAuthenticationServiceException;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.oauth2.client.userinfo.DefaultOAuth2UserService;
import org.springframework.security.oauth2.client.userinfo.OAuth2UserRequest;
import org.springframework.security.oauth2.core.OAuth2AccessToken;
import org.springframework.security.oauth2.core.OAuth2AuthenticationException;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Service;
import org.springframework.util.StringUtils;

import java.time.Instant;
import java.time.LocalDateTime;
import java.time.ZoneOffset;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.UUID;

@Service
public class CustomOAuth2UserService extends DefaultOAuth2UserService {

    Logger logger = LoggerFactory.getLogger(CustomOAuth2UserService.class);

    @Autowired
    private UserElasticService userElasticService;

    @Autowired
    private TokenRepository tokenRepository;

    @Autowired
    private UserRepository userRepository;

    @Override
    public OAuth2User loadUser(OAuth2UserRequest oAuth2UserRequest) throws OAuth2AuthenticationException {
        OAuth2User oAuth2User = super.loadUser(oAuth2UserRequest);

        try {
            return processOAuth2User(oAuth2UserRequest, oAuth2User);
        } catch (AuthenticationException ex) {
            throw ex;
        } catch (Exception ex) {
            // Throwing an instance of AuthenticationException will trigger the OAuth2AuthenticationFailureHandler
            throw new InternalAuthenticationServiceException(ex.getMessage(), ex.getCause());
        }
    }

    private OAuth2User processOAuth2User(OAuth2UserRequest oAuth2UserRequest, OAuth2User oAuth2User) {
        OAuth2UserInfo oAuth2UserInfo = OAuth2UserInfoFactory.getOAuth2UserInfo(oAuth2UserRequest.getClientRegistration().getRegistrationId(), oAuth2User.getAttributes());
        if(StringUtils.isEmpty(oAuth2UserInfo.getEmail())) {
            throw new OAuth2AuthenticationProcessingException("Email not found from OAuth2 provider");
        }

        Optional<User> userOptional = userRepository.findByEmail(oAuth2UserInfo.getEmail());
        User user;
        if(userOptional.isPresent()) {
            user = userOptional.get();
            if(!user.getProvider().equals(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()))) {
                throw new OAuth2AuthenticationProcessingException("Looks like you're signed up with " +
                        user.getProvider() + " account. Please use your " + user.getProvider() +
                        " account to login.");
            }
            user = updateExistingUser(user, oAuth2UserInfo);
        } else {
            user = registerNewUser(oAuth2UserRequest, oAuth2UserInfo);
        }

        return UserPrincipal.create(user, oAuth2User.getAttributes());
    }

    private User registerNewUser(OAuth2UserRequest oAuth2UserRequest, OAuth2UserInfo oAuth2UserInfo) {
        User user = new User();

        user.setProvider(AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()));
        user.setProviderId(oAuth2UserInfo.getId());
        user.setName(oAuth2UserInfo.getName());
        user.setEmail(oAuth2UserInfo.getEmail());
        user.setImageUrl(oAuth2UserInfo.getImageUrl());
        user.setAccessToken(Optional.ofNullable(oAuth2UserRequest.getAdditionalParameters().get("id_token")).map(Object::toString).orElse(null));
        user.setExpiresAt(Optional.ofNullable(oAuth2UserRequest.getAccessToken()).map(
                OAuth2AccessToken::getExpiresAt).orElse(null));

        // Ezt itt mi mokoltuk
        Token token = new Token();
        token.setUserid(oAuth2UserInfo.getId());
        token.setCreatedat(Instant.now());
        token.setExpriredat(Optional.ofNullable(oAuth2UserRequest.getAccessToken()).map(
                OAuth2AccessToken::getExpiresAt).orElse(null));
        token.setAccesstoken(Optional.ofNullable(oAuth2UserRequest.getAdditionalParameters().get("id_token")).map(Object::toString).orElse(null));
        token.setIsdeleted(false);

        //ezt itt elasticsearchbe mockoljuk bele
        Address address = new Address();
        UserElastic userElastic = new UserElastic();
        userElastic.setAddress(address);
        userElastic.setName(oAuth2UserInfo.getName());
        //Provider setup
        Provider provider = new Provider();
        if (AuthProvider.valueOf(oAuth2UserRequest.getClientRegistration().getRegistrationId()).toString().equalsIgnoreCase("google")) {
            provider.setProvider_type("google");
        }
        provider.setEmail(oAuth2UserInfo.getEmail());
        provider.setName(oAuth2UserInfo.getName());
        provider.setProfile_picture(oAuth2UserInfo.getImageUrl());
        provider.setProvider_id(oAuth2UserInfo.getId());
        userElastic.setProviders(provider);

        userElastic.setId(UUID.randomUUID());
        userElastic.setFollowers(new ArrayList<>());
        userElastic.setFollowed_by(new ArrayList<>());
        userElastic.setAccess_token(Optional.ofNullable(oAuth2UserRequest.getAdditionalParameters().get("id_token")).map(Object::toString).orElse(null));
        userElastic.setCreated_at(LocalDateTime.now());
        Instant instant=Optional.ofNullable(oAuth2UserRequest.getAccessToken()).map(
                OAuth2AccessToken::getExpiresAt).orElse(null);
        userElastic.setExpire_at(LocalDateTime.ofInstant(instant, ZoneOffset.of("+02:00")));
          userElastic.setUpdated_at(LocalDateTime.now());

        //TEST
       // userElastic.setFollowers(List.of(UUID.randomUUID(),UUID.randomUUID()));


        userElasticService.save(userElastic);
        tokenRepository.save(token);
        return userRepository.save(user);
    }

    private User updateExistingUser(User existingUser, OAuth2UserInfo oAuth2UserInfo) {
        existingUser.setName(oAuth2UserInfo.getName());
        existingUser.setImageUrl(oAuth2UserInfo.getImageUrl());
        return userRepository.save(existingUser);
    }

}