package com.xuzijia.blog.entity.vo;

import com.xuzijia.blog.entity.BlogUser;
import com.xuzijia.blog.entity.Comment;
import lombok.Data;

/**
 * 评论参数对象
 * Created by xuzijia
 * 2018/4/18 21:02
 */
@Data
public class CommentVo extends Comment{
    private String sortType;
}
