package com.xuzijia.admin.base.service.impl;

import com.xuzijia.admin.base.entity.User;
import com.xuzijia.admin.base.mapper.UserMapper;
import com.xuzijia.admin.base.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * Created by xuzijia
 * 2018/5/6 16:01
 */
@Service
public class UserServiceImpl implements UserService {

    @Autowired
    private UserMapper userMapper;

    @Override
    public User checkUser(User user) {
        return userMapper.checkUser(user);
    }
}
