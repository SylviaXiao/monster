<template>
    <div class="goodsinfo">
        <mt-swipe  :auto="5000">
            <mt-swipe-item v-for="item in  goodsImg" :key="item.id">
                <img :src="item.src" alt="" class="bannerimg">
            </mt-swipe-item>
        </mt-swipe>
        <h4> {{ goodsInfo.title}}</h4>
        <hr>
        <p><del>市场价：{{ goodsInfo.market_price}}</del> <strong>销售价：{{ goodsInfo.sell_price}}</strong></p>
        <p>购买数量</p>
        <div class="input">
            <button @click="reduce()">-</button>
            <input type="text" :value="num">
            <button @click="add()" >+</button>
        </div>
        <div>
            <mt-button  size="small" type="primary">立即购买</mt-button>
            <mt-button  size="small"  type="danger">加入购物车</mt-button>
        </div>
        <hr>
        <h4>商品参数</h4>
        <hr>
        <p>商品货号：{{ goodsInfo.goods_no}}</p>
        <p>库存情况:{{ goodsInfo.stock_quantity}}</p>
        <p>上架时间:{{ goodsInfo.add_time | dateFormat()}}</p>
        <div>
            <mt-button @click="flagdes=!flagdes" class="des" plain type="primary" size="large">图文介绍</mt-button>
            <div v-show="flagdes"  class="showinfo">
                <h4>{{ goodsInfo1.title}}</h4>
                <div v-html="goodsInfo1.content"></div>
            </div>
            <mt-button @click="flagcomt=!flagcomt"  plain type="danger" class="comt"  size="large">商品评论</mt-button>
            <!--//3.子组件站位-->
            <comments v-show="flagcomt" :cmts=" id "></comments>
        </div>
    </div>
</template>

<script>
    //1.引入子组件内容
    import comments from '../common/comments.vue'
    export default {
        name: "goodsInfo",
        //2.注册子组件
        components:{
            comments
        },
        data(){
            return {
                goodsImg:[],
                flagdes:false,
                flagcomt:false,
                goodsInfo1:{},
                goodsInfo:{},
                id:this.$route.query.id,
                url:this.$route.query.url,
                num:1,
                limit:1,
                description:'',
            }
        },
        created(){
            this.getgoodsInfo()
            this.getGoodsInfo1()
            this.getImg()
        },
        methods:{
            getgoodsInfo(){
                this.$axios.get('http://www.liulongbin.top:3005/api/goods/getinfo/'+this.id)
                    .then(result =>{
                        if(result.data.status===0){
                            this.goodsInfo=result.data.message[0];
                            this.limit=result.data.message[0].stock_quantity;
                        }
                    })
            },
            getGoodsInfo1(){
                this.$axios.get('http://www.liulongbin.top:3005/api/goods/getdesc/'+this.id)
                    .then(result =>{
                        if(result.data.status===0){
                            this.goodsInfo1=result.data.message[0];
                        }
                    })
            },
            add(){
                if(this.num>=this.limit)return  false;
                this.num++;
            },
            reduce(){
                if (this.num<=1) return this.num=1
                this.num--;
            },
            getImg(){
                this.$axios.get('http://www.liulongbin.top:3005/api/getthumimages/'+this.id)
                    .then(result =>{
                        if(result.data.status===0){
                            this.goodsImg=result.data.message;
                        }
                    })
            }
        }
    }
</script>

<style lang="less" scoped>
    div.showinfo{
        width: 100%;
        div{
            width: 100% !important;
        }
        img{
            width: 100% !important;
        }
    }
    img{
        width: 100%;
    }
.goodsinfo{
    .comt{
        margin: 15px 0 30px;
    }
    .des{
        img{
            width: 100%;
        }
    }
    div.input{
        margin-bottom: 20px;
        input,button{
            width: 30px;
            height: 33px;
            text-align: center;
            line-height: 20px;
            margin: 0 ;
            padding: 0;
        }
    }
    h4{
        font-size: 15px;
        color: #000;
        padding: 10px 0;
    }
    img{
        width: 100%;
    }
    p{
        display: block;
        margin: 10px 0;
        strong{
            color: red!important;
            font-size: 15px;
        }
        del{
            color: #ccc;
            font-size: 12px;
        }
    }
}
.mint-swipe{
    height: 240px;
}
.bannerimg{
    width: 100%;
    height: 100%;
}
</style>