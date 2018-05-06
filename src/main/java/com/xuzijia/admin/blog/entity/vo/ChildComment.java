package com.xuzijia.admin.blog.entity.vo;

import com.xuzijia.blog.entity.Comment;
import lombok.Data;

import java.util.List;

/**
 * 子评论数据
 * Created by xuzijia
 * 2018/4/26 21:19
 */
@Data
public class ChildComment extends Comment {
    private String username;
    private List<ChildComment> children;

    @Override
    public String toString() {
        return "ChildComment{" +
                "username='" + username + '\'' +
                ", children=" + children +
                '}';
    }
}
