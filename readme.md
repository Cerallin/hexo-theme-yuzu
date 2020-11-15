## 安装使用（Installation）
```
$ git clone https://github.com/Orange-way/hexo-theme-orange
```

修改（Change） config.yml中的 theme: orange

```

# 在归档页面显示所有文章 （Show all articles on archive page.）
# 需要安装(Need to install) hexo-generator-archive 插件支持
archive_generator:
    per_page: 0
    yearly: false
    monthly: false
    daily: false

# 自定义侧边栏
menu:
  Archives:
    widget: Archives
    link: /archives
  Lifes:
    name: lifes # category name
    widget: Lifes
    link: /categories/lifes
  Tags:
    widget: Tags
    link: /tags
```

## 侧边栏

```
# achieves
# categories/life
# tags
```

## 待完善功能 （More Functions）
- [x] 适配宽屏幕
- [ ] 修复分类页面
- [ ] 提高主题自定义程度
