<template>
    <div>
        <ul >
            <li  v-for="(item,index) in shopList" :key="item.id">
                   <div class="img"><mt-switch v-model="$store.getters.getGoodsSelected[item.id]"></mt-switch> <img  :src="item.thumb_path"></div>
                    <div class="body">
                        <h4>{{ item.title}}</h4>
                        <strong>{{ item.sell_price}}</strong>
                        <button>-</button>
                        <input type="text" :value="$store.state.car[index].count">
                        <button>+</button>
                        <a href="javascript:;" @click="removeShop(index,item.id)">删除</a>
                    </div>
            </li>
        </ul>
        <div class="total">
            <div>数量：{{ $store.getters.getTotal.count}}<strong></strong> 总价：{{ $store.getters.getTotal.amount}} <strong></strong></div>
            <div><button >购买</button></div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "shopcart",
        data(){
            return {
                shopList:[]
            }
        },
        created(){
            this.getShopList()
        },
        methods:{
            //渲染购物车页面
            getShopList(){
                let ids=[];

                this.$store.state.car.forEach(item=>{
                    ids.push(item.id)
                })
                this.$axios.get('http://www.liulongbin.top:3005/api/goods/getshopcarlist/'+ids.join(','))
                    .then(result =>{
                        console.log(result.data.message);
                        if(result.data.status===0){
                            this.shopList=result.data.message;
                        }
                    })
            },
            // 点击删除
            removeShop(index,id){
                this.shopList.splice(index,1);
                this.$store.commit('removeShoplist',id)
            },
            // 点击切换徽标状态
            // toggleShop(index,id){
            //     this.shopList[index].selected=!this.shopList[index].selected;
            //     this.$store.commit('toggleSelected',id)
            // },
        }
    }
</script>

<style lang="less" scoped>

  ul{
      padding: 0;
      li {
          padding: 20px;
          position: relative;
          background-color: #fff;
          overflow: hidden;
          div.img{
              position: absolute;
              left: 0;
              top: 0;
              width: 120px;
              .mint-switch{
                  margin: 0 auto;
                  display: inline-block;
              }
              img{
                  width: 60px;
              }
          }
          div.body{
              padding-left: 120px;
              width: 100%;
              input,button{
                  margin: 0;
                  padding: 0;
                  width: 20px;
                  height: 20px;
                  text-align: center;
                  border: 0;
                  background-color: #fff;
              }
              strong{
                  color: red;
                  font-size: 16px;
              }
              h4{
                  font-size: 13px;
              }
              a{
                  color: blue;
              }
          }
      }
  }
    .total{
        position: fixed;
        bottom: 50px;
        left: 0;
        display: flex;
        justify-content: space-between;
        div:nth-child(1){
            padding: 10px 20px;
            strong{
                padding-right: 20px;
                font-size: 15px;
                color: red;
            }
        }
        div:nth-child(2){
            text-align: right;
            button{
                padding: 10px 20px;
                background-color: red;
                color: #fff;
            }
        }
    }
</style>