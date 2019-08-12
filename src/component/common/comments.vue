<template>
    <div>
        <div>
            <h4>评论中心</h4>
            <textarea name="" id="" cols="5" rows="5" v-model="addComts"></textarea>
            <mt-button @click="addComments()" type="primary" size="large">点击评论</mt-button>
            <div class="cmt-list" v-for="(item,index) in comments ">
                <div class="cmt-item">
                    <div class="cmt-title">
                        第{{ index+1 }}楼 用户 ：{{ item.user_name }}
                    </div>
                    <div class="cmt-body">
                        {{ item.content }}
                    </div>
                    <div class="cmt-time">发表时间 ：{{ item.add_time | dateFormat }}</div>
                </div>
            </div>
            <mt-button @click="moreComments()" type="primary" size="large">点击加载更多</mt-button>
        </div>
    </div>
</template>

<script>
    import { Toast } from 'mint-ui';
    export default {
        name: "comments",
        data(){
            return {
                comments:[],
                addComts:'',
                pageindex:1
            }
        },
        props:["cmts"],
        created(){
            this.getComments();
        },
        methods:{
            getComments(){
                this.$axios.get('http://www.liulongbin.top:3005/api/getcomments/'+this.cmts+'?pageindex='+this.pageindex)
                    .then(result=>{
                        if(result.data.status===0){
                            this.comments=result.data.message
                        }
                    })
            },
            addComments(){
                this.$axios.post('http://www.liulongbin.top:3005/api/postcomment/'+this.cmts,{
                    content:this.addComts
                })
                    .then(result=>{
                        if(!this.addComts){
                            Toast({
                                message: '请输入评论内容',
                                position: 'bottom',
                                duration: 5000
                            });
                            return false;
                        }
                        if(result.data.status===0){
                            Toast({
                                message: result.data.message,
                                position: 'bottom',
                                duration: 5000
                            });
                            this.addComts='';
                            this.getComments()
                        }
                    })
            },
            moreComments(){
                this.pageindex++;
                this.$axios.get('http://www.liulongbin.top:3005/api/getcomments/'+this.cmts+'?pageindex='+this.pageindex)
                    .then(result=>{
                        if(result.data.status===0){
                            result.data.message.forEach((item,index)=> {
                                console.log(item);
                                this.comments.push(item)
                            })
                        }
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
.cmt-item{
    border: 1px solid #ccc;
    background-color: #298067;
    border-radius: 10px;
    margin: 15px 10px;
    padding: 5px;
    color: #fff;
    font-size: 13px;
    div{
        margin: 5px 0;
    }
}
</style>