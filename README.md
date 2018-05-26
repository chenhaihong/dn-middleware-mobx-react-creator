---
group: middleware
name: mobx-react-creator
title: 模板文件生成器
---

# dn-middleware-mobx-react-creator

与 [dn-template-mobx-react](https://www.npmjs.com/package/dn-template-mobx-react) 模板配套使用的模板文件生成器。

## 一、添加使用配置

在 `.dawn/pipe.yml` 文件中加入以下配置：
```sh
create:
  - name: mobx-react-creator
```

## 二、生成模板

```sh
$ dn run create
```

出现如下的选择菜单，选择一个要生成模板类型，然后，按照提示操作就行。
```sh
? 选择一个模板： (Use arrow keys)
❯ 1.component
  2.controller
  3.mock
  4.model
  5.page
  6.service
```
## 三、开启 GUI

修改成以下配置：
```sh
create:
  - name: mobx-react-creator
    gui: true, # 开启gui，通过网页创建模板，默认不开启
    port: 8000 # 指定GUI服务端口，如果随机寻找一个可用端口
```

开启 gui 后，可以在网页上创建模板。

![111](./images/gui.png)