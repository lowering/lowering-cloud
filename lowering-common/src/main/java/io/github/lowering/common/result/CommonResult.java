package io.github.lowering.common.result;

public class CommonResult<T> extends Result {

    private T payload;

    public CommonResult(int status){
        this(status,null);
    }
    public CommonResult(int status,T payload){
        super(status);
        this.payload = payload;
    }
}
