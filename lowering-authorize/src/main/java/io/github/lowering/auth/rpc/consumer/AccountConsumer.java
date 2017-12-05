package io.github.lowering.auth.rpc.consumer;

import io.github.lowering.auth.rpc.consumer.impl.AccountConsumerImpl;
import io.github.lowering.common.dto.Principal;
import org.springframework.cloud.netflix.feign.FeignClient;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "lowering-account",fallback = AccountConsumerImpl.class)
public interface AccountConsumer {

    @RequestMapping(value = "/account/users/loadByUsername",method = RequestMethod.POST,consumes = MediaType.APPLICATION_JSON_UTF8_VALUE)
    Principal loadByUsername(@RequestParam("username") String username);
}
