<template>
  <div style="background:#f4f4f4">
      <div id="head">
          <input type="text" placeholder="请输入兑换码" v-model="code">
          <button @click="Dh">兑换</button>
      </div>
      <div id="Couponarr" v-if="Data">
          <div class="Couponitem" v-for="(item,key) in Data" :key="key" @click="Coupon(item.id,item.money,item.rule,item.subtract)">
            <div class="Couponl">
              <div class="price" v-text="(item.subtract*10)+'折'" v-if="item.rule=='zhekou'"></div>
              <div class="price" v-text="item.subheading" v-else-if="item.rule=='mianfei'"></div>
              <div class="price" v-text="'￥'+item.money" v-else></div>
              <div class="Couponxx">
                <div class="Coupontit" v-text="item.name"></div>
                <div class="Coupontit2" v-text="item.subheading"></div>
                <img src="../../../static/img/easybutimg/Couponxx.png" alt="">
                <div class="Coupontit3" v-if="!item.eAging">长期有效</div>
              </div>
            </div>
            <div class="Coupon2">
              <div>立即</div>
              <div>使用</div>
            </div>
          </div>
      </div>
      <div id="body" v-else>
          <img src="../../../static/img/easybutimg/noConpon.png" alt="">
      </div>
      
  </div>
</template>
<script>
export default {
  data() {
    return {
      code: "",
      Data: ""
    };
  },
  mounted() {
    $("html,body").animate({ scrollTop: 0 }, 0);
    this.Couponload();
  },
  methods: {
    Couponload() {
      let self = this;
      $.ajax({
        url: domain.Url + "app/coupon/load/onorderproject",
        data: {
          id: this.$route.params.id,
          type: this.$route.params.style,
          appToken: $.cookie("appToken")
        },
        success: data => {
          console.log(data);
          if (data.isSuccess) {
            self.Data = data.result;
          }
        }
      });
    },
    Dh() {
      let self = this;
      $.ajax({
        url: domain.Url + "app/coupon/conversion",
        data: {
          code: self.code,
          channels: "onself",
          appToken: $.cookie("appToken")
        },
        success: data => {
          if (data.isSuccess) {
            self.Couponload();
          } else {
            this.$dialog.toast({
              mes: data.message,
              timeout: 1500
            });
          }
        }
      });
    },
    Coupon(id, price,rule,zhekou) {
      let Coupon = {
        id: id,
        price: price,
        rule:rule,
        zhekou:zhekou
      };
      if (this.$route.params.id != 0) {
        if (this.$route.params.style == "service") {
          this.$router.push({
            name: "appointment",
            params: {
              id: this.$route.params.id,
              type: this.$route.params.type,
              price: this.$route.params.price,
              Date: this.$route.params.Date,
              spe: this.$route.params.spe,
              Coupon: JSON.stringify(Coupon),
              style: this.$route.params.style
            }
          });
        } else {
          this.$router.push({
            name: "suitappointment",
            params: {
              id: this.$route.params.id,
              type: this.$route.params.type,
              price: this.$route.params.price,
              Date: this.$route.params.Date,
              spe: this.$route.params.spe,
              Coupon: JSON.stringify(Coupon),
              style: this.$route.params.style
            }
          });
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
#head {
  padding: 0.4rem 0.3rem;
  box-sizing: border-box;
  background: #ffffff;
  display: flex;
  justify-content: space-between;
  font-family: PingFangSC-Regular;
  font-size: 0.28rem;
  color: #999999;
  letter-spacing: 0.03px;
  input {
    width: 5.1rem;
    height: 0.88rem;
    border: 0.02rem solid #f4f4f4;
    border-radius: 0.06rem;
    padding-left: 0.2rem;
  }
  button {
    width: 1.6rem;
    height: 0.88rem;
    background: #ed5e5c;
    border-radius: 0.06rem;
    border: none;
    color: #ffffff;
     cursor: pointer;
  }
}
#body {
  text-align: center;
  margin-top: 1.16rem;
  img {
    width: 4.8rem;
    height: 4.8rem;
  }
}
.Couponitem {
  width: 7.1rem;
  height: 1.86rem;
  // margin-top: .2rem;
  margin: 0.2rem auto 0;
  display: flex;
  justify-content: center;
   cursor: pointer;
  .Couponl {
    padding: 0.2rem 0 0 0.3rem;
    box-sizing: border-box;
    width: 5.46rem;
    height: 100%;
    background: url(../../../static/img/easybutimg/Couponl.png);
    background-size: 100% 100%;
    display: flex;
    .price {
      font-family: PingFangSC-Regular;
      font-size: 0.48rem;
      color: #333333;
      letter-spacing: 0.02px;
      margin-right: 0.4rem;
      width: 1.5rem;
      text-align: center;
    }
    .Couponxx {
      // justify-content: space-between
      .Coupontit {
        font-family: PingFangSC-Regular;
        font-size: 0.28rem;
        color: #333333;
        letter-spacing: 0.02px;
      }
      .Coupontit2 {
        font-family: PingFangSC-Regular;
        font-size: 0.28rem;
        color: #2a2a2a;
        letter-spacing: 0.02px;
        line-height: 20px;
        margin-bottom: 0.12rem;
      }
      img {
        width: 3.25rem;
        height: 0.02rem;
        margin-bottom: 0.14rem;
      }
      .Coupontit3 {
        font-family: PingFangSC-Regular;
        font-size: 0.24rem;
        color: #999999;
        letter-spacing: 0.02px;
      }
    }
  }
  .Coupon2 {
    width: 1.64rem;
    height: 100%;
    background: url(../../../static/img/easybutimg/Couponr.png);
    background-size: 100% 100%;
    font-family: PingFangSC-Regular;
    font-size: 0.28rem;
    text-align: center;
    color: #ffffff;
    letter-spacing: 0.02px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }
}
</style>

