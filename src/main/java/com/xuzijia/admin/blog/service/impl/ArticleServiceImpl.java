package com.xuzijia.admin.blog.service.impl;

import com.xuzijia.admin.blog.entity.Article;
import com.xuzijia.admin.blog.entity.Tag;
import com.xuzijia.admin.blog.entity.vo.ArticleQueryVo;
import com.xuzijia.admin.blog.entity.vo.ArticleVo;
import com.xuzijia.admin.blog.entity.vo.FrontArticleVo;
import com.xuzijia.admin.blog.mapper.ArticleMapper;
import com.xuzijia.admin.blog.mapper.TagMapper;
import com.xuzijia.admin.blog.service.ArticleService;
import com.xuzijia.admin.blog.service.TagService;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.Date;
import java.util.List;

/**
 * 后台博客文章service实现层
 * Created by xuzijia
 * 2018/4/10 14:49
 */
@Service
public class ArticleServiceImpl implements ArticleService{
    @Autowired
    private ArticleMapper articleMapper;
    @Autowired
    private TagMapper tagMapper;

    /**
     * 添加文章
     * @param article
     */
    public String addArticle(Article article) throws Exception {
        //补全文章其他参数信息
        Date date=new Date();
        String id=String.valueOf(date.getTime());
        article.setId(id);
        article.setCreateUser(1);
        articleMapper.addArticle(article);
        return id;
    }

    /**
     * 查询文章列表
     * @param queryVo
     * @return
     */
    public List<ArticleVo> findArticle(ArticleQueryVo queryVo) throws Exception {
        return articleMapper.findArticle(queryVo);
    }

    public Integer findArticleCount(ArticleQueryVo articleQueryVo) throws Exception {
        return articleMapper.findArticleCount(articleQueryVo);
    }

    /**
     * 根据id查询文章
     * @param id
     * @return
     */
    public Article findArticleById(String id) throws Exception {
        return articleMapper.findArticleById(id);
    }

    /**
     * 修改文章
     * @param article
     */
    public void updateArticle(Article article) throws Exception {
        //添加修改时间
        article.setUpdateTime(new Date());
        articleMapper.updateArticle(article);
    }

    /**
     * delete article
     * @param id
     * @throws Exception
     */
    public void delArticle(String id) throws Exception {
        String[] ids = id.split(",");
        for(String i:ids){
            articleMapper.delArticle(i);
        }
    }

    /**
     * 查找文章列表 包含标签列表
     * @return
     * @throws Exception
     */
    public List<FrontArticleVo> findArticleList(ArticleQueryVo queryVo) throws Exception {
        List<Article> articleList = articleMapper.findArticleList(queryVo);
        List<FrontArticleVo> frontArticleVoList=new ArrayList<FrontArticleVo>();
        //查询标签
        for (Article article:articleList){
            String labelId = article.getLabelId();
            FrontArticleVo frontArticleVo=new FrontArticleVo();
            BeanUtils.copyProperties(article,frontArticleVo);
            List<Tag> tagList=new ArrayList<Tag>();
            if (labelId!=null && !(labelId.trim().equals(""))){
                tagList=tagMapper.findTagById(labelId.split(","));
            }
            frontArticleVo.setTagList(tagList);
            frontArticleVoList.add(frontArticleVo);
        }
        return frontArticleVoList;
    }

    public Integer findArticleListCount(ArticleQueryVo articleQueryVo) throws Exception {
        return articleMapper.findArticleListCount(articleQueryVo);
    }

    /**
     * 查询热门文章
     * @param articleQueryVo
     * @return
     * @throws Exception
     */
    public List<Article> findHotArticleList() throws Exception {
        return articleMapper.findHotArticleList();
    }

    /**
     * 查找5条相似文章
     * @param categoryId
     * @return
     */
    public List<Article> findarticleByCid(Integer categoryId) {
        return articleMapper.findarticleByCid(categoryId);
    }


}
