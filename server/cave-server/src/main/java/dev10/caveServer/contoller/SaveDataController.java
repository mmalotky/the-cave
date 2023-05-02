package dev10.caveServer.contoller;

import dev10.caveServer.domain.Result;
import dev10.caveServer.domain.SaveDataService;
import dev10.caveServer.models.SaveData;
import dev10.caveServer.security.JwtConverter;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Objects;

@RestController
@RequestMapping("/api/save")
public class SaveDataController {
    private final SaveDataService service;
    private final JwtConverter jwtConverter;

    public SaveDataController(SaveDataService service, JwtConverter jwtConverter) {
        this.service = service;
        this.jwtConverter = jwtConverter;
    }

    @GetMapping
    public ResponseEntity<?> findByUsername(@RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        UserDetails user = jwtConverter.getUserFromToken(token);
        String username = user.getUsername();
        List<SaveData> data = service.findByUsername(username);
        if(data == null) {
            return new ResponseEntity<>(List.of(username + "not found."), HttpStatus.FORBIDDEN);
        }
        else return new ResponseEntity<>(data, HttpStatus.OK);
    }

    @PostMapping
    public ResponseEntity<?> createSave(@RequestBody SaveData saveData, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        UserDetails user = jwtConverter.getUserFromToken(token);
        String username = user.getUsername();

        if(!Objects.equals(username, saveData.getUser())) {
            return new ResponseEntity<>(List.of("Username must match the save data"), HttpStatus.FORBIDDEN);
        }

        Result<SaveData> result = service.createSave(saveData);

        if(result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.CREATED);
        }
        else {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }
    }

    @PutMapping
    public ResponseEntity<?> updateSave(@RequestBody SaveData saveData, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        UserDetails user = jwtConverter.getUserFromToken(token);
        String username = user.getUsername();

        if(!Objects.equals(username, saveData.getUser()) || !service.checkId(username, saveData.getId())) {
            return new ResponseEntity<>(List.of("Username must match the save data"), HttpStatus.FORBIDDEN);
        }

        Result<SaveData> result = service.updateSave(saveData);

        if(result.isSuccess()) {
            return new ResponseEntity<>(result.getPayload(), HttpStatus.ACCEPTED);
        }
        else {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteSave(@RequestBody SaveData saveData, @RequestHeader(HttpHeaders.AUTHORIZATION) String token) {
        UserDetails user = jwtConverter.getUserFromToken(token);
        String username = user.getUsername();

        if(!Objects.equals(username, saveData.getUser()) || !service.checkId(username, saveData.getId())) {
            return new ResponseEntity<>(List.of("Username must match the save data"), HttpStatus.FORBIDDEN);
        }

        Result<Void> result = service.deleteSave(saveData.getId());

        if(result.isSuccess()) {
            return new ResponseEntity<>(HttpStatus.NO_CONTENT);
        }
        else {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }
    }
}
