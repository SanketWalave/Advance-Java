package org.tech.repo;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.tech.model.Player;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

@Repository
public class PlayerRepo {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    public List<Player> getPlayers() {
        String sql = "SELECT * FROM player";

        return jdbcTemplate.query(sql, new RowMapper<Player>() {
            @Override
            public Player mapRow(ResultSet rs, int rowNum) throws SQLException {
                Player p = new Player();
                p.setId(rs.getInt("id"));
                p.setName(rs.getString("name"));
                p.setRuns(rs.getInt("runs")); // ✅ Column name must match DB
                return p;
            }
        });
    }

    public void savePlayer(Player player) {
        // Use NULL instead of '0' for auto-increment id
        String sql = "INSERT INTO player (id, name, runs) VALUES (NULL, ?, ?)";
        jdbcTemplate.update(sql, player.getName(), player.getRuns());
    }
    public void deletePlayer(int id) {
    	String sql="delete from player where id=?";
    	jdbcTemplate.update(sql,id);
    }
    public Player getPlayerById(int id) {
        String sql = "SELECT * FROM player WHERE id = ?";

        return jdbcTemplate.queryForObject(sql, new Object[]{id}, (rs, rowNum) -> {
            Player p = new Player();
            p.setId(rs.getInt("id"));
            p.setName(rs.getString("name"));
            p.setRuns(rs.getInt("runs")); // Column name matches DB
            return p;
        });
    }
    
    public void updatePlayer(Player player) {
    	String sql="update player set name=?,runs=? where id=?";
    	jdbcTemplate.update(sql,player.getName(),player.getRuns(),player.getId());
    }

    public List<Player> searchPlayer(String skey) {
        String sql = "SELECT * FROM player WHERE name LIKE ?";
        String searchKey = "%" + skey + "%"; // add wildcards

        return jdbcTemplate.query(sql, new Object[]{searchKey}, (rs, rowNum) -> {
            Player p = new Player();
            p.setId(rs.getInt("id"));
            p.setName(rs.getString("name"));
            p.setRuns(rs.getInt("runs"));
            return p;
        });
    }



}
