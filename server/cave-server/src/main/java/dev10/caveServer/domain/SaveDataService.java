package dev10.caveServer.domain;

import dev10.caveServer.data.SaveDataRepository;
import dev10.caveServer.models.SaveData;
import org.springframework.security.core.userdetails.UserDetails;
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
        if(!checkUsername(username)) {
            return null;
        }
        return repository.getSaveDataByUsername(username);
    }

    public Result<SaveData> createSave(SaveData saveData) {
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
