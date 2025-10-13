package org.tech.repo;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;
import org.springframework.stereotype.Repository;
import org.tech.model.Employee;

@Repository
public class EmployeeRepo {

    @Autowired
    private JdbcTemplate jdbcTemplate;

    // Save employee
    public boolean saveEmployee(Employee employee) {
        String sql = "INSERT INTO employee (id, name, salary) VALUES (?, ?, ?)";
        return jdbcTemplate.update(sql, employee.getId(), employee.getName(), employee.getSalary()) > 0;
    }

    // Get all employees
    public List<Employee> getEmployee() {
        String sql = "SELECT * FROM employee";
        return jdbcTemplate.query(sql, new RowMapper<Employee>() {
            @Override
            public Employee mapRow(ResultSet rs, int rowNum) throws SQLException {
                Employee emp = new Employee();
                emp.setId(rs.getInt("id"));
                emp.setName(rs.getString("name"));
                emp.setSalary(rs.getInt("salary"));
                return emp;
            }
        });
    }

    // Get employee by ID
    public Employee getEmployeeById(int id) {
        String sql = "SELECT * FROM employee WHERE id = ? LIMIT 1";
        return jdbcTemplate.queryForObject(sql, new RowMapper<Employee>() {
            @Override
            public Employee mapRow(ResultSet rs, int rowNum) throws SQLException {
                Employee emp = new Employee();
                emp.setId(rs.getInt("id"));
                emp.setName(rs.getString("name"));
                emp.setSalary(rs.getInt("salary"));
                return emp;
            }
        }, id);
    }

    // Update employee
    public void updateEmployee(Employee employee) {
        String sql = "UPDATE employee SET name=?, salary=? WHERE id=?";
        jdbcTemplate.update(sql, employee.getName(), employee.getSalary(), employee.getId());
    }

    // Delete employee
    public void deleteEmployee(int id) {
        String sql = "DELETE FROM employee WHERE id=?";
        jdbcTemplate.update(sql, id);
    }
}
