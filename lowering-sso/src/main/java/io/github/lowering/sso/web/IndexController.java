package io.github.lowering.sso.web;

import io.github.lowering.common.oauth.event.OAuth2SsoApplicationEvent;
import io.github.lowering.sso.remote.consumer.AccountConsumer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

import java.security.Principal;

@Controller
public class IndexController {

    private ApplicationContext applicationContext;

    @Autowired
    private AccountConsumer accountConsumer;

    public IndexController(ApplicationContext applicationContext){
        this.applicationContext = applicationContext;
    }

    @GetMapping("/oauth/logout")
    public void logout(Principal principal){
        this.applicationContext.publishEvent(new OAuth2SsoApplicationEvent(principal,this.applicationContext.getId()));
    }

    @GetMapping("test")
    public void test(){
        System.out.println(accountConsumer.loadByUsername("zhangsan"));
    }
}
