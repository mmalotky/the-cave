package dev10.caveServer.contoller;

import dev10.caveServer.domain.AppUserService;
import dev10.caveServer.domain.Result;
import dev10.caveServer.models.AppUser;
import dev10.caveServer.security.JwtConverter;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.HashMap;
import java.util.Map;

@RestController
@RequestMapping("/api")
public class AppUserController {

    @Autowired
    private final AuthenticationManager authenticationManager;
    private final JwtConverter jwtConverter;

    private final AppUserService appUserService;

    public AppUserController(AuthenticationManager authenticationManager, JwtConverter jwtConverter, AppUserService appUserService) {
        this.authenticationManager = authenticationManager;
        this.jwtConverter = jwtConverter;
        this.appUserService = appUserService;
    }

    @PostMapping("/authenticate")
    public ResponseEntity<?> authenticate(@RequestBody Map<String, String> credentials) {
        try {
            UsernamePasswordAuthenticationToken authenticationToken =
                    new UsernamePasswordAuthenticationToken(credentials.get("username"), credentials.get("password"));

            Authentication authentication = authenticationManager.authenticate(authenticationToken);

            if (authentication.isAuthenticated()) {
                String jwtToken = jwtConverter.getTokenFromUser((UserDetails) authentication.getPrincipal());

                HashMap<String, String> map = new HashMap<>();
                map.put("jwt_token", jwtToken);

                return new ResponseEntity<>(map, HttpStatus.OK);
            }
        } catch (AuthenticationException ex) {
            System.out.println(ex.getMessage());
        }
        return new ResponseEntity<>(HttpStatus.FORBIDDEN);
    }

    @PostMapping("/create_user")
    public ResponseEntity<?> createUser(@RequestBody Map<String, String> credentials) {
        String username = credentials.get("username");
        String password = credentials.get("password");

        Result<AppUser> result = appUserService.create(username, password);

        if (!result.isSuccess()) {
            return new ResponseEntity<>(result.getMessages(), HttpStatus.BAD_REQUEST);
        }
        HashMap<String, Integer> map = new HashMap<>();
        map.put("appUserId", result.getPayload().getId());

        return new ResponseEntity<>(map, HttpStatus.CREATED);

    }
}
