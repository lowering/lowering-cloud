package io.github.lowering.account.security.service;

import com.mysql.fabric.xmlrpc.base.Array;
import io.github.lowering.account.domain.Authority;
import io.github.lowering.account.domain.Role;
import io.github.lowering.account.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.User;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.StringUtils;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;


@Service
public class UserDetailsServiceImpl implements UserDetailsService {

    @Autowired
    private UserService userService;

    @Override
    @Transactional(readOnly = true)
    public UserDetails loadUserByUsername(String username) throws UsernameNotFoundException {
        if (!StringUtils.hasLength(StringUtils.trimWhitespace(username))){
            throw new UsernameNotFoundException("用户不存在");
        }

        io.github.lowering.account.domain.User user = this.userService.findByUsername(username);
        if (user == null){
            throw new UsernameNotFoundException("用户不存在");
        }

        //get roles
        //构造用户数据

        //获取角色

        //获取权限
        Set<Role> roles = user.getRoles();

        User.UserBuilder builder = User.withUsername(user.getUsername()).password(user.getPassword());

        List<GrantedAuthority> constants = roles.stream().filter(role -> role.getEnabled()).collect(ArrayList::new,(list, item)->{
            SimpleGrantedAuthority role = new SimpleGrantedAuthority("ROLE_"+item.getConstant());
            list.add(role);
            //获取权限
            Set<Authority> authorities = item.getAuthorities();
            List<GrantedAuthority> as = authorities.stream().filter(authority -> authority.getEnabled()).collect(ArrayList::new,(lists,authority)->list.add(new SimpleGrantedAuthority(authority.getConstant())),(left,right)->left.addAll(right));
            list.addAll(as);
        },(left, right)->left.addAll(right));
        builder.authorities(constants);
        return builder.build();
    }
}
