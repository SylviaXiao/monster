<template>
    <div>
        <h4 >{{  newsInfo.title }}</h4>
        <hr>
        <p>
            <span>发表时间: {{  newsInfo.add_time | dateFormat() }} </span>
            <span>点击次数:{{  newsInfo.click }}次</span>
        </p>
        <p v-html="newsInfo.content"></p>
        <hr>
        <!--//3.子组件站位-->
        <comments :cmts=" id "></comments>
    </div>
</template>

<script>
    //1.引入子组件内容
    import comments from '../common/comments.vue'
    export default {
        name: "newsinfo",
        //2.注册子组件
        components:{
            comments
        },
        data(){
            return {
                id: this.$route.params.id,
                newsInfo:{}
            };
        },
        created(){
            this.getInfo()
        },
        methods:{
            getInfo(){
                this.$axios.get('http://www.liulongbin.top:3005/api/getnew/'+this.id)
                    .then(result=>{
                        if(result.data.status===0){
                            this.newsInfo=result.data.message[0]
                        }
                    })
            }
        }
    }
</script>

<style scoped>

</style>