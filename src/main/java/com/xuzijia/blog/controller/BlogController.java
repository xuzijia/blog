package com.xuzijia.blog.controller;

import com.xuzijia.admin.blog.entity.Article;
import com.xuzijia.admin.blog.entity.Tag;
import com.xuzijia.admin.blog.entity.vo.ArticleCustom;
import com.xuzijia.admin.blog.entity.vo.ArticleQueryVo;
import com.xuzijia.admin.blog.entity.vo.CategoryVo;
import com.xuzijia.admin.blog.entity.vo.FrontArticleVo;
import com.xuzijia.admin.blog.service.ArticleService;
import com.xuzijia.admin.blog.service.CategoryService;
import com.xuzijia.admin.blog.service.TagService;
import com.xuzijia.common.PageQuery;
import com.xuzijia.common.ResultData;
import com.xuzijia.common.ResultUtil;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.http.HttpServletRequest;
import java.net.URLDecoder;
import java.util.List;

/**
 * 前台博客管理
 * Created by xuzijia
 * 2018/4/12 21:27
 */
@Controller
@RequestMapping("/blog/")
public class BlogController {
    @Autowired
    private CategoryService categoryService;
    @Autowired
    private TagService tagService;
    @Autowired
    private ArticleService articleService;
    /**
     * 博客主页
     * @return
     */
    @RequestMapping("index")
    public String index(Model model) throws Exception {
        //查找分类
        List<CategoryVo> categoryList = categoryService.findCategoryAndCount();
        model.addAttribute("categoryList",categoryList);
        //查找所有标签
        List<Tag> tagList = tagService.findTag();
        model.addAttribute("tagList",tagList);
        //查找热门文章
        List<Article> hotList = articleService.findHotArticleList();
        model.addAttribute("hotList",hotList);
        return "/blog/index";
    }

    @RequestMapping("about")
    public String about(Model model){
        return "/blog/about";
    }
    @RequestMapping("board")
    public String board(Model model){
        //查找所有标签
        List<Tag> tagList = tagService.findTag();
        model.addAttribute("tagList",tagList);
        return "/blog/board";
    }

    /**
     * 查询文章列表
     * @return
     */
    @RequestMapping("findArticleList.do")
    @ResponseBody
    public ResultData findArticleList(@RequestParam(value="page",defaultValue = "1") Integer page, @RequestParam(value="limit",defaultValue = "4")Integer limit
            ,Integer c,Integer t,String q){

        try {
            ArticleQueryVo queryVo=new ArticleQueryVo();
            PageQuery pageQuery=new PageQuery(page,limit);
            queryVo.setPageQuery(pageQuery);
            ArticleCustom articleCustom=new ArticleCustom();
            if(c!=null){
                //根据分类搜索文章
                articleCustom.setCategoryId(c);
            }else if(t!=null){
                //根据标签搜索文章
                articleCustom.setTagId(t);
            }else if(q!=null && !q.trim().equals("")){
                //搜索
                //url code
                String decode = URLDecoder.decode(q, "utf-8");
                articleCustom.setTitle(decode);
            }

            queryVo.setArticleCustom(articleCustom);

            List<FrontArticleVo> articleVoList = articleService.findArticleList(queryVo);
            //查询文章总数
            int count=articleService.findArticleListCount(queryVo);

            return new ResultUtil().createSuccessPageResult(articleVoList,count);


        } catch (Exception e) {
            e.printStackTrace();
            return new ResultUtil().createErrorResult("查询失败");
        }
    }
    /**
     * 根据文章id查询文章 restful风格
     */
    @RequestMapping("article/{id}")
    public String findArticleById(@PathVariable("id") String id, Model model, HttpServletRequest request){
        try {
            //todo id合法性校验
            if(id==null || id.trim().equals("")){
                return "/blog/404";
            }
            Article article = articleService.findArticleById(id);
            if(article==null){
                return "/blog/404";
            }
            model.addAttribute("article",article);
            //查询文章标签
            if(article.getLabelId()!=null && !article.getLabelId().trim().equals("")){
                List<Tag> tagList=tagService.findTagByid(article.getLabelId());
                model.addAttribute("tagList",tagList);
            }


            //查找分类
            List<CategoryVo> categoryList = categoryService.findCategoryAndCount();
            model.addAttribute("categoryList",categoryList);
            //增加阅读量
            Article updateArticle=new Article();
            updateArticle.setId(article.getId());
            updateArticle.setReadCount(article.getReadCount()+1);
            articleService.updateArticle(updateArticle);

            //查找相似文章 根据文章分类
            Integer categoryId = article.getCategoryId();
            List<Article> articleList = articleService.findarticleByCid(categoryId);
            model.addAttribute("articleList",articleList);

            return "/blog/blog";
        } catch (Exception e) {
            e.printStackTrace();
            //异常处理
            return "/blog/500";
        }
    }
}
