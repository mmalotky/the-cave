package dev10.caveServer.data;

import dev10.caveServer.models.SaveData;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.jdbc.core.JdbcTemplate;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

@SpringBootTest
class SaveDataJdbcTemplateRepositoryTest {

    @Autowired
    SaveDataJdbcTemplateRepository repository;

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
    void shouldFindSavesByUser() {
        List<SaveData> result = repository.getSaveDataByUsername("test");
        assertNotNull(result);
        assertTrue(1 < result.size());
        assertEquals("test", result.get(0).getSaveName());
    }

    @Test
    void shouldNotFindUserWithNoSaves() {
        List<SaveData> result = repository.getSaveDataByUsername("admin");
        assertNotNull(result);
        assertEquals(0, result.size());
    }

    @Test
    void shouldNotFindMissingUser() {
        List<SaveData> result = repository.getSaveDataByUsername("notAUser");
        assertNotNull(result);
        assertEquals(0, result.size());
    }

    @Test
    void shouldCreateASave() {
        SaveData result = repository.createSave(new SaveData("test", "testing", "Test"));
        assertNotNull(result);
    }

}