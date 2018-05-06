package com.xuzijia.blog.entity.vo;

import com.xuzijia.blog.entity.BlogUser;
import com.xuzijia.blog.entity.Comment;
import lombok.Data;

/**
 * 添加评论后的响应对象
 * Created by xuzijia
 * 2018/4/18 22:09
 */
@Data
public class CommentQueryVo extends Comment {
    private String userName;
    private Integer zan;
    private String userAvatar;
    private String userWebsite;
    private Integer cai;
    private BlogUser user;
}
