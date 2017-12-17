package io.github.lowering.core.result;

import java.io.Serializable;

public abstract class Result implements Serializable {

    //状态码
    private int status;

    public Result(int status){
        this.status = status;
    }

    public void setStatus(int status) {
        this.status = status;
    }

    public int getStatus() {
        return status;
    }
}
