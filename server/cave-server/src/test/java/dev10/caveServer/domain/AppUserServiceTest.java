package dev10.caveServer.domain;

import dev10.caveServer.data.AppUserRepository;
import dev10.caveServer.data.AppUserRepositoryDouble;
import dev10.caveServer.models.AppUser;
import org.junit.jupiter.api.Test;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class AppUserServiceTest {

    AppUserRepository repository = new AppUserRepositoryDouble();
    AppUserService service = new AppUserService(repository, new BCryptPasswordEncoder());


    @Test
    void shouldFindByUsername() {
        List<String> userRole = new ArrayList<>();
        userRole.add("USER");
        AppUser expected = new AppUser("test","$2a$10$7JquBL6mi2OO85djCq4jUecR/aKurpmW8Niv1ohxNtoJdoNZPrcKK", true, userRole);
        AppUser actual = (AppUser) service.loadUserByUsername("test");
        assertEquals(expected.getUsername(), actual.getUsername());
    }

    @Test
    void shouldNotFindMissing() {
        try {
            AppUser actual = (AppUser) service.loadUserByUsername("missing");
        } catch (UsernameNotFoundException e) {
            assertEquals("missing not found", e.getMessage());
        }
    }

    @Test
    void shouldNotFindNull() {
        try {
            AppUser actual = (AppUser) service.loadUserByUsername(null);
        } catch (UsernameNotFoundException e) {
            assertEquals("null not found", e.getMessage());
        }
    }

    @Test
    void shouldCreate(){
        List<String> roles = new ArrayList<>();
        roles.add("USER");
        AppUser expected = new AppUser(
                3,
                "test2",
                "[this value is random]",
                true,
                roles
        );
        Result<AppUser> result = service.create("test2", "test2");

        assertTrue(result.isSuccess());
        assertEquals(expected.getId(), result.getPayload().getId());
        assertEquals(expected.isEnabled(), result.getPayload().isEnabled());
        assertEquals(expected.getAuthorities(), result.getPayload().getAuthorities());
    }

    @Test
    void shouldNotCreateNull(){
        Result<AppUser> result = service.create(null, "$2a$10$O62QNAVUXhWangiXFqTtDuXBlP9ObEZ6w7y1xnlEOA1ywB7dbQvPK");
        assertFalse(result.isSuccess());

        Result<AppUser> result2 = service.create("test2", null);
        assertFalse(result2.isSuccess());
    }

    @Test
    void shouldNotCreateInvalid() {
        Result<AppUser> result = service.create("a".repeat(101), "test");
        assertFalse(result.isSuccess());

        Result<AppUser> result2 = service.create("", "$2a$10$O62QNAVUXhWangiXFqTtDuXBlP9ObEZ6w7y1xnlEOA1ywB7dbQvPK");
        assertFalse(result2.isSuccess());

        Result<AppUser> result3 = service.create("test2", "");
        assertFalse(result3.isSuccess());
    }

    @Test
    void shouldNotCreateDuplicateUsername() {
        Result<AppUser> result = service.create("test", "test2");
        assertFalse(result.isSuccess());
    }

    @Test
    void shouldNotCreateUsername40Characters() {
        Result<AppUser> result = service.create("Extra-Supercalifragelisticexpialadocious!", "test2");
        assertFalse(result.isSuccess());
    }
}