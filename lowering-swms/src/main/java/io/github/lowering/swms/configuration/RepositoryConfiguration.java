package io.github.lowering.swms.configuration;

import org.springframework.context.annotation.ComponentScan;
import org.springframework.context.annotation.Configuration;
import org.springframework.context.annotation.FilterType;
import org.springframework.data.jpa.repository.config.EnableJpaRepositories;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.EnableTransactionManagement;

import io.github.lowering.swms.Application;

@Configuration
@EnableJpaRepositories(
	basePackageClasses = {Application.class},
	includeFilters = {
		@ComponentScan.Filter(
			type = FilterType.ANNOTATION,
			value=Repository.class
		)
	}
		
)
@EnableTransactionManagement
public class RepositoryConfiguration {

}
