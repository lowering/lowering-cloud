package io.github.lowering.auth.security.endpoint;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class OAuth2Endpoint {

	@GetMapping("/me")
	public Principal me(Principal principal) {
		return principal;
	}

	@PostMapping("/logout")
	public ResponseEntity<Boolean> logout(){
		return ResponseEntity.ok(true);
	}

}
