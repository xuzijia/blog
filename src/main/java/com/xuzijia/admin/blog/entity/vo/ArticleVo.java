package com.xuzijia.admin.blog.entity.vo;

import lombok.Data;

import java.util.Date;

/**
 * 页面文章列表数据视图
 * Created by xuzijia
 * 2018/4/10 20:38
 */
@Data
public class ArticleVo {
    private String id;
    private String title;
    private String CategoryName;
    private Integer status;
    private Integer isPublic;
    private Integer isTop;
    private String cTime;
    private Integer createUser;
    private Integer readCount;
    private Integer isComment;
    private Integer isOriginal;
}
