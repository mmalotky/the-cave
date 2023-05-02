package dev10.caveServer.data;

import dev10.caveServer.models.SaveData;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class SaveDataRepositoryDouble implements SaveDataRepository {
    @Override
    public List<SaveData> getSaveDataByUsername(String username) {
        if(Objects.equals(username, "test")) {
            return List.of(
                    new SaveData(1, "test", Timestamp.valueOf(LocalDateTime.now()), "test", "Test"),
                    new SaveData(2, "test", Timestamp.valueOf(LocalDateTime.now()), "testing", "Test2")
            );
        }
        return new ArrayList<>();
    }

    @Override
    public SaveData createSave(SaveData saveData) {
        saveData.setId(3);
        return saveData;
    }

    @Override
    public boolean updateSave(SaveData saveData) {
        return true;
    }

    @Override
    public boolean deleteSave(int saveId) {
        return saveId == 1 || saveId == 2;
    }

    @Override
    public List<String> getLevels() {
        return List.of("Test", "Test2");
    }
}
