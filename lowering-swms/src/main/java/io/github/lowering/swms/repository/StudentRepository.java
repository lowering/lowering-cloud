package io.github.lowering.swms.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import io.github.lowering.swms.domain.Student;

@Repository
public interface StudentRepository extends JpaRepository<Student, String>{

	
}
