package com.xuzijia.blog.entity.vo;

import lombok.Data;

/**
 * 评论列表响应json数据格式
 * Created by xuzijia
 * 2018/4/19 9:57
 */
@Data
public class CommentResultData {
    private boolean success;
    private Integer code;
    private String text;
    private CommentData pb;
    private Integer commentCount;
}
