<template>
  <div style="background:#f7f7f7">
      <div>
          <div id="orderhead" v-if="Bol">
            <div @click="router('orderxx')" :class="{'red':type=='orderxx'}">订单详情</div>
            <div @click="router('orderpro')" :class="{'red':type=='orderpro'}">订单进度</div>
          </div>
          <div id="headzw" v-if="Bol"></div>
          <order @childToParentMsg="showChildToParentMsg" v-if="type=='orderxx'"></order>
          <orderpro v-if="type=='orderpro'"></orderpro>          
      </div>

  </div>
</template>
<script>
import order from "./orderdetail.vue";
import orderpro from "./orderpro.vue";
export default {
  components: {
    order,
    orderpro
  },
  data() {
    return {
      type: "orderxx",
      Bol: false
    };
  },
  mounted() {
    $("html,body").animate({ scrollTop: 0 }, 0);
    if (this.$route.query.type =='orderpro') {
      this.type = this.$route.query.type;
      this.$dialog.toast({
        mes: "修改成功!",
        timeout: 1500
      });
    }
  },
  methods: {
    router(type) {
      this.type = type;
    },
    showChildToParentMsg(type) {
      if (type == 2) {
        this.Bol = true;
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../../static/css/easymm/Orderdetail.less);
</style>
