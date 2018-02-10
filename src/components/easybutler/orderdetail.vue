<template>
<div>
    <div v-if="Data">
        <div id="head">
                <div class="head1">
                    <img src="../../../static/img/easymmimg/ddxq.png" alt="">
                    <div v-if="Data.status=='0'">已取消</div>
                    <div v-if="Data.status=='10'">待付款</div>
                    <div v-if="Data.status=='20'">受理中</div>
                    <div v-if="Data.status=='25'">代付款</div>
                    <div v-if="Data.status=='30'">受理中</div>
                    <div v-if="Data.status=='40'">待服务</div>
                    <div v-if="Data.status=='50'">待评价</div>
                    <div v-if="Data.status=='60'">待评价</div>
                </div>
                <div class="head2" v-text="Data.orderdetails.statusDesc"></div>
            </div>
            <div id="address">
                <div class="addressone">
                    <div class="username">
                        <img src="../../../static/img/easymmimg/pos.png" alt="">
                         <span v-text="Data.orderdetails.userName"></span>
                    </div>
                    <div class="usermobile" v-text="Data.orderdetails.userMobile"></div>
                </div>
                <div class="addresstwo">
                    <div v-text="'地址:'+Data.orderdetails.userAdress"></div>
                </div>
            </div>
            <div id="ordertit">订单信息</div>
            <div class="servicecontent">
                  <div class="serviceimg">
                    <img :src="imgurl+Data.projectdetails.image" alt="" v-if="Data.projectdetails">
                  </div>
                  <div class="servicexx">
                    <div class="title" v-text="Data.projectdetails.name" v-if="Data.projectdetails"></div>
                    <div class="chirend">
                      <span v-for="(item,key) in Data.orderprojectdetails" :key="key">{{item.name}}x{{item.count}}</span>
                    </div>
                 </div>
            </div>
            <div class="servicetime">
                <span>服务时间:</span>
                <span v-text="Data.serviceTime"></span>
            </div>
             <div class="servicetime" v-if="Data.coupon">
                <span>优惠卷抵扣:</span>
                <span >-￥{{Data.coupon.subtractMoney}}</span>
            </div>
            <div class="servicetime">
                <span>实付款:</span>
                <span style="color:#f76260">￥{{Data.allServiceMony}}</span>
            </div>
            <div id="lxfs">
              <div class="phone" onclick="location.href='tel:4008-068-222'">电话联系</div>
              <div class="zx">在线咨询</div>
            </div>
            <div id="ordernumber">
                <div>订单编号：{{Data.orderCode}}</div>
                <div>下单时间：{{Data.createTime}}</div>
            </div>
            <div id="foot">
                <div class="footleft" v-if="Data.status=='10'|| Data.status=='25'">
                    <span>本次支付:</span>
                    <span class="price">￥{{Data.shouldPayMoney}}</span>
                </div>
                <div class="footright" v-if="Data.status=='0'">
                    <div class="zf" @click="appoint">再次预约</div>
                </div>
                <div class="footright" v-if="Data.status=='10'">
                    <div @click="Celorder">取消订单</div>
                    <div class="zf" @click="alipy">支付</div>
                </div>
                <div class="footright" v-if="Data.status=='25'">
                    <div class="zf" @click="Acreage">支付尾款</div>
                </div>
            </div>
    </div>
</div>  
</template>
<script>
export default {
  data() {
    return {
      Data: "",
      imgurl: "http://image.qsmam.com/",
      type: "orderxx"
    };
  },
  mounted() {
    $("html,body").animate({ scrollTop: 0 }, 0);
    this.$dialog.loading.open("加载中...");
    let self = this;
    $.ajax({
      url: domain.Url + "app/easyorderresume/details",
      data: {
        appToken: $.cookie("appToken"),
        id: this.$route.params.id
      },
      success: data => {
        console.log(data)
        if (data.isSuccess) {
          self.Data = data.result;
          this.$emit("childToParentMsg", data.result.serviceType);
          this.$dialog.loading.close();
        }
      }
    });
  },
  methods: {
    //支付尾款
    Acreage(){
      this.$router.push({ name: "Acreage", params: { id: this.$route.params.id } });
    },
    //再次预约
    appoint(){
       if (Data.ordtype == 1) {
        this.$router.push({ name: "Projectdetail", params: { id: Data.projectid } });
      } else if (Data.ordtype == 2) {
        this.$router.push({ name: "Packagedetail", params: { id: Data.suitid } });
      }
    },
    //支付
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
    },
    Celorder() {
      this.$router.push({
        name: "Clearorder",
        params: {
          id: this.$route.params.id
        },
        query: {
          orgin: "orderdetail"
        }
      });
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../../static/css/easymm/Orderdetail.less);
</style>
