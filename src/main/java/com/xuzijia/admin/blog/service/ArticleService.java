package com.xuzijia.admin.blog.service;

import com.xuzijia.admin.blog.entity.Article;
import com.xuzijia.admin.blog.entity.vo.ArticleQueryVo;
import com.xuzijia.admin.blog.entity.vo.ArticleVo;
import com.xuzijia.admin.blog.entity.vo.FrontArticleVo;

import java.util.List;

/**
 * 后台博客文章service层接口
 * Created by xuzijia
 * 2018/4/10 14:49
 */
public interface ArticleService {
    /**
     * 添加文章
     * @param article
     */
    String addArticle(Article article) throws Exception;

    /**
     * 查询文章列表
     * @param queryVo
     * @return
     */
    List<ArticleVo> findArticle(ArticleQueryVo queryVo) throws Exception;

    Integer findArticleCount(ArticleQueryVo articleQueryVo) throws Exception;

    /**
     * 根据id查询文章
     * @param id
     * @return
     */
    Article findArticleById(String id) throws Exception;

    void updateArticle(Article article) throws Exception;

    void delArticle(String id) throws Exception;

    List<FrontArticleVo> findArticleList(ArticleQueryVo queryVo)throws Exception;
    Integer findArticleListCount(ArticleQueryVo articleQueryVo)throws Exception;
    List<Article> findHotArticleList()throws Exception;

    List<Article> findarticleByCid(Integer categoryId);
}
