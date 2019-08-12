<template>
    <div>
        <ul class="goods">
            <router-link tag="li" v-for="(item,index) in goodsList" :key="item.id" :to="'/home/goodsinfo/?url='+item.img_url+'&id='+item.id">
                <div><img :src="item.img_url" alt=""></div>
                <h4>{{ item.title}}</h4>
                <p>
                    <strong>￥{{ item.sell_price}}</strong>
                    <del>￥{{ item.market_price}}</del>
                </p>
                <p>
                    <span>热卖中 </span>
                    <span>剩余{{ item.stock_quantity}}件</span>
                </p>
            </router-link>
            <mt-button @click="moregoods()" type="primary" size="large">点击加载更多</mt-button>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "goodsList",
        data(){
            return {
                goodsList:[],
                pageIndex:1
            }
        },
        created(){
            this.getgoods()
        },
        methods:{
            getgoods(){
                this.$axios.get('http://www.liulongbin.top:3005/api/getgoods?pageindex='+this.pageIndex)
                    .then(result =>{
                        if(result.data.status===0){
                            if(this.pageIndex>1){
                                result.data.message.forEach((item,index)=> {
                                    console.log(item);
                                    this.goodsList.push(item)
                                })
                            }else{
                                this.goodsList=result.data.message;
                            }
                            console.log(this.goodsList);
                        }
                    })
            },
            moregoods(){
                this.pageIndex++;
                this. getgoods()
            }
        }
    }
</script>

<style lang="less" scoped>
    .goods{
        padding: 0;
        li{
            height: 300px;
            float: left;
            box-shadow: 0 0 3px 3px #ccc;
            background-color: #EEEEEE;
            margin: 10px 5px;
            width: 47%;
            h4{
                font-size: 13px;
                color: #000;
                text-align: center;
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
    }
</style>