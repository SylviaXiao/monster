<template>
    <div>
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in news" :key="item.id">
                <router-link :to="'/home/newsinfo/'+item.id" class="">
                    <img class="mui-media-object mui-pull-left" :src="item.img_url">
                    <div class="mui-media-body">
                        <h4>{{ item.title}}</h4>
                        <p>
                            <span>发表时间: {{ item.add_time | dateFormat('YYYY-MM-DD')}} </span>
                            <span>点击次数:{{ item .click}}次</span>
                        </p>
                    </div>
                </router-link>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: "newslist",
        data(){
            return {news:[]}
        },
        created(){
            this.getNews();
        },
        methods:{
            getNews(){
                this.$axios.get('http://www.liulongbin.top:3005/api/getnewslist')
                    .then(result=>{
                        if(result.data.status===0){
                            this.news=result.data.message
                        }
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
.mui-table-view{
    li{
        a{
            div{
                h4{
                    font-size: 14px;
                }
                p{
                    display: flex;
                    justify-content: space-between;
                    span{
                        color: #0078D7;
                    }
                }
            }
        }
    }
}
</style>