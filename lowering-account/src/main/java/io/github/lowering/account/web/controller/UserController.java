package io.github.lowering.account.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import io.github.lowering.account.domain.User;
import io.github.lowering.account.service.UserService;
import io.github.lowering.common.constant.Permissions;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @JsonView(User.WithoutPasswordJView.class)
    public Iterable<User> index(){
        List<User> users = new ArrayList<>();
        this.userService.findAll().forEach(user -> users.add(user));
        return this.userService.findAll();
    }

    @PostMapping
    public void save(@RequestBody User user){
        System.out.println(user);
        this.userService.save(user);
    }

}
