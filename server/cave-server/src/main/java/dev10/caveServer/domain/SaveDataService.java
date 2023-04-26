package dev10.caveServer.domain;

import dev10.caveServer.data.SaveDataRepository;
import dev10.caveServer.models.SaveData;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SaveDataService {
    private final AppUserService appUserService;
    private final SaveDataRepository repository;

    public SaveDataService(AppUserService appUserService, SaveDataRepository repository) {
        this.appUserService = appUserService;
        this.repository = repository;
    }

    public List<SaveData> findByUsername(String username) {
        if(username == null || !checkUsername(username)) {
            return null;
        }
        return repository.getSaveDataByUsername(username);
    }

    public Result<SaveData> createSave(SaveData saveData) {
        if(saveData == null) {
            Result<SaveData> result = new Result<>();
            result.addMessage("Save data is null.");
            return result;
        }

        Result<SaveData> result = validate(saveData);
        if(!result.isSuccess()) {
            return result;
        }
        SaveData save = repository.createSave(saveData);
        if(save != null) {
            result.setPayload(save);
        } else {
            result.addMessage("Failed to save.");
        }
        return result;
    }

    public Result<SaveData> updateSave(SaveData saveData) {
        if(saveData == null) {
            Result<SaveData> result = new Result<>();
            result.addMessage("Save data is null.");
            return result;
        }

        Result<SaveData> result = validate(saveData);
        if(saveData.getId() == 0) {
            result.addMessage("Save ID is required.");
        }

        if(!result.isSuccess()) {
            return result;
        }
        boolean updated = repository.updateSave(saveData);
        if(updated) {
            result.setPayload(saveData);
        } else {
            result.addMessage("Failed to update.");
        }
        return result;
    }

    public Result<Void> deleteSave(int saveId) {
        Result<Void> result = new Result<>();
        boolean deleted = repository.deleteSave(saveId);
        if(!deleted) {
            result.addMessage("Failed to delete.");
        }
        return result;
    }

    private boolean checkUsername(String username) {
        try {
            appUserService.loadUserByUsername(username);
            return true;
        } catch (UsernameNotFoundException e) {
            return false;
        }
    }

    private Result<SaveData> validate(SaveData saveData) {
        Result<SaveData> result = new Result<>();
        if(saveData.getUser() == null || saveData.getLevel() == null || saveData.getSaveName() == null) {
            result.addMessage("Save data has null fields.");
            return result;
        }

        if(!checkUsername(saveData.getUser())) {
            result.addMessage(saveData.getUser() + "is not a registered user.");
        }

        if(!repository.getLevels().contains(saveData.getLevel())) {
            result.addMessage(saveData.getLevel() + " not found.");
        }

        if(saveData.getSaveName().isBlank() || saveData.getSaveName().length() > 100) {
            result.addMessage(saveData.getSaveName().length() == 0 ? "Save Name is required." : "Save name may not exceed 100 characters.");
        }

        return result;
    }
}
