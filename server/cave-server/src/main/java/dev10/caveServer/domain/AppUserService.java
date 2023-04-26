package dev10.caveServer.domain;

import dev10.caveServer.data.AppUserRepository;
import dev10.caveServer.models.AppUser;
import org.springframework.dao.DuplicateKeyException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AppUserService implements UserDetailsService {

    private final AppUserRepository appUserRepository;
    private final PasswordEncoder encoder;

    public AppUserService(AppUserRepository appUserRepository, PasswordEncoder encoder){
        this.appUserRepository = appUserRepository;
        this.encoder = encoder;
    }

    public Result<AppUser> create(String username, String password) {
        Result<AppUser> result = validate(username, password);

        if (!result.isSuccess()) {
            return result;
        }

        password = encoder.encode(password);

        AppUser appUser = new AppUser(0, username, password, true, List.of("USER"));

        try {
            appUser = appUserRepository.create(appUser);
            result.setPayload(appUser);
        } catch (DuplicateKeyException ex) {
            result.addMessage(username + " is taken");
        }
        return result;
    }

    private Result<AppUser> validate(String username, String password) {
        Result<AppUser> result = new Result<>();
        if (username == null || username.isBlank()) {
            result.addMessage("username is required");
            return result;
        }

        if (password == null || password.isBlank()) {
            result.addMessage("password is required");
            return result;
        }

        if (username.length() > 40) {
            result.addMessage("username must be less than 40 characters");
        }
        return result;
    }

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        AppUser appUser = appUserRepository.findByUsername(username);

        if (appUser == null || !appUser.isEnabled()) {
            throw new UsernameNotFoundException(username + " not found");
        }
        return appUser;
    }
}
