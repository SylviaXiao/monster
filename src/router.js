//1.导入路由
import VueRouter from 'vue-router'
//导入路由组件
import Home from './component/tabbar/home.vue'
import Member from './component/tabbar/member.vue'
import Shopcart from './component/tabbar/shopcart.vue'
import Search from './component/tabbar/search.vue'
import Newslist from './component/news/newslist.vue'
import Newsinfo from './component/news/newsinfo.vue'
import Comments from './component/common/comments.vue'
import PhotoList from './component/photos/photoList.vue'
import Photoinfo from './component/photos/photoinfo.vue'
import GoodsList from './component/goods/goodsList.vue'
import Goodsinfo from './component/goods/goodsinfo.vue'

//创建路由对象
const router =new VueRouter({
    routes:[
        {path:'/',redirect:'/home'},
        {path:'/home',component:Home},
        {path:'/member',component:Member},
        {path:'/shopcart',component:Shopcart},
        {path:'/search',component:Search},
        {path:'/home/newslist',component:Newslist},
        {path:'/home/newsinfo/:id',component:Newsinfo},
        {path:'/home/newsinfo/comments/',component:Comments},
        {path:'/home/photoList',component:PhotoList},
        {path:'/home/photoinfo/:id',component:Photoinfo},
        {path:'/home/goodsList',component:GoodsList},
        {path:'/home/goodsinfo/',component:Goodsinfo},
    ],
    // scrollBehavior (to, from, savedPosition) {
    //     return { x: 0, y: 0 }
    // },
    linkActiveClass:'mui-active'
})
export default router;
