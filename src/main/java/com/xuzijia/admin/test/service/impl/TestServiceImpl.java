package com.xuzijia.admin.test.service.impl;

import com.xuzijia.admin.test.entity.Test;
import com.xuzijia.admin.test.mapper.TestMapper;
import com.xuzijia.admin.test.service.TestService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

/**
 * Created by xuzijia
 * 2018/4/10 10:27
 */
@Service
public class TestServiceImpl implements TestService {
    @Autowired
    private TestMapper testMapper;

    public List<Test> findTest() {
        return testMapper.findTest();
    }
}
