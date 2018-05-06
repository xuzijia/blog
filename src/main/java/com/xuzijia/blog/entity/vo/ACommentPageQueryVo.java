package com.xuzijia.blog.entity.vo;

import com.xuzijia.common.PageQuery;
import lombok.Data;

/**
 * Created by xuzijia
 * 2018/4/23 11:08
 */
@Data
public class ACommentPageQueryVo {
    private PageQuery pageQuery;
    private ACommentCustom aCommentCustom;
}
