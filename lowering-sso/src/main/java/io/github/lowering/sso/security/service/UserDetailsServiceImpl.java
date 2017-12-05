package io.github.lowering.sso.security.service;

import io.github.lowering.common.dto.Principal;
import io.github.lowering.sso.remote.consumer.AccountConsumer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.Objects;
import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private AccountConsumer accountConsumer;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        Principal principal = this.accountConsumer.loadByUsername(username);
        if (Objects.isNull(principal)){
            throw  new UsernameNotFoundException(String.format("[%s]不存在",username));
        }
        return principal.getUserDetails();
    }
}
