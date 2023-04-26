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

    @Test
    void shouldUpdate() {
        boolean result = repository.updateSave(new SaveData(1, "test", "test123", "Test2"));
        assertTrue(result);
        SaveData actual = repository.getSaveDataByUsername("test").get(0);
        assertEquals("test123", actual.getSaveName());
        assertEquals("Test2", actual.getLevel());
    }

    @Test
    void shouldNotUpdateMissingSave() {
        boolean result = repository.updateSave(new SaveData(999, "test", "test123", "Test2"));
        assertFalse(result);
    }

    @Test
    void shouldDelete() {
        boolean result = repository.deleteSave(2);
        assertTrue(result);
    }

    @Test
    void shouldNotDeleteMissing() {
        boolean result = repository.deleteSave(999);
        assertFalse(result);
    }

}