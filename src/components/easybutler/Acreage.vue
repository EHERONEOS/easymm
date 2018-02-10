<template>
  <div style="background:#f4f4f4">
      <div id="head">
          <div class="title" v-text="Data.name"></div>
          <div class="content" v-text="Data.introduce"></div>
          <div class="input">
              <input type="number" v-model="acrage" @input="price">
          </div>
      </div>
      <div id="body">
          <div class="title">服务清单</div>
          <div class="item">
              <span>清洗单价:</span>
              <span>{{Data.originalPrice}}元/平米</span>
          </div>
          <div class="item">
              <span>优惠价：</span>
              <span style="color:#f76260">{{Data.price}}元/平米</span>
          </div>
          <div class="item">
              <span>总面积:</span>
              <span>{{Data.count}}平米</span>
          </div>
          <div class="item">
              <span>本次服务总价:</span>
              <span>{{Data.allServiceMony}}元</span>
          </div>
          <div class="item">
              <span>预付款:</span>
              <span>{{Data.payMoney}}元</span>
          </div>
      </div>
      <div id="foot">
          <span>本次支付:<span style="color:#f76260">{{Data.shouldPayMoney}}元</span></span>
          <div @click="alipy">去支付</div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      acrage: 10,
      Data: ""
    };
  },
  mounted() {
    $("html,body").animate({ scrollTop: 0 }, 0);
    this.price();
  },
  methods: {
    price() {
      if (this.acrage < 10) {
        return this.$dialog.toast({
          mes: "面积必须大于或等于10",
          timeout: 1500
        });
      } else {
        $.ajax({
          url: domain.Url + "app/easyStewardOrder/modifyAmount",
          data: {
            count: this.acrage,
            orderId: this.$route.params.id,
            appToken: $.cookie("appToken")
          },
          success: data => {
            if (data.isSuccess) {
              this.Data = data.result;
            }
          }
        });
      }
    },
    alipy() {
      let Data = {
        type: "Service",
        orderId: this.$route.params.id,
        appToken: $.cookie("appToken")
      };
      Data = JSON.stringify(Data);

      let redirect_uri =
        "http://www.qsmam.com/mobile/weixinH5/page/payment.html?Data=" + Data;
      redirect_uri = encodeURI(redirect_uri);
      //授权地址
      let Url =
        "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5db600fa5c3a6eb2&redirect_uri=" +
        redirect_uri +
        "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
      location.href = Url;
    }
  }
};
</script>
<style lang="less" scoped>
#head {
  padding: 0.4rem 0.3rem;
  box-sizing: border-box;
  background: #ffffff;
  font-family: PingFangSC-Regular;
  color: #333333;
  letter-spacing: 0.04px;
  .title {
    font-size: 0.48rem;
    margin-bottom: 0.2rem;
  }
  .content {
    font-size: 0.36rem;
    margin-bottom: 0.3rem;
  }
  .input {
    width: 3.2rem;
    height: 0.7rem;
    border-bottom: 0.02rem solid #ddd;
    font-size: 18px;
    color: #f76260;
    input {
      font-size: 18px;
      color: #f76260;
      border: none;
      outline: none;
    }
  }
}
#body {
  padding: 0.4rem 0.3rem 0;
  box-sizing: border-box;
  background: #ffffff;
  font-family: PingFangSC-Regular;
  letter-spacing: 0.03px;
  margin-bottom: 1.1rem;
  .title {
    font-size: 0.36rem;
    color: #333333;
    margin-bottom: 0.2rem;
  }
  .item {
    height: 1rem;
    border-bottom: 0.02rem solid #f4f4f4;
    font-size: 0.28rem;
    color: #666666;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
}
#foot {
  height: 0.96rem;
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-family: PingFangSC-Regular;
  font-size: 0.36rem;
  color: #000000;
  letter-spacing: 0.02px;
  line-height: 25px;
  width: 100%;
  background: #ffffff;
  position: fixed;
  bottom: 0;
  div {
    color: #ffffff;
    width: 2.5rem;
    height: 0.96rem;
    line-height: 0.96rem;
    text-align: center;
    background: #f76260;
    margin-left: 0.4rem;
    cursor: pointer;
  }
}
</style>
