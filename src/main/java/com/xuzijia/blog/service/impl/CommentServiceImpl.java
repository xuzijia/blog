package com.xuzijia.blog.service.impl;

import com.alibaba.fastjson.JSON;
import com.xuzijia.admin.blog.entity.vo.ChildComment;
import com.xuzijia.blog.entity.BlogUser;
import com.xuzijia.blog.entity.Comment;
import com.xuzijia.blog.entity.CommentZan;
import com.xuzijia.blog.entity.vo.*;
import com.xuzijia.blog.mapper.CommentMapper;
import com.xuzijia.blog.service.CommentService;
import com.xuzijia.common.EmailUtil;
import com.xuzijia.common.IdUtil;
import lombok.experimental.var;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.*;

/**
 * 评论
 * Created by xuzijia
 * 2018/4/18 21:10
 */
@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentMapper commentMapper;

    /**
     * 添加评论
     *
     * @param commentVo
     * @return
     */
    public CommentQueryVo addComment(CommentVo commentVo) {
        String id = IdUtil.getUUID();
        //默认游客
        commentVo.setUserId(2);
        commentVo.setId(id);
        commentVo.setCommentTime(new Date().getTime());
        commentVo.setStatus(0);
        commentMapper.addComment(commentVo);
        CommentQueryVo commentQueryVo = commentMapper.findCommentById(id);
        commentQueryVo.setUserName(commentQueryVo.getVisitorName());
        commentQueryVo.setUserWebsite(commentQueryVo.getVisitorWebsite());
        //获取user中的用户信息
        BlogUser user = commentMapper.findUserById(commentQueryVo.getUserId());
        commentQueryVo.setUser(user);
        //设置赞和踩
        commentQueryVo.setZan(0);
        commentQueryVo.setCai(0);
        return commentQueryVo;
    }

    /**
     * 查询评论列表
     *
     * @param commentPageQueryVo
     * @return
     */
    public List<CommentListVo> findCommentList(CommentPageQueryVo commentPageQueryVo) {
        //先查询一级评论
        List<CommentListVo> commentList = commentMapper.findCommentListByFirst(commentPageQueryVo);

        List<String> ids = new ArrayList<String>();
        if (commentList.size() > 0) {
            for (CommentListVo o : commentList) {
                ids.add(o.getId());
            }
            //根据一级查询所有子评论
            Map map = new HashMap();
            map.put("type", commentPageQueryVo.getCommentVo().getType());
            map.put("ids", ids);
            map.put("sortType", commentPageQueryVo.getCommentVo().getSortType());
            List<CommentListVo> commentListByMany = commentMapper.findCommentListByMany(map);
            commentList.addAll(commentListByMany);

            //数据封装
            commentList = modifyList(commentList);

        } else {
            //没有评论
            return commentList;
        }
        return commentList;
    }

    /**
     * 查询文章的评论数量
     *
     * @param commentPageQueryVo
     * @return
     */
    public int findCommentListByFirstCount(CommentPageQueryVo commentPageQueryVo) {
        return commentMapper.findCommentListByFirstCount(commentPageQueryVo);
    }

    /**
     * 点赞
     *
     * @param commentZan
     * @return 点赞数量
     */
    public int addCommentZan(CommentZan commentZan) throws Exception {
        //游客一天只能点赞同一条评论
        List<CommentZan> list = commentMapper.findCommentZan(commentZan);
        if (list.size() > 0) {
            throw new Exception("该IP今天已经点过赞啦~");
        }
        //记录点赞记录
        commentMapper.addCommentZan(commentZan);

        //查询该评论下的点赞数量
        int count = commentMapper.findCommentZanCount(commentZan.getCommentId());
        return count;
    }

    /**
     * 查询所有根评论
     *
     * @param queryVo
     * @return
     */
    public List<ACommentQueryVo> findACommentListByRoot(ACommentPageQueryVo queryVo) {
        List<ACommentQueryVo> list = commentMapper.findACommentListByRoot(queryVo);
        for (ACommentQueryVo vo:list){
            String id = vo.getId();
            //查询该条评论是否有博主回复true and false
            Integer count=commentMapper.findCommentIsReply(id);
            if(count==null || count==0){
                vo.setReply(false);
            }else{
                vo.setReply(true);
            }
            //查询该条评论对话数量
            Integer childCount=commentMapper.findCommentAllChildCount(id);
            vo.setChildCount(childCount);
        }
        return list;
    }

    public int findACommentListByRootCount(ACommentPageQueryVo queryVo) {
        return commentMapper.findACommentListByRootCount(queryVo);
    }

    public Comment findCommentByid(String id) {
        Comment comment = commentMapper.findCommentByid(id);
        comment.setCount(commentMapper.findCommentAllChildCount(id));
        return comment;
    }

    /**
     * 回复评论
     *
     * @param comment
     * @param username
     */
    public void replyComment(CommentVo comment, String email, String username, String sourceContent) throws Exception {
        String id = IdUtil.getUUID();
        comment.setId(id);
        comment.setCommentTime(new Date().getTime());
        comment.setStatus(0);
        //todo 设置回复人
        comment.setUserId(1);
        comment.setType(0);
        commentMapper.addComment(comment);

        //邮件通知
//        if (email != null && !email.trim().equals("")) {
//            EmailUtil emailUtil=new EmailUtil(email,username,sourceContent,comment.getContent());
//            try {
//                emailUtil.send();
//            } catch (Exception e) {
//                e.printStackTrace();
//                throw new Exception("邮件发送失败");
//
//            }
//        }

    }

    /**
     * 删除评论 级联删除
     *
     * @param id
     */
    public void delComment(String id) {
        //查询所有关于这条评论的id
        List<Integer> ids = commentMapper.findDelCommentId(id);

        //删除所有关联评论
        commentMapper.delCommentByids(ids);

        //删除该条评论的所有赞记录
        commentMapper.delCommentZanByIds(ids);

    }

    /**
     * 查询所有子评论 并做数据解析
     * @param id
     * @return
     */
    public List<ChildComment> findCommentChildById(String id) {
        List<ChildComment> list=commentMapper.findCommentAllChild(id);
        if(list.size()!=0){
            //数据解析
            List<ChildComment> childList = parseData(list);
            return childList;
        }else{
            return null;
        }
    }

    /**
     * 评论节点数据解析
     * @param list
     * @return
     */
    private List<ChildComment> parseData(List<ChildComment> list) {
        List<ChildComment> child1=new ArrayList<ChildComment>();
        List<String> nochild=new ArrayList<String>();
        for(ChildComment childComment:list){
           // childComment.setChildren(new ArrayList<ChildComment>());
            String id = childComment.getId();
            List<ChildComment> child2=new ArrayList<ChildComment>();

            for(ChildComment childComment2:list){
                if(childComment2.getParentId().equals(id)){
                    child2.add(childComment2);
                    nochild.add(childComment2.getId());
              }
            }

            childComment.setChildren(child2);
        }
        //删除多余节点
        for(int a=list.size()-1;a>=0;a--){
            ChildComment comment = list.get(a);
            for(String id:nochild){
                if(comment.getId().equals(id)){
                    list.remove(comment);
                }
            }
        }
        return list;
    }

    /**
     * 修饰数据
     *
     * @param commentList
     * @return
     */
    private List<CommentListVo> modifyList(List<CommentListVo> commentList) {
        for (CommentListVo o : commentList) {
            //获取user中的用户信息
            BlogUser user = commentMapper.findUserById(o.getUserId());
            o.setUser(user);
            if (o.getUser().getUserType() == 0) {
                //游客登陆 设置用户信息
                o.setUserName(o.getVisitorName());
                o.setUserWebsite(o.getVisitorWebsite());
                o.setUserAvatar(null);
            } else {
                o.setUserName(o.getUser().getNickname());
                o.setUserWebsite(null);
                o.setUserAvatar(o.getUser().getAvatar());
            }
        }
        return commentList;
    }
}
