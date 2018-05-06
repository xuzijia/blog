package com.xuzijia.blog.service.impl;

import com.xuzijia.blog.entity.BlogUser;
import com.xuzijia.blog.mapper.BlogUserMapper;
import com.xuzijia.blog.service.BlogUserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * 博客用户管理
 * Created by xuzijia
 * 2018/5/5 21:43
 */
@Service
public class BlogUserServiceImpl  implements BlogUserService{
    /**
     * 添加用户
     * @param blogUser
     */
    @Autowired
    private BlogUserMapper blogUserMapper;
    @Override
    public void addUser(BlogUser blogUser) {
        blogUserMapper.addUser(blogUser);
    }

    /**
     * 查询用户是否存在
     * @param openid
     * @return
     */
    @Override
    public BlogUser findUserByOpenid(String openid) {
        return blogUserMapper.findUserByOpenid(openid);
    }

    /**
     * 修改用户信息
     * @param user
     */
    @Override
    public void updateUser(BlogUser user) {
        blogUserMapper.updateUser(user);
    }
}
