package com.xuzijia.blog.entity.vo;

import com.xuzijia.blog.entity.BlogUser;
import lombok.Data;

/**
 * 评论列表数据类
 * Created by xuzijia
 * 2018/4/19 8:51
 */
@Data
public class CommentListVo extends CommentQueryVo{
    private String children;
    private BlogUser user;
    private Integer zan;
    private Integer cai;
}
