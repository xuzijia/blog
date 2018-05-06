package com.xuzijia.blog.entity.vo;

import lombok.Data;

/**
 * Created by xuzijia
 * 2018/4/23 11:02
 */
@Data
public class ACommentQueryVo {
    private String id;
    private String content;
    private String articleName;
    private String aid;
    private String commentTime;
    private String nickname;
    private String avatar;
    private boolean reply;
    private Integer childCount;
}
