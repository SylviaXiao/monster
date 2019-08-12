<template>
    <div>
        <div class="photoInfo">
            <h4>{{ photoInfo.title}}</h4>
            <p>
                <span>发表时间: {{ photoInfo.add_time | dateFormat()}} </span>
                <span>点击次数:{{ photoInfo .click}}次</span>
            </p>
            <hr>
            <div class="thumbs">
                <vue-preview :slides="imgList" @close="handleClose"></vue-preview>
            </div>
            <p class="con" v-html="photoInfo.content"></p>
        </div>
        <!--//3.子组件站位-->
        <comments :cmts=" id "></comments>
    </div>
</template>

<script>
    //1.引入子组件内容
    import comments from '../common/comments.vue'
    export default {
        name: "photoinfo",
        //2.注册子组件
        components:{
            comments
        },
        data(){
            return{
                id: this.$route.params.id,
                photoInfo:{},
                imgList:[]
            }
        },
        created(){
            this.getPhotoInfo()
            this.getThumbs()
        },
        methods:{
            getPhotoInfo(){
                this.$axios.get('http://www.liulongbin.top:3005/api/getimageInfo/'+this.id)
                    .then(result=>{
                        if(result.data.status===0){
                            this.photoInfo=result.data.message[0];
                        }
                    })
            },
            getThumbs(){
                this.$axios.get('http://www.liulongbin.top:3005/api/getthumimages/'+this.id)
                    .then(result=>{
                        if(result.data.status===0){
                            result.data.message.forEach(item=>{
                                item.msrc=item.src;
                                item.w=600;
                                item.h=600;
                            })
                            this.imgList=result.data.message;
                        }
                    })
            },
            handleClose () {
                console.log('close event')
            }
        }
    }
</script>

<style lang="less" scoped>

</style>