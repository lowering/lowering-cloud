package io.github.lowering.account.web.controller;

import com.fasterxml.jackson.annotation.JsonView;
import io.github.lowering.account.domain.User;
import io.github.lowering.account.service.UserService;
import io.github.lowering.core.result.CommonResult;
import io.github.lowering.core.result.ErrorResult;
import io.github.lowering.core.result.Result;
import io.github.lowering.core.result.ValidationResult;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.validation.BindingResult;
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
    public Result save(@Validated @RequestBody User user, BindingResult error){
        if (error.hasErrors()){
            ValidationResult result = new ValidationResult(100400,"数据验证错误");
            error.getFieldErrors().forEach(e->result.setError(e.getField(),e.getDefaultMessage()));
            return result;
        }

        this.userService.save(user);
        return new CommonResult<>(100200,user.getId());
    }

}
