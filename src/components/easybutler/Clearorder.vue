<template>
  <div>
      <div id="head">准确选择取消原因，可以帮助改进我们的服务</div>
      <div class="item" v-for="(item,key) in Data" :key="key" v-text="item" @click="Clear(key)"></div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Data: ""
    };
  },
  mounted() {
    $("html,body").animate({ scrollTop: 0 }, 0);
    let self = this;
    $.ajax({
      url: domain.Url + "app/easycomment/cancelorderlist",
      type: "get",
      data: {
        appToken: $.cookie("appToken"),
        id: this.$route.params.id
      },
      success: data => {
        console.log(data);
        if (data.isSuccess) {
          this.Data = data.result;
        }
      }
    });
  },
  methods: {
    Clear(key) {
      $.ajax({
        url: domain.Url + "app/easyStewardOrder/orderCancel",
        data: {
          orderId: this.$route.params.id,
          reason: this.Data[key],
          appToken:$.cookie('appToken')
        },
        success: data => {
            console.log(data)
          if (data.isSuccess) {
               this.$dialog.toast({
                    mes: "订单取消成功!",
                    timeout: 1500
                });
            if (this.$route.query.orgin == "orderdetail") {
              this.$router.replace({
                name: "serviceorder",
                params: {
                  id: this.$route.params.id
                },
                query: {
                  type: "orderxx"
                }
              });
            } else {
                this.$router.replace({
                name: "userorderlist",
                query: {
                  type: "myServicedd"
                }
              });
            }
          }
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
#head {
  height: 0.84rem;
  background: rgba(247, 98, 96, 0.6);
  font-family: PingFangSC-Regular;
  font-size: 0.28rem;
  color: #ffffff;
  letter-spacing: 0.04px;
  text-align: center;
  line-height: 0.84rem;
}
.item {
  height: 0.88rem;
  border-bottom: 0.02rem solid #f4f4f4;
  font-family: PingFangSC-Regular;
  font-size: 0.28rem;
  color: #333333;
  letter-spacing: 0.04px;
  line-height: 0.88rem;
  padding: 0 0.3rem;
  box-sizing: border-box;
}
</style>
