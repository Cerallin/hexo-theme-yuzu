## 迁移指南

### npm依赖

与v2.x相比，v3.x使用`pug`模板引擎全面替换了原有的`ejs`。因此，需要安装pug的渲染器（renderer）。

```shell
npm install hexo-renderer-pug
npm remove hexo-render-ejs # 可选
```

### 主题配置

v3.x对`_config.yml`的配置项目做出了一些修改，请阅读对应版本的README修改您的配置。
