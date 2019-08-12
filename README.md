# 我系小妖怪项目具体步骤

##### 1.通过webpack配置相关参数

##### 2.在src文件下创建index.html,添加view 视图层

##### 3.在src文件夹创建app.vue文件----项目页面的主入口

##### 4.在src文件夹创建index.js

​     4.1.在index文件里面导入vue插件

```
import Vue from 'Vue'
```

​     4.2.在index文件里面导入主页

```
import App from './app.vue'
```

​     4.3.在index文件里面构建vue实例

```
new Vue({
    el:'#app',
    render: c=> c(App),
    router
})
```

​    4.4.在index文件里面导入mint-ui插件

```
//1.导入mint-ui插件
import MintUI from 'mint-ui'
//2.导入mint-ui css文件
import 'mint-ui/lib/style.min.css'
//3.初始化MInt-UI
Vue.use(MintUI)
```

​    4.5.在index文件里面导入mui插件

```
import './lib/mui/css/mui.min.css'
```

​    4.6.在index文件里面导入mui扩展字体图标库

```
import './lib/mui/css/icons-extra.css'
```

​    4.7.在index文件里面导入导入公共样式   

```
import  './app.css'
```

​    4.8.在index文件里面导入导入路由

```
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'
```

​    4.9.在Index页面初始化路由

##### 5.在compoment文件夹创建四个vue文件

---home,member,search,shopcart

这些文件都是单独的页面

##### 6.创建router.js文件

​     6.1在router.js页面导入路由

```
import VueRouter from 'vue-router'
```

​     6.2.导入路由组件

```
import Home from './component/tabbar/home.vue'
import Member from './component/tabbar/member.vue'
import Shopcart from './component/tabbar/shopcart.vue'
import Search from './component/tabbar/search.vue'
```

​     6.3创建路由对象

```
const router =new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:Home},
        {path:'/member',component:Member},
        {path:'/shopcart',component:Shopcart},
        {path:'/search',component:Search},
        {path:'/home/newslist',component:Newslist},
        {path:'/home/newsinfo/:id',component:Newsinfo},
        {path:'/home/newsinfo/comments/',component:Comments}
    ],
    linkActiveClass:'mui-active'
})
```

​     6.4导出路由对象

```
export default router;
```

##### 7.在页面中写页面内容

   头部,尾部,轮播图,六宫格

​    7.0.导入axios

```
import axios from 'axios'
Vue.prototype.$axios=axios
```

​    7.1.app页面创建头部和尾部

​    7.2.home页面用axios动态渲染轮播图

​    7.3.home页面渲染六宫格

##### 8.给新闻资讯添加路由

​     8.1创建news文件夹,并创建newslist文件

​     8.2创建newslist的路由

```
import Newslist from './component/news/newslist.vue'
{path:'/home/newslist',component:Newslist},
```

​     8.3.用axios动态渲染newslist页面

​     8.4创建newsinfo路由

```
import Newsinfo from './component/news/newsinfo.vue'
{path:'/home/newsinfo/:id',component:Newsinfo}
```

​     8.5.点击每条新闻跳转新闻详情页面

​     8.6.newsinfo页面用axios动态页面详情

​     8.7.改造a标签为router-link to到对应的新闻详情  传id

​     8.8.根据id渲染对应数据

​     8.9.分析: 评论数据公共的模板内容

​     8.10.创建子模板 

​     8.11.去父组件 ①引入 ②注册 components:{ comment },  ③调用组件名

​     8.12.父传子,  传id

​     8.13.渲染对应的评论内容

​     8.14.点击发表, 非空校验

​     8.15.点击加载更多, 显示拼接第二页的数据 