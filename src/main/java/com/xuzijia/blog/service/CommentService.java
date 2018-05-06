package com.xuzijia.blog.service;

import com.xuzijia.admin.blog.entity.vo.ChildComment;
import com.xuzijia.blog.entity.Comment;
import com.xuzijia.blog.entity.CommentZan;
import com.xuzijia.blog.entity.vo.*;

import java.util.List;

/**
 * 评论
 * Created by xuzijia
 * 2018/4/18 21:08
 */
public interface CommentService {
    CommentQueryVo addComment(CommentVo commentVo);

    List<CommentListVo> findCommentList(CommentPageQueryVo commentPageQueryVo);

    int findCommentListByFirstCount(CommentPageQueryVo commentPageQueryVo);

    int addCommentZan(CommentZan commentZan) throws Exception;


    List<ACommentQueryVo> findACommentListByRoot(ACommentPageQueryVo queryVo);

    int findACommentListByRootCount(ACommentPageQueryVo queryVo);

    Comment findCommentByid(String id);

    void replyComment(CommentVo comment, String email, String username, String sourceContent) throws Exception;

    void delComment(String id);

    List<ChildComment> findCommentChildById(String id);

}
