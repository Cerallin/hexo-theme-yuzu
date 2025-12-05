# Hexo-Theme-Yuzu

![GitHub release](https://img.shields.io/github/v/release/Cerallin/hexo-theme-yuzu?sort=semver)
![Node.js Version](https://img.shields.io/badge/nodejs-20.x%20|%2022.x%20|%2024.x-brightgreen)
![License](https://img.shields.io/github/license/Cerallin/hexo-theme-yuzu)
![GitHub Repo stars](https://img.shields.io/github/stars/Cerallin/hexo-theme-yuzu)
![Last Commit](https://img.shields.io/github/last-commit/Cerallin/hexo-theme-yuzu)
![CI](https://img.shields.io/github/actions/workflow/status/Cerallin/hexo-theme-yuzu/buildtest.yml)

本项目从 [hexo-theme-orange](https://github.com/Orange-way/hexo-theme-orange) fork 出来，鉴于无法找到原作者联系方式，本项目将由[Cerallin](https://github.com/Cerallin)继续维护。

**当前分支为 v3.x 版本**，使用pug代替ejs作为模板引擎。

**注意** 从v2.x迁移到v3.x，请参考[迁移指南](docs/migrate.md)。鼠标悬停在网页页脚`Theme Yuzu`上可以查看当前主题版本。

## 安装使用

1. 安装主题与必要的依赖

```shell
# 在hexo网站源码目录下执行
$ npm i hexo-renderer-pug
$ mkdir -p themes && cd themes
$ git clone https://github.com/Cerallin/hexo-theme-yuzu
```

2. 修改网站根目录下的 `config.yml`。

将 `config.yml` 中 `theme` 字段改为 `hexo-theme-yuzu`。将主题文件夹下 `_root_config_example.yml` 的内容添加到 `config.yml` 中。

3. 根据自己的需要修改主题配置

**In case you didn't know** 你可以创建一个`_config.[theme name].yml`文件来覆盖主题的默认设置。对于上述安装方法来说，就是`_config.hexo-theme-yuzu.yml`。

## 示例网站

- 主题展示网站：[cerallin.github.io](https://cerallin.github.io)
- 学术写作指南：[一篇博客](https://cerallin.github.io/notes/2021/12/12/%E5%A6%82%E4%BD%95%E9%85%8D%E7%BD%AE%E4%B8%80%E4%B8%AA%E5%AD%A6%E6%9C%AF%E5%86%99%E4%BD%9C%E5%8D%9A%E5%AE%A2/)

什么？你问我小说站在哪？我才不会告诉你呢(/ω•＼*)。

## 特色
- 黑白色调，风格质朴简约。
- 针对文章创作优化，学术博客也是可以的 (?)。
- 支持深色模式，自适应电脑/手机深浅色模式。

## 功能
- 支持分页（hexo-generator-*）
- 适配搜索（hexo-generator-search）
- 支持显示 CC（Creative Commons）版权声明
- 文章文字两端对齐
- 适配学术写作（pandoc）

## 禁止用户复制粘贴网页内容

**注** 本选项仅为君子协定，通过插件可以轻易破解。
将主题配置文件中的`selectable`值改为`false`。

## 深色模式

将主题配置文件中的`dark_mode`值改为`true`。

## 文章可选开启评论

当配置文件中`comment`设置为`true`时，可在文章的Front-matter中使用`comments: true/false`来控制评论功能的开启或关闭。

## 学术写作指南

**注意** 如果不想做交叉引用可以跳过本章。

首先安装`hexo-renderer-pandoc`，然后安装`pandoc`和`pandoc-crossref`。

`_config.yml`里相关配置如下：
```yaml
pandoc:
  pandoc_path: pandoc
  extra:
    - filter: pandoc-crossref
    - csl: ieee.csl
    - citeproc: # Just leave it here
  meta:
    - link-citations: true
    - crossrefYaml: _crossref.yml
```

其中最后一行的意思是`_crossref.yml`是`pandoc-crossref`的配置文件，部分内容如下。

```yaml
# Options for pandoc-crossref
# Docs: http://lierdakil.github.io/pandoc-crossref/
# Source: https://github.com/lierdakil/pandoc-crossref

titleDelim: ":"

figureTitle: "图"
figPrefix: "图"
# 图1: 图标题
figureTemplate: $$figureTitle$$$$i$$$$titleDelim$$ $$t$$
figPrefixTemplate: $$p$$$$i$$

tableTitle: "表"
tblPrefix: "表"
# 表1: 表标题
tableTemplate: $$tableTitle$$$$i$$$$titleDelim$$ $$t$$
tblPrefixTemplate: $$p$$$$i$$

eqnTitle: "式"
eqnPrefix: "式"
# 式(1)
eqnTemplate: $$eqnTitle$$($$i$$)
eqnPrefixTemplate: $$p$$($$i$$)
# 公式template
equationNumberTeX: \\tag
eqnIndexTemplate: $$i$$

linkReferences: true
nameInLink: true
```

[一些有用的cheatsheets](docs/writing.md)。

### 推荐插件

- hexo-filter-mathjax: 渲染生成mathjax公式；
- [hexo-filter-text-autospace](https://github.com/cerallin/hexo-filter-text-autospace): 为中文段落中的英文自动添加间距。
- hexo-clean-css：缩小生成的CSS文件的体积。由于Stylus自身的限制，本主题的CSS文件大小有很大的缩减空间。

## [辅助工具类](./docs/helpers.md)

本主题提供了一些类似tailwind css的辅助工具类。

例如，通过`text-{left|right|justify}`控制文字对齐，使用 `m{t|r|b|l}-{size}` 功能类控制元素一侧的外边距等等。

详细介绍请移步[这里](./docs/helpers.md)。

## TODOs

- [ ] 整理主题变量
- [ ] 重构模板布局，优化模板缓存
- [ ] 开发“关于”页的模板
- [ ] 更多动画
- [ ] 更多的helpers类

## License

This project is under MIT License.

    Copyright (c) 2021-2024 Cerallin   <cerallin@cerallin.top>

    Permission is hereby granted, free of charge, to any person obtaining a copy
    of this software and associated documentation files (the "Software"), to deal
    in the Software without restriction, including without limitation the rights
    to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
    copies of the Software, and to permit persons to whom the Software is
    furnished to do so, subject to the following conditions:

    The above copyright notice and this permission notice shall be included in all
    copies or substantial portions of the Software.

    THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
    IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
    FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
    AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
    LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
    OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
    SOFTWARE.

### Bootstrap icons

Part of [Bootstrap opensource SVG icon library](https://github.com/twbs/icons) is used in this project, which is under MIT license.

### Clipboard.js

[Clipboard.js](https://github.com/zenorocha/clipboard.js) is used in this project, which is under MIT license.

### Smooth-corners.js

[Smooth-corners.js](https://github.com/wopian/smooth-corners) is used in this project, which is under MIT license.
