package com.xuzijia.blog.mapper;

import com.xuzijia.admin.blog.entity.vo.ChildComment;
import com.xuzijia.blog.entity.BlogUser;
import com.xuzijia.blog.entity.Comment;
import com.xuzijia.blog.entity.CommentZan;
import com.xuzijia.blog.entity.vo.*;

import java.util.List;
import java.util.Map;

/**
 * 评论mapper接口
 * Created by xuzijia
 * 2018/4/18 21:14
 */
public interface CommentMapper {
    void addComment(CommentVo commentVo);
    CommentQueryVo findCommentById(String id);

    List<CommentListVo> findCommentListByFirst(CommentPageQueryVo commentPageQueryVo);
    int findCommentListByFirstCount(CommentPageQueryVo commentPageQueryVo);

    List<CommentListVo> findCommentListByMany(Map map);

    void addCommentZan(CommentZan commentZan);

    int findCommentZanCount(String commentId);

    List<CommentZan> findCommentZan(CommentZan commentZan);

    List<ACommentQueryVo> findACommentListByRoot(ACommentPageQueryVo queryVo);

    int findACommentListByRootCount(ACommentPageQueryVo queryVo);

    Comment findCommentByid(String id);

    BlogUser findUserById(Integer userId);

    List<Integer> findDelCommentId(String id);

    void delCommentByids(List<Integer> ids);

    void delCommentZanByIds(List<Integer> ids);

    Integer findCommentIsReply(String id);

    List<ChildComment> findCommentAllChild(String id);

    Integer findCommentAllChildCount(String id);
}
