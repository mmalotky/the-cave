package dev10.caveServer.data;

import dev10.caveServer.models.AppUser;
import org.springframework.transaction.annotation.Transactional;

public interface AppUserRepository {
    @Transactional
    AppUser create(AppUser appUser);

    @Transactional
    AppUser findByUsername(String username);
}
