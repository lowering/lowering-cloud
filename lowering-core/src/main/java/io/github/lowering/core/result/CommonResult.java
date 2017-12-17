package io.github.lowering.core.result;

public class CommonResult<T> extends Result {

    //返回的结果
    private T payload;

    public CommonResult(int status){
        this(status,null);
    }

    public CommonResult(int status, T payload){
        super(status);
        this.payload = payload;
    }
}
