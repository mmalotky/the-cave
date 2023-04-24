package dev10.caveServer.contoller;

import dev10.caveServer.security.JwtConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class AppUserController {

    @Autowired
    private final AuthenticationManager authenticationManager;
    private final JwtConverter jwtConverter;

    public AppUserController(AuthenticationManager authenticationManager, JwtConverter jwtConverter) {
        this.authenticationManager = authenticationManager;
        this.jwtConverter = jwtConverter;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(String username, String password) {
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }

    @PostMapping("/create_user")
    public ResponseEntity<?> createUser(String username, String password) {
        return new ResponseEntity<>(HttpStatus.ACCEPTED);
    }
}
