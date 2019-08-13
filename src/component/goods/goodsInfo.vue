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
        <number :id="ids" :nums="nums" :maxnum="goodsInfo.stock_quantity" @getCount="getCount"></number>
        <!--<div class="input">-->
            <!--<button @click="reduce()">-</button>-->
            <!--<input type="text" :value="num">-->
            <!--<button @click="add()" >+</button>-->
        <!--</div>-->
        <div class="buy">
            <mt-button  size="small" type="primary">立即购买</mt-button>
            <mt-button  size="small"  type="danger" @click="addcart">加入购物车</mt-button>
            <transition
                    @before-enter="beforeEnter"
                    @enter="enter"
                    @after-enter="afterEnter">
                <div @transitionend="end" class="ball" v-show="flag"></div>
            </transition>
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
            <mt-button @click="flagcomt=!flagcomt"   plain type="danger" class="comt"  size="large">商品评论</mt-button>
            <!--//3.子组件站位-->
            <comments v-show="flagcomt" :cmts=" id "></comments>
        </div>
    </div>
</template>

<script>
    //1.引入子组件内容
    import comments from '../common/comments.vue'
    import number from '../common/number.vue'
    export default {
        name: "goodsInfo",
        //2.注册子组件
        components:{
            comments,
            number,
        },
        data(){
            return {
                ids:0,
                nums:1,
                isShow: false,
                flag: false,
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
            addcart(){
                if(this.isShow) return false;
                this.flag = !this.flag ;
                let goodsList={
                    id:this.id,
                    count:this.num,
                    price:this.goodsInfo.sell_price,
                    selected:true
                }
                this.$store.commit('addToCar',goodsList)
            },
            /*********************************************************************************/
            beforeEnter(el){
                //动画入场前, 设置动画的起始样子
                console.log(this.isShow);
                if(this.isShow) return false;
                this.isShow = true;
                el.style.transform = "translate(0, 0)";
            },
            enter(el, done){
                // if(this.isShow) return false;
                //正在入场的状态, 设置小球之后的样子
                //强制触发动画刷新
                el.offsetWidth;
                let ball=document.querySelector('.ball').getBoundingClientRect()
                let badge=document.querySelector('.mui-badge').getBoundingClientRect()
                // console.log(ball.top+ball.left);
                let x=badge.left-ball.left,
                    y=badge.top-ball.top;
                el.style.transition="all 2s cubic-bezier(0.4, -0.3, 1, 0.6)";
                el.style.transform =`translate(${x}px, ${y}px)`;
                //为了直接执行完enter()函数后立即调用afterEnter
                done();
            },
            afterEnter(){
                //入场之后
                this.flag = !this.flag;
            },
            //监听过渡完成
            end(){
                // console.log('done');
                this.isShow = false;
            },
            /*************************************************************************************/
            getCount(val){
                // console.log('我的value值是'+val);
                this.num=val.value;
            },
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
            // add(){
            //     if(this.num>=this.limit)return  false;
            //     this.num++;
            // },
            // reduce(){
            //     if (this.num<=1) return this.num=1
            //     this.num--;
            // },
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
.buy{
    position: relative;
}
    .ball{
        width: 15px;
        height: 15px;
        background-color: red;
        border-radius: 50%;
        position: absolute;
        top: 10px;
        left: 130px;
    }
</style>