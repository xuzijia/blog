package com.xuzijia.blog.controller;

import com.xuzijia.blog.entity.CommentZan;
import com.xuzijia.blog.entity.vo.*;
import com.xuzijia.blog.service.CommentService;
import com.xuzijia.common.IpUtil;
import com.xuzijia.common.PageQuery;
import com.xuzijia.common.ResultUtil;
import org.apache.commons.lang3.StringEscapeUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.util.List;

/**
 * 前台评论接口
 * Created by xuzijia
 * 2018/4/18 20:42
 */
@Controller
@RequestMapping("/comment/")
public class CommentController {

    @Autowired
    private CommentService commentService;

    /**
     * 添加评论
     * @param commentVo
     * @param request
     * @return
     */
    @RequestMapping("add_comment.do")
    @ResponseBody
    public Object addComment(CommentVo commentVo, HttpServletRequest request){
        //todo 如果是登陆用户 需要设置用户信息

        //跨站xxs处理
        commentVo.setContent(StringEscapeUtils.escapeHtml4(commentVo.getContent()));

        //获取用户ip
        String ip = IpUtil.getIpAdrress(request);
        commentVo.setIp(ip);
        CommentQueryVo commentQueryVo = commentService.addComment(commentVo);
        return new ResultUtil<CommentQueryVo>().createSuccessResult(commentQueryVo);
    }

    /**
     * 查询评论列表
     * @param commentVo
     * @param currentPage
     * @param pageSize
     * @return
     */
    @RequestMapping("find_comment_list.do")
    @ResponseBody
    public Object findCommentList(CommentVo commentVo,Integer currentPage,Integer pageSize){
        //准备查询数据
        PageQuery pageQuery=new PageQuery(currentPage,pageSize);
        CommentPageQueryVo commentPageQueryVo=new CommentPageQueryVo();
        commentPageQueryVo.setPageQuery(pageQuery);
        commentPageQueryVo.setCommentVo(commentVo);

        //响应json数据
        List<CommentListVo> commentList= commentService.findCommentList(commentPageQueryVo);
        CommentResultData commentResultData=new CommentResultData();
        CommentData commentData=new CommentData();
        commentResultData.setCode(0);
        commentResultData.setSuccess(true);

        //只计算该文章的一级评论数量
        int count = commentService.findCommentListByFirstCount(commentPageQueryVo);
        commentResultData.setCommentCount(count);

        commentResultData.setText("查询成功");
        commentData.setCurrent(currentPage);
        commentData.setPageSize(pageSize);
        commentData.setDataList(commentList);

        //计算页数
        pageQuery.setTotalResult(count);
        commentData.setPageCount(pageQuery.getTotalPage());
        //评论数据
        commentResultData.setPb(commentData);
        return commentResultData;
    }

    /**
     * 点赞
     * @return
     */
    @RequestMapping("add_zan_comment.do")
    @ResponseBody
    public Object addCommentZan(CommentZan commentZan,HttpServletRequest request){
        //todo  如果是登陆用户 需要设置用户信息

        //获取ip
        commentZan.setIp(IpUtil.getIpAdrress(request));
        int count= 0;
        try {
            count = commentService.addCommentZan(commentZan);
        } catch (Exception e) {
            return new ResultUtil().createErrorResult(e.getMessage());
        }
        return new ResultUtil().createSuccessResult(count,"点赞成功");

    }
    /**
     * todo 取消赞
     * @return
     */
    @RequestMapping("cancel_zan_comment.do")
    @ResponseBody
    public Object cancelCommentZan(CommentZan commentZan,HttpServletRequest request){
        //todo  需要结合qq微博互联操作
        //取消赞条件
        return new ResultUtil().createErrorResult("取消赞失败，游客不可取消赞");
    }
    /**
     *todo 获取互联登陆信息
     */
    @RequestMapping("open_user_auth.do")
    @ResponseBody
    public Object openUserAuth(){

        return null;
    }
    /**
     *todo 退出互联登陆
     */
    @RequestMapping("open_user_logout.do")
    @ResponseBody
    public Object openUserLogout(){

        return null;
    }
    /**
     *todo 删除评论(级联删除)
     */
    @RequestMapping("del_comment.do")
    @ResponseBody
    public Object delComment(){

        //删除条件 open_id+comment_id
        return null;
    }


}
