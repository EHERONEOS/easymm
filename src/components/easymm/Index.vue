<template>
  <div>
        <!-- 左侧主页 -->
        <div id="index_left">
          <!-- 头部搜索框 -->
          <div id="index_head">
            <div id="index_Input">
                <div>
                  <div class="index_ss"></div>
                  <input type="text" @keyup.enter="submit" v-model="nurseName" placeholder="搜一搜发现您钟意的护理师">
                </div>
                
                <img :src="headimg" alt="" @click="right">
            </div>
          </div>
          <!-- 月嫂  育婴师  催乳师 -->
          <div id="index_hls">
            <div class="index_icon" @click="Router('YS')">
              <img src="../../../static/img/easymmimg/YS.png" >
              <div>月嫂</div>
            </div>
            <div class="index_icon" @click="Router('YYS')">
              <img src="../../../static/img/easymmimg/YYS1.png" >
              <div>育婴师</div>
            </div>
            <div class="index_icon" @click="Router('CRS')">
              <img src="../../../static/img/easymmimg/CRS.png" >
              <div>催乳师</div>
            </div>
            <!-- <div class="index_icon"@click="easybutler">
              <img src="../../../static/img/easymmimg/easybutler.png" >
              <div>轻松管家</div>
            </div> -->
          </div>
          <!-- 服务详情 -->
          <div id="index_fwxq" @click="easybutler"></div>
          <!-- 联系客服 快速预约 查询订单 -->
          <div id="index_kf_dd">
            <div class="index_kficon" onclick="ysf.open()">
              <img src="../../../static/img/easymmimg/kf.png" >
              <div>联系客服</div>
            </div>
            <a class="index_kficon" href="http://qsmam.com/mobile/appointment2.html?cityer2code=%E6%9D%AD%E5%B7%9E">
              <img src="../../../static/img/easymmimg/yy.png">
              <div>快速预约</div>
            </a>
            <router-link class="index_kficon" to="/userorderlist?type=myHlsdd">
              <img src="../../../static/img/easymmimg/dd.png" >
              <div>查询订单</div>
            </router-link>
          </div>
        </div>
        <!-- 右侧导航栏 -->
        <yd-popup v-model="show" position="right" width='5.86rem'>
            <div id="index_pophead" @click="Router('')">
              <img :src="rheadimg" alt="" >
              <div v-text="name"></div>
            </div>
            <div id="index_list">
                <yd-cell-group >
                  <yd-cell-item arrow href="/userorderlist?type=myHlsdd" type="link">
                  <div slot="left" class="index_item_left">
                    <img src="../../../static/img/easymmimg/dd1.png" alt="">
                    <span >我的订单</span>
                  </div>
                </yd-cell-item>
                <yd-cell-item arrow type="a" href="http://qsmam.com/mobile/app1/idea.html">
                  <div slot="left" class="index_item_left">
                    <img src="../../../static/img/easymmimg/idea.png" alt="">
                    <span>意见反馈</span>
                  </div>
                </yd-cell-item>
                <yd-cell-item arrow type="a" href="http://qsmam.com/mobile/app1/problem.html">
                  <div slot="left" class="index_item_left">
                    <img src="../../../static/img/easymmimg/problem.png" alt="">
                    <span>常见问题</span>
                  </div>
                </yd-cell-item>
                <yd-cell-item arrow type="a" href="http://qsmam.com/mobile/app1/about.html">
                  <div slot="left" class="index_item_left">
                    <img src="../../../static/img/easymmimg/about.png" alt="">
                    <span>关于我们</span>
                  </div>
                </yd-cell-item>
                <yd-cell-item type="a" href="tel:4008-068-222">
                  <div slot="left" class="index_item_left" >
                    <img src="../../../static/img/easymmimg/kf1.png" alt="">
                    <span>联系客服</span>
                  </div>
                  <div slot="right" class="index_item_right">4008-068-222</div>
                </yd-cell-item>
              </yd-cell-group>

              <yd-button @click.native="clearLogin" size="large" type="danger" id="index_zxorgin" >注销登录</yd-button>
            </div>
            
        </yd-popup>
  </div>
</template>

<script type="text/babel">
export default {
  data() {
    return {
      headimg: "http://image.qsmam.com/qs-user.png",
      rheadimg: "http://image.qsmam.com/qs-userhead.png",
      show: false,
      name: "未登录",
      appToken: "",
      useinfo: "",
      nurseName: ""
    };
  },
  mounted() {
    domain.Orgin = this.$route.query.orgin;
    $("html,body").animate({ scrollTop: 0 }, 0);
    //获取登录信息
    this.appToken = $.cookie("appToken");
    console.log(this.appToken);
    let useinfo = $.cookie("useinfo");
    this.useinfo = JSON.parse(useinfo);
    if (this.appToken && this.useinfo) {
      if (this.useinfo.image && this.useinfo.image != "default_mother.png") {
        this.headimg = domain.Imgsrc + this.useinfo.image;
        this.rheadimg = domain.Imgsrc + this.useinfo.image;
      } else {
        this.headimg = "../../../static/img/easymmimg/mrhead.png";
        this.rheadimg = "../../../static/img/easymmimg/mrhead.png";
      }
      if (this.useinfo.nickname) {
        this.name = this.useinfo.nickname;
      } else {
        this.name = "轻松妈妈用户";
      }
    } else {
      this.headimg = "http://image.qsmam.com/qs-user.png";
      this.rheadimg = "http://image.qsmam.com/qs-userhead.png";
      this.name = "未登录";
    }
  },
  methods: {
    submit() {
      console.log(1);
      if (this.appToken && this.useinfo) {
        let sx = {
          age: "",
          pre: "",
          year: "",
          animal: "",
          city: "",
          startTime: "",
          endTime: "",
          nurseName: this.nurseName
        };
        this.$router.push({
          name: "Hlslist",
          params: { job: "YS", sx: JSON.stringify(sx) }
        });
      } else {
        this.$router.push({ name: "Login" });
      }
    },
    right() {
      this.show = true;
    },
    clearLogin() {
      $.cookie("appToken", null);
      $.cookie("useinfo", null);
      window.location.reload();
    },
    Router(name) {
      if (this.appToken && this.useinfo) {
        if (name) {
          this.$router.push({ name: "Hlslist", params: { job: name, sx: 0 } });
        }
      } else {
        this.$router.push({ name: "Login" });
      }
    },
    easybutler() {
      if (this.appToken && this.useinfo) {
        this.$router.push({ name: "butler" });
      } else {
        this.$router.push({ name: "Login" });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../../static/css/easymm/index.less);
</style>
