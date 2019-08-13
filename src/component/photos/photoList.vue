<template>
    <div class="box">
        <!--//顶部滑动区域-->
        <div id="slider" class="mui-slider" data-slider="4">
            <div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted mui-segmented-control-primary">
                    <div class="mui-scroll">
                        <a  href="javascript:;"v-for="(item,index) in cateNav" :key="item.id"  @click="getCateList(item.id)" >
                            {{ item.title }}
                        </a>
                    </div>
            </div>
        </div>
        <div>
            <router-link tag="li"  class="pl-out" v-for="(item,index) in cateList" :key="item.id" :to="'/home/photoinfo/'+item.id">
                <img  v-lazy="item.img_url"  alt="">
                <div class="descript">
                    <h3>{{ item.title}}</h3>
                    <p>{{ item.zhaiyao}}</p>
                </div>
            </router-link>
        </div>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        name: "photoList",
        data(){
            return {
                cateNav:[],
                cateList:[]
            }
        },
        mounted(){
            mui('.mui-scroll-wrapper').scroll({
                scrollX: true, //是否竖向滚动
                scrollY: false, //是否横向滚动
                deceleration:0.0006, //阻尼系数,系数越小滑动越灵敏
                bounce: true //是否启用回弹
            });
        },
        created(){
            this.getCatenav()
            this. getCateList(0)
        },
        methods:{
            getCatenav(){
                this.$axios.get('http://www.liulongbin.top:3005/api/getimgcategory')
                    .then(result =>{
                        if(result.data.status===0){
                            this.cateNav=result.data.message;
                            this.cateNav.unshift({ title:"全部", id:0 })
                        }
                    })
            },
            getCateList(cateid){
                this.$axios.get('http://www.liulongbin.top:3005/api/getimages/'+cateid)
                    .then(result =>{
                        if(result.data.status===0){
                            this.cateList=result.data.message;
                        }
                    })
            }
        }
    }
</script>

<style lang="scss" scoped>
    .mui-scroll{
        padding:10px 7px 0 5px ;
        a{
        margin-right: 10px;
            font-size: 14px;
    }
    }
.pl-out{
    position: relative;
    width: 95%;
    box-shadow:  0 0 5px 5px #ccc;
    margin: 20px auto;
    img[lazy=loading] {
        width: 100%;
        margin: auto;
    }
    img{
        width: 100%;
    }
    .descript{
        position: absolute;
        bottom: 0;
        left: 0;
        h3 {
            text-align: center;
            font-size: 13px;
            color: #fff;
        }
        p{
            text-align: center;
            font-size: 13px;
            color: #fff;
        }

    }
}
</style>