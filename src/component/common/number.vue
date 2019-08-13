<template>
    <div>
        <div class="mui-numbox" data-numbox-step='1' data-numbox-min='1' :data-numbox-max='maxnum'>
            <button class="mui-btn mui-numbox-btn-minus" type="button">-</button>
            <input class="mui-numbox-input" type="number" ref="num" @change="countChange()"/>
            <button class="mui-btn mui-numbox-btn-plus" type="button">+</button>
        </div>
    </div>
</template>

<script>
    import mui from '../../lib/mui/js/mui.min.js'
    export default {
        name: "number",
        mounted(){
            mui('.mui-numbox').numbox()
        },
        props:['maxnum'],
        methods:{
            countChange(){
                this.$emit('getCount',parseInt(this.$refs.num.value))
            }
        },
        watch:{
            "maxnum"(newmax,oldmax){
                mui('.mui-numbox').numbox().setOption('max',newmax)
                console.log("新的"+this.maxnum);
            }
        },
    }
</script>

<style scoped>

</style>