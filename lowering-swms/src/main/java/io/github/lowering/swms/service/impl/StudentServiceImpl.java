package io.github.lowering.swms.service.impl;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import io.github.lowering.swms.domain.Student;
import io.github.lowering.swms.repository.StudentRepository;
import io.github.lowering.swms.service.StudentService;

@Service
@Transactional(readOnly = true)
public class StudentServiceImpl implements StudentService{

	@Autowired
	private StudentRepository studentRepository;

	@Override
	public List<Student> findAll() {
		return this.studentRepository.findAll();
	}
	
	
}
