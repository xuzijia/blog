package com.xuzijia.blog.entity.vo;

import com.xuzijia.common.PageQuery;
import lombok.Data;

import java.util.List;

/**
 * 查询评论列表时-> 查询参数
 * Created by xuzijia
 * 2018/4/19 8:39
 */
@Data
public class CommentPageQueryVo  {
    private PageQuery pageQuery;
    private CommentVo commentVo;
}
