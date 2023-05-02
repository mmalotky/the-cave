package dev10.caveServer.data;

import dev10.caveServer.models.SaveData;
import org.springframework.jdbc.core.RowMapper;

import java.sql.ResultSet;
import java.sql.SQLException;

public class SaveDataMapper implements RowMapper<SaveData> {
    @Override
    public SaveData mapRow(ResultSet rs, int rowNum) throws SQLException {
        return new SaveData(
                rs.getInt("save_id"),
                rs.getString("username"),
                rs.getTimestamp("save_date"),
                rs.getString("save_name"),
                rs.getString("level_name")
        );
    }
}
