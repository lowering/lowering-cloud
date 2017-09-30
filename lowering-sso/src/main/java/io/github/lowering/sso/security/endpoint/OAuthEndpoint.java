package io.github.lowering.sso.security.endpoint;

import java.security.Principal;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class OAuthEndpoint {

	@GetMapping("/me")
	public Principal me(Principal principal) {
		return principal;
	}
}
