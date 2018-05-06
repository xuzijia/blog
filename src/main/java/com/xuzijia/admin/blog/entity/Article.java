package com.xuzijia.admin.blog.entity;

import lombok.Data;

import java.util.Date;

/**
 * 博客文章
 * Created by xuzijia
 * 2018/4/10 11:00
 */
@Data
public class Article {
    private String id;
    private String title;
    private String summary;
    private String content;
    private Integer categoryId;
    private String labelId;
    private Integer status;
    private Integer isPublic;
    private String thumbPic;
    private Integer isTop;
    private Date createTime;
    private Date updateTime;
    private Integer createUser;
    private Integer checkUser;
    private Integer readCount;
    private Integer praise;
    private Integer isComment;
    private String categoryName;
    private Integer isOriginal;
    private String sourceUrl;

}
