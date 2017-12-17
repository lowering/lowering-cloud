package io.github.lowering.common.result;

import java.util.HashMap;
import java.util.Map;

public class ValidationResult extends ErrorResult {

    private Map<String,String> errors = new HashMap<>();

    public ValidationResult(int status){
        super(status);
    }
    public ValidationResult(int status,String description){
        super(status,description);
    }

    public ValidationResult setError(String code,String error){
        this.errors.put(code,error);
        return this;
    }

    public Map<String, String> getErrors() {
        return errors;
    }

    public void setErrors(Map<String, String> errors) {
        this.errors = errors;
    }
}
