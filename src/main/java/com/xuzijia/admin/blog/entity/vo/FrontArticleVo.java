package com.xuzijia.admin.blog.entity.vo;

import com.xuzijia.admin.blog.entity.Article;
import com.xuzijia.admin.blog.entity.Tag;
import lombok.Data;

import java.util.Date;
import java.util.List;

/**
 * 前台博客文章
 * Created by xuzijia
 * 2018/4/12 22:10
 */
@Data
public class FrontArticleVo extends Article{
    private List<Tag> tagList;
    private String categoryName;
}
