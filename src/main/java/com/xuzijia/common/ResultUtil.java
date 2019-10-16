package com.xuzijia.common;

import java.util.List;
import java.util.regex.Pattern;

/**
 * json工具类
 * Created by xuzijia
 * 2018/4/10 19:23
 */
public class ResultUtil<T> {
    public final static Integer SUCCESS_CODE=0;
    public final static Integer ERROR_CODE=1;
    public ResultData createSuccessResult(){
        return new ResultData(SUCCESS_CODE);
    }
    public ResultData createErrorResult(){
        return new ResultData(ERROR_CODE);
    }
    public ResultData createErrorResult(String msg){
        return new ResultData(ERROR_CODE,msg);
    }
    public ResultData createSuccessResult(String msg){
        return new ResultData(SUCCESS_CODE,msg);
    }
    public ResultData createSuccessResult(String msg,T object){
        return new ResultData(SUCCESS_CODE,msg,object);
    }
    public ResultData createSuccessResult(String msg, List<T> dataList){
        return new ResultData(SUCCESS_CODE,msg,dataList);
    }
    public ResultData createSuccessResult(T object){
        return new ResultData(SUCCESS_CODE,object);
    }
    public ResultData createSuccessResult(List<T> dataList){
        return new ResultData(SUCCESS_CODE,dataList);
    }
    public ResultData createSuccessResult(Integer count,String msg){
        return new ResultData(SUCCESS_CODE,count,msg);
    }

    public ResultData createSuccessPageResult(List<T> data,Integer count){
        return new ResultData(SUCCESS_CODE,count,data);
    }

    /**
     * 过滤不合法字符，防止xss攻击
     * @param value
     * @return
     */
    public static String stripXSS(String value) {
        if (value != null) {
            Pattern scriptPattern = Pattern.compile("<[\r\n| | ]*script[\r\n| | ]*>(.*?)</[\r\n| | ]*script[\r\n| | ]*>", Pattern.CASE_INSENSITIVE);
            value = scriptPattern.matcher(value).replaceAll("");
            // Avoid anything in a src="http://www.yihaomen.com/article/java/..." type of e-xpression
            scriptPattern = Pattern.compile("src[\r\n| | ]*=[\r\n| | ]*[\\\"|\\\'](.*?)[\\\"|\\\']", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
            value = scriptPattern.matcher(value).replaceAll("");
            // Remove any lonesome </script> tag
            scriptPattern = Pattern.compile("</[\r\n| | ]*script[\r\n| | ]*>", Pattern.CASE_INSENSITIVE);
            value = scriptPattern.matcher(value).replaceAll("");
            // Remove any lonesome <script ...> tag
            scriptPattern = Pattern.compile("<[\r\n| | ]*script(.*?)>", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
            value = scriptPattern.matcher(value).replaceAll("");
            // Avoid eval(...) expressions
            scriptPattern = Pattern.compile("eval\\((.*?)\\)", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
            value = scriptPattern.matcher(value).replaceAll("");
            // Avoid e-xpression(...) expressions
            scriptPattern = Pattern.compile("e-xpression\\((.*?)\\)", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
            value = scriptPattern.matcher(value).replaceAll("");
            // Avoid javascript:... expressions
            scriptPattern = Pattern.compile("javascript[\r\n| | ]*:[\r\n| | ]*", Pattern.CASE_INSENSITIVE);
            value = scriptPattern.matcher(value).replaceAll("");
            // Avoid vbscript:... expressions
            scriptPattern = Pattern.compile("vbscript[\r\n| | ]*:[\r\n| | ]*", Pattern.CASE_INSENSITIVE);
            value = scriptPattern.matcher(value).replaceAll("");
            // Avoid onload= expressions
            scriptPattern = Pattern.compile("onload(.*?)=", Pattern.CASE_INSENSITIVE | Pattern.MULTILINE | Pattern.DOTALL);
            value = scriptPattern.matcher(value).replaceAll("");
        }
        return value;
    }


}
