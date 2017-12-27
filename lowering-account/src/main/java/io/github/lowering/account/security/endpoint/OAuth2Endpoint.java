package io.github.lowering.account.security.endpoint;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.token.TokenService;
import org.springframework.security.oauth2.provider.OAuth2Authentication;
import org.springframework.security.oauth2.provider.authentication.OAuth2AuthenticationDetails;
import org.springframework.security.oauth2.provider.endpoint.FrameworkEndpoint;
import org.springframework.security.oauth2.provider.token.ConsumerTokenServices;
import org.springframework.security.oauth2.provider.token.ResourceServerTokenServices;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.Collections;
import java.util.Map;

@RestController
public class OAuth2Endpoint {

	@Autowired
	private ConsumerTokenServices consumerTokenServices;

	@GetMapping("/oauth/me")
	public Principal me(Principal principal) {
		return principal;
	}

	@GetMapping("/oauth/logout")
	public Map<String,Object> logout(Principal principal) {
		if (principal instanceof OAuth2Authentication){
			OAuth2Authentication authentication = OAuth2Authentication.class.cast(principal);
			Object details = authentication.getDetails();
			if (details instanceof OAuth2AuthenticationDetails){
				consumerTokenServices.revokeToken(OAuth2AuthenticationDetails.class.cast(details).getTokenValue());
			}
		}
		return Collections.singletonMap("status",100200);
	}

}
