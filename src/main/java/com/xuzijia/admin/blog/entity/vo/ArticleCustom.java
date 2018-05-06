package com.xuzijia.admin.blog.entity.vo;

import lombok.Data;

/**
 * 自定义文章查询参数
 * Created by xuzijia
 * 2018/4/10 21:11
 */
@Data
public class ArticleCustom {
    private String name;
    private Integer categoryId;

    private Integer tagId;

    private String title;
}
