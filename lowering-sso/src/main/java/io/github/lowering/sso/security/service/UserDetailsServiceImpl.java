package io.github.lowering.sso.security.service;

import io.github.lowering.sso.remote.consumer.AccountConsumer;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class UserDetailsServiceImpl implements UserDetailsService {
    @Autowired
    private AccountConsumer accountConsumer;

    @Override
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        UserDetails userDetails = this.accountConsumer.loadByUsername(username);
        return Optional.ofNullable(userDetails).orElseThrow(()->new UsernameNotFoundException(String.format("[%s]不存在",username)));
    }
}
