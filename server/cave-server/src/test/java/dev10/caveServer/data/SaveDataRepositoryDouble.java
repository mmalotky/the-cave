package dev10.caveServer.data;

import dev10.caveServer.models.SaveData;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

public class SaveDataRepositoryDouble implements SaveDataRepository {
    @Override
    public List<SaveData> getSaveDataByUsername(String username) {
        if(Objects.equals(username, "test")) {
            return List.of(
                    new SaveData(1, "test", "test", "Test"),
                    new SaveData(2, "test", "testing", "Test2")
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
        return false;
    }

    @Override
    public boolean deleteSave(int saveId) {
        return false;
    }

    @Override
    public List<String> getLevels() {
        return List.of("Test", "Test2");
    }
}
