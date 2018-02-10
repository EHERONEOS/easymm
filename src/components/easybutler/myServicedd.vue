<template>
  <div>
      <div v-if="bool" style="background:#f4f4f4">
        <div v-if="Data">
          <div v-for="(item,key) in Data" :key="key" class="serviceitem" >
            <div v-if="item.orderType==1" @click="orderdetail(item.id)" style="cursor: pointer;">
                <div class="servicetitle" >
                  <span>{{item.createTime.slice(0,10)}}</span>
                  <span class="status" v-if="item.status==0">已关闭</span>                  
                  <span class="status" v-if="item.status==10">待付款</span>
                  <span class="status" v-if="item.status==20">受理中</span>
                  <span class="status" v-if="item.status==25">待付款</span>
                  <span class="status" v-if="item.status==30">受理中</span>
                  <span class="status" v-if="item.status==40">待服务</span>
                  <span class="status" v-if="item.status==50">待服务</span>
                  <span class="status" v-if="item.status==60">待评价</span>
                </div>
                <div class="servicecontent"> 
                  <div class="serviceimg">
                    <img :src="imgurl+item.projectdetails.image" alt="" v-if="item.projectdetails">
                  </div>
                  <div class="servicexx">
                    <div class="title" v-text="item.projectdetails.name" v-if="item.projectdetails"></div>
                    <div class="chirend">
                      <span v-for="(item1,key) in item.orderprojectdetails" :key="key">{{item1.name}}x{{item1.count}}</span>
                    </div>
                 </div>
                </div>
            </div>
            <div v-if="item.orderType==2" @click="orderdetail(item.id)">
                <div class="suittitle">
                  <div class="suitcreate">
                    <div v-text="item.suitName"></div>
                    <div v-text="'订单编号:'+item.orderCode"></div>
                  </div>
                  <span class="status" v-if="item.status==0">已关闭</span>                  
                  <span class="status" v-if="item.status==10">待付款</span>
                  <span class="status" v-if="item.status==20">受理中</span>
                  <span class="status" v-if="item.status==25">待付款</span>
                  <span class="status" v-if="item.status==30">受理中</span>
                  <span class="status" v-if="item.status==40">待服务</span>
                  <span class="status" v-if="item.status==50">待服务</span>
                  <span class="status" v-if="item.status==60">待评价</span>
                </div>
                <div class="suitcontent">
                  <div class="suitimgarr">
                    <div class="suitimgitem" v-for="(item1,key) in item.suitdetails" :key="key" v-if="key<3">
                      <img :src="imgurl+item1.image" alt="">
                    </div>
                  </div>
                  <div class="gd">查看更多></div>
                </div>
            </div>
            <div class="servicetime">
              <div class="servieflex">
                <span class="time">服务时间:{{item.serviceTime}}</span>
                <span class="pre">
                  <span>总金额:</span>
                  <span>￥{{item.allServiceMony}}元</span>
                </span>
              </div>
              <div class="alipy"  v-if="item.status==10">
                <button @click="Clearord(item.id)">取消订单</button>
                <button class="zf" @click="alipy(item.id)">去支付</button>
              </div>
              <div class="alipy"  v-else-if="item.status==25">
                <button>联系客服</button>
                <button class="zf" @click="Acreage(item.id)">支付尾款</button>
              </div>
              <div class="alipy"  v-else-if="item.status==0">
                <button>联系客服</button>
                <button class="zf" @click="appoint(item.projectId,item.subjectId,item.orderType)">再次预约</button>
              </div>
              <div class="alipy"  v-else>
                <button>联系客服</button>
              </div>
              
            </div>
          </div>
        </div>
        <!-- 没有订单 -->
        <div id="noOrd" v-else>
          <img src="../../../static/img/easymmimg/nodd.png" alt="">
          <div>暂无订单</div>
        </div>
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Data: "",
      bool: false,
      imgurl: "http://image.qsmam.com/"
    };
  },
  mounted() {
    $("html,body").animate({ scrollTop: 0 }, 0);
    let self = this;
    console.log($.cookie("appToken"));
    this.$dialog.loading.open("加载中...");
    $.ajax({
      url: domain.Url + "/app/easyorderresume/list",
      data: {
        appToken: $.cookie("appToken")
      },
      success: data => {
        self.bool = true;
        console.log(data);
        this.$dialog.loading.close();
        if (data.isSuccess) {
          self.Data = data.result;
        }
      }
    });
  },
  methods: {
    //支付尾款
    Acreage(id) {
      this.$router.push({ name: "Acreage", params: { id: id } });
    },
    //再次预约
    appoint(projectid, suitid, ordtype) {
      if (ordtype == 1) {
        this.$router.push({ name: "Projectdetail", params: { id: projectid } });
      } else if (ordtype == 2) {
        this.$router.push({ name: "Packagedetail", params: { id: suitid } });
      }
    },
    //取消订单
    Clearord(id) {
      this.$router.push({
        name: "Clearorder",
        params: {
          id: id
        },
        query: {
          orgin: "orderlist"
        }
      });
    },
    //订单详情
    orderdetail(id) {
      this.$router.push({
        name: "serviceorder",
        params: {
          id: id
        }
      });
    },
    //支付
    alipy(id) {
      let Data = {
        type: "Service",
        orderId: id,
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
@import url(../../../static/css/easybutler/myServicedd.less);
</style>
