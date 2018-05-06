package com.xuzijia.blog.service;

import com.xuzijia.blog.entity.BlogUser;

/**
 * 博客用户管理
 * Created by xuzijia
 * 2018/5/5 21:42
 */
public interface BlogUserService {
    void addUser(BlogUser blogUser);

    BlogUser findUserByOpenid(String openid);

    void updateUser(BlogUser user);
}
