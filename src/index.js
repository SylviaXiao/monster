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
//3.初始化Vue
new Vue({
    el:'#app',
    render: c=> c(App),
    router
})