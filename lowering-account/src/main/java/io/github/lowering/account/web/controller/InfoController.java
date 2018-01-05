package io.github.lowering.account.web.controller;

import io.github.lowering.account.domain.Authority;
import io.github.lowering.account.domain.Menu;
import io.github.lowering.account.domain.User;
import io.github.lowering.account.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/me")
public class InfoController {

    @Autowired
    private UserService userService;

    @GetMapping
    public Map<String,Object> me(Principal principal){
        if (principal == null){
            return null;
        }
        Map<String,Object> me = new HashMap<>();
        String username = principal.getName();
        User user = this.userService.findByUsername(username);
        me.put("username",user.getUsername());
        return me;
    }

    @GetMapping("/menus")
    public List<Menu> getOwnerMenu(Principal principal){

        return null;
    }
    @GetMapping("/authorities")
    public List<Authority> getOwnerAuthority(Principal principal){

        return null;
    }

    @GetMapping("/routes")
    public List<Map<String,String>> getOwnerRoutes(Principal principal){

        return null;
    }
}
