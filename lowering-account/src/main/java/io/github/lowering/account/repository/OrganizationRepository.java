package io.github.lowering.account.repository;

import io.github.lowering.account.domain.Organization;
import org.springframework.data.repository.CrudRepository;

public interface OrganizationRepository extends CrudRepository<Organization,String> {
}
