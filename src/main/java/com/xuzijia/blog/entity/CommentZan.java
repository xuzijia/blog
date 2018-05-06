package com.xuzijia.blog.entity;

import lombok.Data;

import java.util.Date;

/**
 * 赞或踩记录
 * Created by xuzijia
 * 2018/4/18 20:38
 */
@Data
public class CommentZan {
    private Integer id;
    private Integer userId;
    private String commentId;
    private Date createTime;
    private String ip;
    private Integer type;
}
