package com.xuzijia.common;

import lombok.Data;

import java.util.List;

/**
 * json数据格式
 * Created by xuzijia
 * 2018/4/10 10:22
 */
@Data
public class ResultData<T> {
    private Integer code;
    private String msg;
    private T object;
    private List<T> data;
    private Integer count;
    public ResultData(){}
    public ResultData(Integer code){
        this.code=code;
    }
    public ResultData(Integer code,String msg){
        this.code=code;
        this.msg=msg;
    }
    public ResultData(Integer code,String msg,T object){
        this.code=code;
        this.msg=msg;
        this.object=object;
    }
    public ResultData(Integer code,String msg,List<T> data){
        this.code=code;
        this.msg=msg;
        this.data = data;
    }
    public ResultData(Integer code,T object){
        this.code=code;
        this.object=object;
    }
    public ResultData(Integer code,List<T> data){
        this.code=code;
        this.data = data;
    }
    public ResultData(Integer code,Integer count,List<T> data){
        this.code=code;
        this.data = data;
        this.count=count;
    }

    public ResultData(Integer code,Integer count,String msg){
        this.code=code;
        this.msg = msg;
        this.count=count;
    }

}
