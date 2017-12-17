package io.github.lowering.core.web.advice;

import io.github.lowering.core.result.ErrorResult;
import io.github.lowering.core.result.Result;
import io.github.lowering.core.result.ValidationResult;
import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.ResponseStatus;

import javax.validation.ConstraintViolationException;
import java.util.Objects;

@ControllerAdvice
public class DefaultHandlerExceptionAdvice {


    @ResponseBody
    @ResponseStatus(HttpStatus.INTERNAL_SERVER_ERROR)
    @ExceptionHandler(Exception.class)
    public Result global(Exception exception){
        return new ErrorResult(100500, exception.getMessage());
    }

    @ResponseBody
    @ResponseStatus(HttpStatus.BAD_REQUEST)
    @ExceptionHandler(ConstraintViolationException.class)
    public Result validation(ConstraintViolationException exception){
        ValidationResult result = new ValidationResult(100400, exception.getMessage());
        exception.getConstraintViolations().stream().filter(error-> Objects.nonNull(error.getPropertyPath())).forEach(error->result.setError(error.getPropertyPath().toString(),error.getMessage()));
        return result;
    }

}
