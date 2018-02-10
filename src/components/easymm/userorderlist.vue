<template>
  <div style="background:#f7f7f7">
      <div id="head">
            <div @click="router('myHlsdd')" :class="{'red':type=='myHlsdd'}">护理师</div>
            <div @click="router('myServicedd')" :class="{'red':type=='myServicedd'}">管家服务</div>
      </div>
      <div id="body">
          <Hlsord v-if="type=='myHlsdd'"></Hlsord>
          <Serviceord v-if="type=='myServicedd'"></Serviceord>
      </div>
         
  </div>
</template>
<script>
import Hlsord  from './myHlsdd.vue';
import Serviceord from '../easybutler/myServicedd.vue'
export default {
     components: {
      Hlsord,
      Serviceord,
    }, 
    data () {
      return {
        type:'myHlsdd'
      }
    },
    mounted(){
      $("html,body").animate({ scrollTop: 0 }, 0);
      if (this.$route.query.type =='myServicedd') {
        this.type = 'myServicedd';
      }else{
         this.type = 'myHlsdd';
      }
    },
    methods: {
      router(x){
          this.type=x;
          this.$router.push({ name:'userorderlist',query:{type:x}})            

      }
    }
};
</script>
<style lang="less" scoped>
@import url(../../../static/css/easymm/userorderlist.less);
</style>

