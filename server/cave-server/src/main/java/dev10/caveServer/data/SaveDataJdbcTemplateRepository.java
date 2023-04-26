package dev10.caveServer.data;

import dev10.caveServer.models.SaveData;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.support.GeneratedKeyHolder;
import org.springframework.stereotype.Repository;

import java.sql.PreparedStatement;
import java.sql.Statement;
import java.util.List;

@Repository
public class SaveDataJdbcTemplateRepository implements SaveDataRepository {
    private final JdbcTemplate jdbcTemplate;

    public SaveDataJdbcTemplateRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    @Override
    public List<SaveData> getSaveDataByUsername(String username) {
        final String sql = """
                SELECT save_id, au.username, save_name, ld.level_name from save_data sd
                inner join app_user au on sd.user_id = au.user_id
                inner join level_data ld on sd.level_id = ld.level_id
                where au.username = ?;
                """;

        return jdbcTemplate.query(sql, new SaveDataMapper(), username);
    }

    @Override
    public SaveData createSave(SaveData saveData) {
        final String sql = """
                INSERT into save_data(user_id, save_name, level_id) values
                    ((SELECT user_id from app_user where username = ?),
                     ?,
                     (SELECT level_id from level_data where level_name = ?));
                """;

        GeneratedKeyHolder keyHolder = new GeneratedKeyHolder();
        int rowsAffected = jdbcTemplate.update(con -> {
            PreparedStatement ps = con.prepareStatement(sql, Statement.RETURN_GENERATED_KEYS);
            ps.setString(1, saveData.getUser());
            ps.setString(2, saveData.getSaveName());
            ps.setString(3, saveData.getLevel());
            return ps;
        }, keyHolder);

        if(rowsAffected <= 0) {
            return null;
        }

        saveData.setId(keyHolder.getKey().intValue());
        return saveData;
    }

    @Override
    public boolean updateSave(SaveData saveData) {
        final String sql = """
                UPDATE save_data
                set save_name = ?, level_id = (SELECT level_id from level_data where level_name = ?)
                where save_id = ?;
                """;

        int rowsAffected = jdbcTemplate.update(sql, saveData.getSaveName(), saveData.getLevel(), saveData.getId());
        return rowsAffected > 0;
    }

    @Override
    public boolean deleteSave(int saveId) {
        final String sql = """
                DELETE from save_data
                where save_id = ?;
                """;

        int rowsAffected = jdbcTemplate.update(sql, saveId);
        return rowsAffected > 0;
    }

    @Override
    public List<String> getLevels() {
        final String sql = "SELECT level_name from level_data;";
        return jdbcTemplate.query(sql, (rs, rowNum) -> rs.getString("level_name"));
    }
}
