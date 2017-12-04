package io.github.lowering.remote.provider;

import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/users")
@PreAuthorize("#oauth2.isOAuth()")
public class UserProvider {

    @PostMapping("/loadByUsername")
    public UserDetails loadByUsername(@RequestParam("username") String username){
        if (!StringUtils.hasLength(StringUtils.trimWhitespace(username))){
            return null;
        }
        return User.withUsername(username).password(username).roles(username.toUpperCase()).build();
    }
}
