package io.github.lowering.account.repository;

import io.github.lowering.account.domain.Authority;
import org.springframework.data.repository.CrudRepository;

public interface AuthorityRepository extends CrudRepository<Authority,String> {
}
