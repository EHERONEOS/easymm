<template>
   <div>
          <div id="head">
                       轻松管家服务覆盖范围:{{cityarr}}!  其他区域筹备中！
          </div>
          <div id="address" @click="addaddress">
            <div id="oldadd" v-if="address">
                <div class="oldaddone">
                    <div>
                        <img src="../../../static/img/easybutimg/name.png" alt="">
                        <span v-text="address.name"></span>
                    </div>
                    <div>
                        <img src="../../../static/img/easybutimg/phone.png" alt="">
                        <span>联系方式：{{address.mobile}}</span>
                    </div>
                </div>
                <div class="oldaddtwo">
                    <span>地址：{{address.province}}{{address.city}}{{address.city}}{{address.area}}{{address.address}}</span>
                </div>
            </div>
            <div id="newadd" v-else>
                <img src="../../../static/img/easybutimg/name.png" alt="">
                <span>+新联系人</span>
            </div>
          </div>
          <div class="sessionitem"  @click="Choicetime">
              <div class="itemleft">
                <img src="../../../static/img/easybutimg/servicetime.png" alt=""> 
                <span>选择服务时间</span>   
              </div>
              <div class="itemright">
                  <div v-text="appointDate" ></div>
                  <img src="../../../static/img/easybutimg/right.png" alt="">
              </div>
          </div>
          <div class="sessionitem" @click="Coupon">
              <div class="itemleft">
                <img src="../../../static/img/easybutimg/Coupon.png" alt=""> 
                <span>使用优惠卷</span>   
              </div>
              <div class="itemright">
                  <div v-text="'-'+Couponprice" style="color:#f76260" v-if="Couponprice!=0"></div>
                  <div v-else></div>
                  <img src="../../../static/img/easybutimg/right.png" alt="">
              </div>
          </div>
          <div class="sessionitem" @click="special">
              <div class="itemleft">
                <img src="../../../static/img/easybutimg/xq.png" alt=""> 
                <span>填写特殊需求</span>   
              </div>
              <div class="itemright">
                  <div v-text="spe"></div>
                  <img src="../../../static/img/easybutimg/right.png" alt="">
              </div>
          </div>
          <div id="foot">
              <div class="pre" v-text="'￥'+price+'元'" ></div>
              <div class="appointment" @click="appointment">立即预订</div>
          </div>
      </div>
</template>
<script>
export default {
  data() {
    return {
      Data: "",
      appToken: "",
      id: "",
      imgurl: "http://image.qsmam.com/",
      type: "",
      price: 0,
      appointDate: "",
      spe: "",
      address: "",
      types: "",
      bool: false,
      CouponId: 0,
      Couponprice: 0,
      cityarr:''
    };
  },
  mounted() {
    $("html,body").animate({ scrollTop: 0 }, 0);
    // this.$dialog.loading.open("加载中...");
    let self = this;
    $.ajax({
      url:domain.Url+'app/easyStewardOrder/loadOpenArea',
      data:{
        appToken:$.cookie('appToken')
      },
      success:data=>{
        if(data.isSuccess){
          let cityarr='';
          for(let i=0;i<data.result[0].areas.length;i++){
            let city=data.result[0].areas[i].name;
            for(let j=0;j<data.result[0].areas[i].areas.length;j++){
              city=city+data.result[0].areas[i].areas[j].name+'、'
            }
            cityarr=cityarr+city
          }
         self.cityarr=cityarr.slice(0,-1)
      
        }
      }
    })
    self.appToken = $.cookie("appToken");
    let address = sessionStorage.getItem("address");
    self.id = self.$route.params.id;
    self.price = self.$route.params.price;
    let Coupon = self.$route.params.Coupon;
    if (Coupon != 0) {
      Coupon = JSON.parse(Coupon);
      self.CouponId = Coupon.id;
      if (Coupon.rule == "zhekou") {
        self.Couponprice = Coupon.zhekou * 10 + "折";
        self.price = self.price * Coupon.zhekou;
        self.price = Math.floor(self.price * 100) / 100;
      } else if (Coupon.rule == "mianfei") {
        self.Couponprice = "(免费体验)";
        self.price = 0;
      } else {
        self.Couponprice = "-" + Coupon.price + "元";
        self.price = self.price - Coupon.price;
        self.price = Math.floor(self.price * 100) / 100;
      }
    }
    if (address) {
      self.address = JSON.parse(address);
    } else {
      //获取默认地址
      $.ajax({
        url: domain.Url + "app/userAddress/loadDefaultAddress",
        data: {
          appToken: self.appToken
        },
        success: data => {
          console.log(data);
          if (data.isSuccess) {
            self.address = data.result;
          } else {
            self.address = null;
          }
        }
      });
    }
    if (self.$route.params.Date != 0) {
      self.appointDate = self.$route.params.Date;
    }
    if (self.$route.params.spe != 0) {
      self.spe = self.$route.params.spe;
    }
  },
  methods: {
     //提示
    message(x) {
      this.$dialog.toast({
        mes: x,
        timeout: 1500
      });
    },
    Coupon() {
      // console.log(this.$route.params.id)
      this.$router.push({
        name: "Coupons",
        params: {
          id: this.$route.params.id,
          type: this.$route.params.type,
          price: this.$route.params.price,
          Date: this.$route.params.Date,
          spe: this.$route.params.spe,
          Coupon: this.$route.params.Coupon,
          style: "suit"
        }
      });
    },
    addaddress() {
      this.$router.push({
        name: "butaddress",
        params: {
          id: this.$route.params.id,
          type: this.$route.params.type,
          price: this.$route.params.price,
          Date: this.$route.params.Date,
          spe: this.$route.params.spe,
          style: "suit"
        }
      });
    },
    //立即购买
    appointment() {
      let self = this;
       if (!self.appointDate) {
        return this.message("请选择服务时间");
      }
      let data = {
        appSecret: "qsmm",
        appToken: self.appToken,
        area: self.address.area,
        city: self.address.city,
        couponId: self.CouponId, 
        province: self.address.province,
        serviceTime: self.appointDate,
        suitId: self.id,
        system: "webwx",
        timestamp: Date.parse(new Date()),
        userAdress:
          self.address.province +
          self.address.city +
          self.address.area +
          self.address.address,
        userMobile: self.address.mobile,
        userName: self.address.name,
        userRemark: self.spe
      };
      let param = $.param(data);
      data.sign = md5.hexMD5(param);
      $.ajax({
        url: domain.Url + "app/easyStewardOrder/suitOrderInit",
        data: data,
        success: data => {
          if (data.isSuccess) {
            let Data = {
              type: "Service",
              orderId: data.result.orderId,
              appToken: $.cookie("appToken")
            };
            Data = JSON.stringify(Data);

            let redirect_uri =
              "http://www.qsmam.com/mobile/weixinH5/page/payment.html?Data=" +
              Data;
            redirect_uri = encodeURI(redirect_uri);
            //授权地址
            let Url =
              "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5db600fa5c3a6eb2&redirect_uri=" +
              redirect_uri +
              "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
            location.href = Url;
          }else{
            return this.message(data.message);
          }
        }
      });
    },
    Choicetime() {
      this.$router.push({
        name: "Choicetime",
        params: {
          id: this.$route.params.id,
          type: this.$route.params.type,
          price: this.$route.params.price,
          Date: this.$route.params.Date,
          spe: this.$route.params.spe,
          style: "suit"
        }
      });
    },
    special() {
      this.$router.push({
        name: "special",
        params: {
          id: this.$route.params.id,
          type: this.$route.params.type,
          price: this.$route.params.price,
          Date: this.$route.params.Date,
          spe: this.$route.params.spe,
          style: "suit"
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../../static/css/easybutler/appointment.less);
</style>
