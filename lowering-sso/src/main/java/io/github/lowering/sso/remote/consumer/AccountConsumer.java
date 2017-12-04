package io.github.lowering.sso.remote.consumer;

import io.github.lowering.sso.security.domain.User;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient("lowering-account")
public interface AccountConsumer {

    @RequestMapping(value = "/account/users/loadByUsername",method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    User loadByUsername(@RequestParam("username") String username);
}
