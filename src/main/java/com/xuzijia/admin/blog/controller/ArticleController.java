package com.xuzijia.admin.blog.controller;

import com.xuzijia.admin.blog.entity.Article;
import com.xuzijia.admin.blog.entity.vo.*;
import com.xuzijia.admin.blog.service.ArticleService;
import com.xuzijia.common.Config;
import com.xuzijia.common.PageQuery;
import com.xuzijia.common.ResultData;
import com.xuzijia.common.ResultUtil;
import net.coobird.thumbnailator.Thumbnails;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.net.URLDecoder;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;
import java.util.UUID;

/**
 * 后台博客文章管理
 * Created by xuzijia
 * 2018/4/10 10:57
 */
@Controller
@RequestMapping("/admin/blog/")
public class ArticleController {
    @Autowired
    private ArticleService articleService;

    /**
     * 添加或修改文章
     * @param article
     * @return
     */
    @RequestMapping("addArticle.do")
    @ResponseBody
    public ResultData addArticle(Article article){
        try {
            if(article.getId()!=null && article.getId().trim()!=""){
                //修改文章
                articleService.updateArticle(article);
                return new ResultUtil().createSuccessResult();
            }else{
                //添加文章
                String id = articleService.addArticle(article);
                return new ResultUtil().createSuccessResult(id);
            }
        } catch (Exception e) {
            //todo 记录错误日志
            e.printStackTrace();
            return new ResultUtil().createErrorResult("操作失败~");
        }
    }

    /**
     * 上传接口
     * @param upfile
     * @return
     */
    @RequestMapping("uploadThumbPic.do")
    @ResponseBody
    public Object uploadThumbPic(MultipartFile upfile,String type,String flag){
        String rootPath= Config.uploadUrlRoot;
        String articlePath=Config.articleUrl;
        String imgtype=upfile.getOriginalFilename().substring(upfile.getOriginalFilename().lastIndexOf("."));
        //获取文件名
        String fileName = UUID.randomUUID().toString().replace("-","")+imgtype;
        //日期作为目录 每天生成一个目录
        SimpleDateFormat simpleDateFormat=new SimpleDateFormat("yyyy-MM-dd");
        String date = simpleDateFormat.format(new Date());

        File dir=new File(rootPath+articlePath+"/"+date);
        if (!dir.exists()){
            dir.mkdirs();
        }
        System.out.println(rootPath);
        File SaveFile=new File(dir,"/"+fileName);
        ResultData resultData=new ResultData();
        try {
            //更改缩略图大小
            if(flag!=null && flag.equals("true")){
                Thumbnails.of(upfile.getInputStream()).size(300,200).toFile(SaveFile);
            }else{
                //保存文件
                SaveFile.setWritable(true);
                System.out.println(SaveFile.getAbsoluteFile());
                upfile.transferTo(SaveFile);
            }


        } catch (IOException e) {
            e.printStackTrace();
            return new ResultUtil().createErrorResult("upload error");
        }
        String url=Config.webResourceUrl+Config.articleUrl+"/"+date+"/"+fileName;

        if( type!=null){
            //富文本上传
            UMeditorData uMeditorData=new UMeditorData();
            uMeditorData.setName(fileName);
            uMeditorData.setOriginalName(upfile.getOriginalFilename());
            uMeditorData.setSize(upfile.getSize());
            uMeditorData.setType(imgtype);
            uMeditorData.setState("SUCCESS");
            uMeditorData.setUrl(url);
            return uMeditorData;
        }

        Thumb thumb=new Thumb();
        thumb.setSrc(url);
        return new ResultUtil<Thumb>().createSuccessResult("upload success",thumb);
    }

    /**
     * 查询文章列表
     * @param page
     * @param limit
     * @return
     */
    @RequestMapping("findArticle.do")
    @ResponseBody
    public ResultData findArticle(@RequestParam(value="page",defaultValue = "1")  Integer page,@RequestParam(value="limit",defaultValue = "20")Integer limit,String q){

        try {
            PageQuery pageQuery=new PageQuery(page,limit);
            ArticleQueryVo queryVo=new ArticleQueryVo();
            queryVo.setPageQuery(pageQuery);
            ArticleCustom articleCustom=new ArticleCustom();
            if(q!=null && !q.trim().equals("")){
                //搜索
                //url code
                String decode = URLDecoder.decode(q, "utf-8");
                articleCustom.setTitle(decode);
            }
            queryVo.setArticleCustom(articleCustom);
            List<ArticleVo> articleVoList=articleService.findArticle(queryVo);
            Integer count=articleService.findArticleCount(queryVo);
            return new ResultUtil<ArticleVo>().createSuccessPageResult(articleVoList,count);

        } catch (Exception e) {
            e.printStackTrace();
            return new ResultUtil().createErrorResult();
        }
    }

    /**
     * 根据id查询文章
     * @param id
     * @return
     */
    @RequestMapping("findArticleById.do")
    @ResponseBody
    public ResultData findArticleById(String id){
        try {
            Article article = articleService.findArticleById(id);
            if(article==null){
                return new ResultUtil().createErrorResult("找不到该文章!");
            }
            return new ResultUtil<Article>().createSuccessResult(article);
        } catch (Exception e) {
            e.printStackTrace();
            return new ResultUtil().createErrorResult();
        }
    }

    /**
     * 删除文章
     * @param id
     * @return
     */
    @RequestMapping("delArticle.do")
    @ResponseBody
    public ResultData delArticle(String id){
        try {
            articleService.delArticle(id);
            return new ResultUtil().createSuccessResult();
        } catch (Exception e) {
            e.printStackTrace();
            return new ResultUtil().createErrorResult();
        }
    }

}