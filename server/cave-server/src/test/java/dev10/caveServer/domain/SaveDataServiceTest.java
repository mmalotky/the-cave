package dev10.caveServer.domain;

import dev10.caveServer.data.AppUserRepositoryDouble;
import dev10.caveServer.data.SaveDataRepositoryDouble;
import dev10.caveServer.models.SaveData;
import org.junit.jupiter.api.Test;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

import java.util.List;

import static org.junit.jupiter.api.Assertions.*;

class SaveDataServiceTest {

    private final SaveDataRepositoryDouble repository = new SaveDataRepositoryDouble();
    private final AppUserRepositoryDouble appUserRepository = new AppUserRepositoryDouble();
    private final AppUserService appUserService = new AppUserService(appUserRepository, new BCryptPasswordEncoder());
    private final SaveDataService service = new SaveDataService(appUserService, repository);


    @Test
    void shouldFindByUsername() {
        List<SaveData> result = service.findByUsername("test");
        assertNotNull(result);
        assertTrue(1 < result.size());
    }

    @Test
    void shouldNotFindMissingUsername() {
        List<SaveData> result = service.findByUsername("NotAUser");
        assertNull(result);
    }

    @Test
    void shouldNotFindUserWithNoSaves() {
        List<SaveData> result = service.findByUsername("admin");
        assertNotNull(result);
        assertEquals(0, result.size());
    }

    @Test
    void shouldCreateASave() {
        Result<SaveData> result = service.createSave(new SaveData("test", "new", "Test"));
        assertTrue(result.isSuccess());
        assertEquals(3, result.getPayload().getId());
    }

    @Test
    void shouldNotCreateSaveWithNulls() {
        Result<SaveData> result = service.createSave(new SaveData(null, "new", "Test"));
        assertFalse(result.isSuccess());

        Result<SaveData> result2 = service.createSave(new SaveData("test", null, "Test"));
        assertFalse(result2.isSuccess());

        Result<SaveData> result3 = service.createSave(new SaveData("test", "new", null));
        assertFalse(result3.isSuccess());
    }

    @Test
    void shouldNotCreateInvalidSave() {
        Result<SaveData> result = service.createSave(new SaveData(
                "Not a User",
                "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx",
                "Not a Level"
        ));
        assertFalse(result.isSuccess());
        assertEquals(3, result.getMessages().size());
    }
}