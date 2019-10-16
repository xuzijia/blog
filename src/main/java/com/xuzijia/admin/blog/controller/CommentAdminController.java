package com.xuzijia.admin.blog.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.serializer.SerializerFeature;
import com.xuzijia.admin.blog.entity.vo.ChildComment;
import com.xuzijia.blog.entity.Comment;
import com.xuzijia.blog.entity.vo.ACommentPageQueryVo;
import com.xuzijia.blog.entity.vo.ACommentQueryVo;
import com.xuzijia.blog.entity.vo.CommentVo;
import com.xuzijia.blog.service.CommentService;
import com.xuzijia.common.PageQuery;
import com.xuzijia.common.ResultData;
import com.xuzijia.common.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import java.util.List;

/**
 * 后台评论管理
 * Created by xuzijia
 * 2018/4/23 10:12
 */
@Controller
@RequestMapping("/admin/blog/comment/")
public class CommentAdminController {
    @Autowired
    private CommentService commentService;

    /**
     * 查询所有根评论
     *
     * @param page
     * @param limit
     * @return
     */
    @RequestMapping("findCommentList.do")
    @ResponseBody
    public ResultData findCommentList(@RequestParam(value = "page", defaultValue = "1") Integer page, @RequestParam(value = "limit", defaultValue = "20") Integer limit) {
        PageQuery pageQuery = new PageQuery(page, limit);
        ACommentPageQueryVo queryVo = new ACommentPageQueryVo();
        queryVo.setPageQuery(pageQuery);
        List<ACommentQueryVo> list = commentService.findACommentListByRoot(queryVo);
        int count = commentService.findACommentListByRootCount(queryVo);
        return new ResultUtil().createSuccessPageResult(list, count);
    }

    /**
     * 根据根评论获取所有子评论json数据
     * @param id
     * @return
     */
    @RequestMapping("getChildDataJson.do")
    @ResponseBody
    public String findCommentChildById(String id){
        List<ChildComment> list=commentService.findCommentChildById(id);
        String s = JSON.toJSONString(list, SerializerFeature.DisableCircularReferenceDetect);
        return s;
    }

    /**
     * 管理员回复
     *
     * @return
     */
    @RequestMapping("replyComment.do")
    @ResponseBody
    public ResultData replyComment(CommentVo comment,String email,String username,String sourceContent) {
        String finalContent = ResultUtil.stripXSS(sourceContent);
        try {
            commentService.replyComment(comment,email,username,finalContent);
        } catch (Exception e) {
            return new ResultUtil().createErrorResult(e.getMessage());
        }
        return new ResultUtil().createSuccessResult();
    }

    /**
     * 根据评论id查询评论
     *
     * @return
     */
    @RequestMapping("findCommentByid.do")
    @ResponseBody
    public ResultData findCommentByid(String id) {
        Comment comment = commentService.findCommentByid(id);
        return new ResultUtil().createSuccessResult(comment);
    }

    /**
     * 根据评论id删除评论 级联删除
     *
     * @return
     */
    @RequestMapping("delComment.do")
    @ResponseBody
    public ResultData delComment(String id) {
        if (id == null) {
            return new ResultUtil().createErrorResult("id参数错误");
        }
        try {
            for (String i : id.split(",")) {
                commentService.delComment(i);
            }
        } catch (Exception e) {
            return new ResultUtil().createErrorResult("删除失败");
        }
        return new ResultUtil().createSuccessResult();
    }
    /**
     * 根据评论id查询该评论
     *
     * @return
     */
    @RequestMapping("findCommentById.do")
    @ResponseBody
    public ResultData findCommentById(String id) {
        if (id == null) {
            return new ResultUtil().createErrorResult("id参数错误");
        }
        Comment comment = commentService.findCommentByid(id);

        return new ResultUtil().createSuccessResult(comment);
    }


}
