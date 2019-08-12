<template>
    <div>
        <mt-swipe  :auto="5000">
            <mt-swipe-item v-for="item in banner" :key="item.id">
                <img :src="item.img" alt="" class="bannerimg">
            </mt-swipe-item>
        </mt-swipe>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
            <router-link to="/home/newslist" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu1.png" alt="">
                <div class="mui-media-body">新闻资讯</div></a></router-link>
            <router-link to="/home/photoList" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu2.png" alt="">
                <div class="mui-media-body">图片分享</div></a></router-link>
            <router-link to="/home/goodsList" class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu3.png" alt="">
                <div class="mui-media-body">商品购买</div></a></router-link>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu4.png" alt="">
                <div class="mui-media-body">留言反馈</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu5.png" alt="">
                <div class="mui-media-body">视频专区</div></a></li>
            <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><a href="#">
                <img src="../../images/menu6.png" alt="">
                <div class="mui-media-body">联系我们</div></a></li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "home",
        data(){
            return {banner:''}
        },
        created(){
            this.getBanner();
        },
        methods:{
            getBanner(){
                this.$axios.get('http://www.liulongbin.top:3005/api/getlunbo')
                    .then(result=>{
                        if(result.data.status===0){
                            this.banner=result.data.message
                        }
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
.mint-swipe{
    height: 150px;
}
    .bannerimg{
        width: 100%;
        height: 100%;
    }
    .mui-table-view-cell{
        img{
            width: 60%;
        }
    }
</style>