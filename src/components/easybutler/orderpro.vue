<template>
  <div style="background-color:#fff"> 
      <div id="head">
          <h1 v-text="Data.name"></h1>
          <pre v-html="Data.introduce"></pre>
      </div>
      <div id="body">
          <div v-for="(item,key) in Data.list" :key="key" class="Dateitem">
              <div class="Date">
                  <div class="Date1">
                      <div>
                          <span>{{item.serviceTime.slice(8,10)}}</span>
                          <span>/{{item.serviceTime.slice(5,7)}}</span>
                      </div>
                      <div>{{item.serviceTime.slice(0,4)}}年</div>
                  </div>
                  <div class="Date2">
                      <div v-text="item.weekStr"></div>
                      <div v-text="item.serviceTime"></div>
                  </div>
              </div>
              <div class="servicezt">
                  <div v-if="item.status==40">待服务</div>
                  <div v-if="item.status==60">待评价</div>
                  <div v-if="item.status==70">已完成</div>
                  <div v-if="item.status==40" @click="xgtime(item.id)">修改时间</div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data () {
      return {
          Data:''
    }
  },
  mounted () {
      $("html,body").animate({ scrollTop: 0 }, 0);
      let self=this;
      $.ajax({
          url:domain.Url+'app/easyStewardOrder/loadOrderSchedule',
          data:{
               appToken: $.cookie("appToken"),
               orderId: this.$route.params.id
          },
          success:(data)=>{
              console.log(data)
              if(data.isSuccess){
                  self.Data=data.result;
              }
          }
      })
  },
  methods: {
      xgtime(id){
          this.$router.push({
            name: "Choicetime",
            params: {
            id: id,
            type: 0,
            price: 0,
            Date: 0,
            spe: 0,
            Coupon: 0,
            style: "schedule"
            },
            query:{
                orderId:this.$route.params.id
            }
        });
      }
  }
}
</script>
<style lang="less" scoped>
@import url(../../../static/css/easybutler/orderpro.less);
</style>
