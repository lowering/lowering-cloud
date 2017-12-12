package io.github.lowering.account.repository;

import io.github.lowering.account.domain.Employee;
import org.springframework.data.repository.CrudRepository;

public interface EmployeeRepository extends CrudRepository<Employee,String> {
}
