package io.github.lowering.account.security.endpoint;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class OAuth2Endpoint {

	@GetMapping("/me")
	public Principal me(Principal principal) {
		return principal;
	}

}
