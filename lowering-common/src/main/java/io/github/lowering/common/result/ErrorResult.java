package io.github.lowering.common.result;

public class ErrorResult extends Result {

    private String description;

    public ErrorResult(int status){
        this(status,"");
    }
    public ErrorResult(int status,String description){
        super(status);
        this.description = description;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }
}
