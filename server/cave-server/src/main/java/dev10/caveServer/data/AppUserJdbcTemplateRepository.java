package dev10.caveServer.data;

import dev10.caveServer.models.AppUser;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class AppUserJdbcTemplateRepository implements AppUserRepository {
    private final JdbcTemplate jdbcTemplate;

    public AppUserJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    @Transactional
    public AppUser create(AppUser appUser) {
        final String sql = "INSERT into app_user(username, password_hash, role_id) " +
                "values (?, ?, (SELECT role_id from `role` where `name` = ?));";

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, appUser.getUsername());
            ps.setString(2, appUser.getPassword());
            ps.setString(3, appUser.getAuthorities().stream()
                    .findFirst().orElse(null).toString().substring(5));
            return ps;
        }, keyHolder);

        if(rowsAffected <= 0) {
            return null;
        }

        appUser.setId(keyHolder.getKey().intValue());
        return appUser;
    }

    @Override
    @Transactional
    public AppUser findByUsername(String username) {
        List<String> roles = getRolesByUsername(username);

        final String sql = """
                SELECT user_id, username, password_hash, enabled
                from app_user
                where username = ?;
                """;

        return jdbcTemplate.query(sql, new AppUserMapper(roles), username).stream().findFirst().orElse(null);
    }

    private List<String> getRolesByUsername(String username){
        final String sql = """
                SELECT `name`
                from `role`
                join app_user au on role.role_id = au.role_id
                where username = ?
                """;
        return jdbcTemplate.query(sql, (rs, rowId) -> rs.getString("name"), username);
    }
}
