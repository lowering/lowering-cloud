package io.github.lowering.common.result;

import java.io.Serializable;

public abstract class Result implements Serializable {

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
