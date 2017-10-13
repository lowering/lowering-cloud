package io.github.lowering.sso.web;

import io.github.lowering.common.oauth.event.OAuth2SsoApplicationEvent;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class IndexController {

    private ApplicationContext applicationContext;

    public IndexController(ApplicationContext applicationContext){
        this.applicationContext = applicationContext;
    }

    @GetMapping("/oauth/logout")
    public void logout(Principal principal){
        this.applicationContext.publishEvent(new OAuth2SsoApplicationEvent(principal,this.applicationContext.getId()));
    }
}
