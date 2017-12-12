package io.github.lowering.account.service;


import io.github.lowering.account.domain.Organization;

public interface OrganizationService {

    Iterable<Organization> findAll();
    Organization findOne(String id);
    Organization save(Organization organization);

}
