package com.xuzijia.blog.entity;

import lombok.Data;

/**
 * 评论
 * Created by xuzijia
 * 2018/4/18 20:26
 */
@Data
public class Comment {
    private String id;
    private Integer  type;
    private String targetKey;
    private String parentId;
    private String rootId;
    private String content;
    private Integer status;
    private String visitorName;
    private String visitorEmail;
    private String visitorWebsite;
    private Integer userId;
    private String ip;
    private long commentTime;

    private Integer count;
}
