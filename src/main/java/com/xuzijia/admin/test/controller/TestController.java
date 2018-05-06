package com.xuzijia.admin.test.controller;

import com.xuzijia.admin.test.entity.Test;
import com.xuzijia.admin.test.service.TestService;
import com.xuzijia.common.ResultData;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * Created by xuzijia
 * 2018/4/10 10:20
 */
@Controller
@RequestMapping("/test/")
public class TestController {
    @Autowired
    private TestService testService;

    @RequestMapping("test")
    @ResponseBody
    public ResultData test(){
        ResultData<Test> resultData=new ResultData<Test>();
        List<Test> testList = testService.findTest();
        resultData.setCode(0);
        resultData.setData(testList);
        resultData.setMsg("success");
        resultData.setCount(testList.size());
        return resultData;
    }
}
