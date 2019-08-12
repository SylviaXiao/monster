<template>
    <div>
        <ul >
            <li  v-for="(item,index) in shopList" :key="item.id">
                   <div class="img"><mt-switch v-model="value"></mt-switch> <img  :src="item.thumb_path"></div>
                    <div class="body">
                        <h4>{{ item.title}}</h4>
                        <strong>{{ item.sell_price}}</strong>
                        <button>-</button>
                        <input type="text" :value="item.cou">
                        <button>+</button>
                        <a href="javascript:;">删除</a>
                    </div>
            </li>
        </ul>
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
            getShopList(){
                this.$axios.get('http://www.liulongbin.top:3005/api/goods/getshopcarlist/87,88,89')
                    .then(result =>{
                        console.log(result.data.message);
                        if(result.data.status===0){
                            this.shopList=result.data.message;
                        }
                    })
            }
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
              h4{
                  font-size: 13px;
              }
              a{
                  color: blue;
              }
          }
      }
  }
</style>