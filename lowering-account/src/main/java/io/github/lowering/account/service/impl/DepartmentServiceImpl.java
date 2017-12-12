package io.github.lowering.account.service.impl;

import io.github.lowering.account.domain.Department;
import io.github.lowering.account.repository.DepartmentRepository;
import io.github.lowering.account.service.DepartmentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class DepartmentServiceImpl implements DepartmentService {

    @Autowired
    private DepartmentRepository departmentRepository;

    @Override
    public Iterable<Department> findAll() {
        return departmentRepository.findAll();
    }

    @Override
    public Department findOne(String id) {
        return departmentRepository.findOne(id);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public Department save(Department department) {
        return departmentRepository.save(department);
    }
}
