package com.xuzijia.admin.blog.entity;

import lombok.Data;

/**
 * 文章标签
 * Created by xuzijia
 * 2018/4/10 20:18
 */
@Data
public class Tag {
    private Integer id;
    private String name;
    private Integer categoryId;
}
