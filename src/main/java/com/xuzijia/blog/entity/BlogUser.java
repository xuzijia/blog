package com.xuzijia.blog.entity;

import lombok.Data;

import java.util.Date;

/**
 * 博客用户
 * Created by xuzijia
 * 2018/4/18 20:31
 */
@Data
public class BlogUser {
    private Integer id;
    private String accessToken;
    private String avatar;
    private Date createTime;
    private String gender;
    private String email;
    private String nickname;
    private String openId;
    private Integer userType;
    private String expiredTime;
    private String address;
    private String year;
}
