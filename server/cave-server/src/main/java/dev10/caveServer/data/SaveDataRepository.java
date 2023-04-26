package dev10.caveServer.data;

import dev10.caveServer.models.SaveData;

import java.util.List;

public interface SaveDataRepository {
    List<SaveData> getSaveDataByUsername(String username);

    SaveData createSave(SaveData saveData);

    boolean updateSave(SaveData saveData);

    boolean deleteSave(int saveId);

    List<String> getLevels();
}
