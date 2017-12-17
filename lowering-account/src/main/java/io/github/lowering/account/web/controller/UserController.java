package io.github.lowering.account.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import io.github.lowering.account.domain.User;
import io.github.lowering.account.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;


@Validated
@RestController
@RequestMapping("/users")
public class UserController {

    @Autowired
    private UserService userService;

    @GetMapping
    @JsonView(User.WithoutPasswordJView.class)
    public Iterable<User> index(@RequestParam(name = "page",defaultValue = "1") int page,@RequestParam(name = "size",defaultValue = "20") int size){
        return this.userService.findAll();
    }

    @PostMapping
    public void save(@Validated @RequestBody User user){
        System.out.println(user);
        this.userService.save(user);
    }

}
