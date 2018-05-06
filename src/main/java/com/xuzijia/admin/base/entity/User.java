package com.xuzijia.admin.base.entity;

import lombok.Data;

/**
 * 后台管理员
 * Created by xuzijia
 * 2018/5/6 15:32
 */
@Data
public class User {
    private Integer id;
    private String username;
    private String password;
}
