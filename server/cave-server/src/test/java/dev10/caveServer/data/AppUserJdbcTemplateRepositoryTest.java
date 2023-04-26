package dev10.caveServer.data;

import dev10.caveServer.models.AppUser;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.ArrayList;
import java.util.List;

import static org.junit.jupiter.api.Assertions.*;


@SpringBootTest
class AppUserJdbcTemplateRepositoryTest {

    @Autowired
    AppUserJdbcTemplateRepository repository;

    @Autowired
    JdbcTemplate jdbcTemplate;

    static boolean hasRun = false;

    @BeforeEach
    void setup(){
        if(!hasRun){
            hasRun = true;
            jdbcTemplate.update("call set_known_good_state();");
        }
    }

    @Test
    void shouldCreate() {
        List<String> roles = new ArrayList<>();
        roles.add("USER");
        AppUser user = new AppUser(
                "test2",
                "$2a$10$O62QNAVUXhWangiXFqTtDuXBlP9ObEZ6w7y1xnlEOA1ywB7dbQvPK",
                true,
                roles
        );
        AppUser actual = repository.create(user);
        assertNotNull(actual);
        assertEquals("test2", actual.getUsername());
        assertEquals(3, actual.getId());
        assertEquals("ROLE_USER", String.valueOf(actual.getAuthorities().stream().findFirst().orElse(null)));
    }

    @Test
    void shouldFindByUsername() {
        AppUser user = repository.findByUsername("admin");
        assertNotNull(user);
        assertEquals("admin", user.getUsername());
    }

    @Test
    void shouldNotFindMissing() {
        AppUser user = repository.findByUsername("not a user");
        assertNull(user);
    }
}