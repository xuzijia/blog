package com.xuzijia.blog.mapper;

import com.xuzijia.blog.entity.BlogUser;

/**
 * Created by xuzijia
 * 2018/5/5 21:44
 */
public interface BlogUserMapper {
    void addUser(BlogUser blogUser);

    BlogUser findUserByOpenid(String openid);

    void updateUser(BlogUser user);
}
