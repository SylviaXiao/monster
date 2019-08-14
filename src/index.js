//1.导入vue插件
import Vue from 'Vue'
//4.导入mint-ui插件
import MintUI from 'mint-ui'
//5.导入mint-ui css文件
import 'mint-ui/lib/style.min.css'
//6.初始化MInt-UI
Vue.use(MintUI)
//7.导入mui插件
import './lib/mui/css/mui.min.css'
//9.导入mui扩展字体图标库
import './lib/mui/css/icons-extra.css'
//8.导入公共样式
import  './app.css'
//10.导入路由
import VueRouter from 'vue-router'
Vue.use(VueRouter)
import router from './router.js'
//2.导入主页
import App from './app.vue'
//导入axios
import axios from 'axios'
Vue.prototype.$axios=axios
//下载导入moment.js时间插件
import moment from 'moment'
// 设置全局过滤器格式化时间
Vue.filter('dateFormat',function (datastr,partern="YYYY-MM-DD HH:mm:ss") {
    return moment(datastr).format(partern)
})
//导入图片预览插件
import VuePreview from 'vue-preview'
Vue.use(VuePreview)
router.afterEach((to,from)=>{
    window.scrollTo(0,0)
})

//导入vuex
import Vuex from 'vuex'
Vue.use(Vuex)
//每次加载页面时, 先从本地缓存中获取数据
let car = JSON.parse(localStorage.getItem("shopCar")||'[]');
const store = new Vuex.Store({
    state:{
        car:car
    },
    mutations:{
        //1.点击加入购物车, 把数据保存到store的car中
        addToCar(state, goodsList){
            //分析: ①如果之前有对应的商品, 只需要更新数据,
            //      ②如果没有对应的, 直接把商品push进去
            let flag = true;
            state.car.forEach( item => {
                if(item.id == goodsList.id){
                    //更新数据
                    item.count += parseInt(goodsList.count);
                    flag = false;
                    return true;
                }
            })
            if(flag){
                //如果没有找到
                state.car.push(goodsList);
            }
            //把数据存储到本地缓存中去
            localStorage.setItem('shopCar',JSON.stringify(state.car));
        },
        //删除
        removeShoplist(state,id){
            state.car.forEach((item,index)=>{
                if(item.id==id){
                    state.car.splice(index,1);
                }
            })
            localStorage.setItem('shopCar',JSON.stringify(state.car));
            return true;
        },
        //点击切换购买状态
        toggleSelected(state,obj){
            state.car.forEach((item,index)=>{
                if(item.id==obj.id){
                    state.car[index].selected=obj.value;
                }
            })
            localStorage.setItem('shopCar',JSON.stringify(state.car));
            return true;
        },
        //设置count
        getSingleCount(state,obj){
            state.car.forEach((item,index)=>{
                if(item.id==obj.id){
                    state.car[index].count=obj.count
                }
            })
            localStorage.setItem('shopCar',JSON.stringify(state.car));
            return true;
        },

    },
    getters:{
        //设置徽标个数
        getAllCount(state){
            // state.car = JSON.parse(localStorage.getItem("shopCar"));
            let c=0;
            state.car.forEach(item=>{
                c+=item.count;
            })
            return c;
        },

        //设置商品数据的状态
        getGoodsSelected(state){
            // state.car = JSON.parse(localStorage.getItem("shopCar"));
            let selected={};
            state.car.forEach(item=>{
                selected[item.id]=item.selected;
                // selected[item.count]=item.count;
            })
            return selected;
        },
        //计算总价
        getTotal(state){
            let total={};
            total.count=0;
            total.amount=0;
            state.car.forEach((item,index)=>{
               if(item.selected){
                   total.count+=item.count;
                   total.amount+=item.count*item.price;
               }
            })
            return total;
        }
    },
})
//3.初始化Vue
new Vue({
    el:'#app',
    render: c=> c(App),
    router,
    store
})