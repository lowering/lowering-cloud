package io.github.lowering.account.service.impl;


import io.github.lowering.account.domain.Organization;
import io.github.lowering.account.repository.OrganizationRepository;
import io.github.lowering.account.service.OrganizationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

@Service
@Transactional(readOnly = true)
public class OrganizationServiceImpl implements OrganizationService{

    @Autowired
    private OrganizationRepository organizationRepository;

    @Override
    public Iterable<Organization> findAll() {
        return organizationRepository.findAll();
    }

    @Override
    public Organization findOne(String id) {
        return organizationRepository.findOne(id);
    }

    @Override
    @Transactional(propagation = Propagation.REQUIRED, rollbackFor = Throwable.class)
    public Organization save(Organization organization) {
        return organizationRepository.save(organization);
    }
}
