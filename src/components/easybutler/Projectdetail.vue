<template>
  <div >
      <div v-if="Data">
          <!-- 头部图片 -->
            <div id="head" v-if="Data.image">
                <img :src="imgurl+Data.image" alt="">
            </div>
            <!-- 名字价格 -->
            <div id="title">
                <span v-text="Data.name"></span>
                <span >￥{{Data.reservePrice}}元</span>
            </div>
            <!-- 标签 -->
            <div id="Label">
                <div v-for="(item,key) in Data.serviceEnsure" :key="key" v-text="item"></div>
            </div>
            <!-- 服务类型 -->
            <div id="Type">
                <div class="Typeitem" @click="servicebzfu()">
                    <div >
                        <img src="../../../static/img/easybutimg/Service.png" alt="">
                        <span>服务保障</span>
                    </div>
                    <img src="../../../static/img/easybutimg/right.png" alt="" srcset="">
                </div>
                <div class="Typeitem" v-if="Data.serveGrad" @click="servicetype(Data.serveGrad,Data.buyType)">
                    <div>
                        <img src="../../../static/img/easybutimg/time.png" alt="">
                        <span>服务类型</span> 
                    </div>
                    <img src="../../../static/img/easybutimg/right.png" alt="" srcset="">
                </div>
                <div class="Typeitem" @click="juan">
                    <div>
                        <img src="../../../static/img/easybutimg/Coupon.png" alt="">
                        <span>领卷</span>
                    </div>
                    <img src="../../../static/img/easybutimg/right.png" alt="" srcset="">
                </div>
            </div>
            <!-- 服务详情&&服务评论 -->
            <div id="Service">
                <div id="Service_title">
                    <div @click="Service('detail')" :class="{'check' : sertype == 'detail'}">服务详情</div>
                    <div @click="Service('comment')" :class="{'check' : sertype == 'comment'}">服务评论</div>
                </div>
                <!-- 服务详情 -->
                <div id="Serdetail" v-if="sertype == 'detail'" v-html="string">

                </div>
                <!-- 服务评论 -->
                <div id="Sercomment" v-if="sertype == 'comment'">

                    <div class="commentitem" v-for="(item,key) in Data.comments" :key="key" v-if="Data.comments">
                        <div class="commenthead">
                            <img :src="imgurl+item.userImage" alt="">
                            <div>
                                <div v-text="item.userNickname"></div>
                                <div v-text="item.pushTime"></div>
                            </div>
                        </div>
                        <div class="commentcontent" v-text="item.msg">

                        </div>
                        <div class="commentimg">
                            <img :src="imgurl+item1" alt="" v-for="(item1,key) in item.imagesArrays" :key="key">
                        </div>
                        <div class="commentLabel" v-if="item.labels">
                            <span>#</span>
                            <span class="labelitem" v-for="(item2,key) in item.labels" :key="key" v-text="item2"></span>
                        </div>
                    </div>
                    <div style="font-size:.3rem;color:#f76260;text-align:center" v-if="!Data.comments">暂无评价</div>
                </div>
            </div>
            <!-- 常见问题 -->
            <div id="problem">
                <div class="Title">常见问题</div>
                <div class="procontent" v-text="Data.reserveWaring"></div>
                <div class="problembottom">
                    阅读：{{Data.scanner}} 转发：{{Data.share}} 收藏：{{Data.collection}}
                </div>
            </div>
            <!-- 我要留言 -->
            <div id="message">
                <div class="messagetitle">
                    我要留言
                </div>
                <div class="messagetext">
                    <textarea name="" id="" placeholder="请留下您的宝贵建议" v-model="adcive" @input="change" maxlength="150"></textarea>
                    <div>{{adcivelenth}}/150</div>
                </div>
                <div class="submit">
                    <button :class="{'disabled' :adcive}" @click="Submit">提交</button>
                </div>
            </div>
            <!--精选建议 -->
            <div id="Selectedadvise" v-if="Data.projectComments">
                <div class="advisetit">
                    <div>精选建议</div>
                    <router-link :to="'/Projectadvice/'+id+'/project'">
                        <div  style="cursor:pointer" class="gd">
                            <span>更多</span>
                            <img src="../../../static/img/easybutimg/right.png" alt="">
                        </div>
                    </router-link>
                </div>
                <div class="adviseitem" v-for="(item,key) in Data.projectComments" :key="key" v-if="key<2">
                    <div class="advitem_tit">
                        <div class="advitem_left">
                            <img :src="imgurl+item.userImage" alt="" v-if="item.userImage && item.userImage!='default_mother.png'">
                            <img src="../../../static/img/easybutimg/mrimg.png" alt="" v-else>
                            <span v-text="item.userNickname"></span>
                        </div>
                        <div class="advitem_right" v-if="item.eUserUp">
                            <img src="../../../static/img/easybutimg/zanred.png" alt="">
                            <span v-text="item.upAmount" style="color:#f76260"></span>
                        </div>
                        <div class="advitem_right" @click="zan(item.id)" v-else>
                            <img src="../../../static/img/easybutimg/zan.png" alt="">
                            <span v-text="item.upAmount" ></span>
                        </div>
                    </div>
                    <div class="advitem_content" v-html="item.msg">
                    </div>
                    <div class="advitem_time" v-text="item.pushTime"></div>
                </div>
            </div>
            <!-- 猜你喜欢 -->
            <div id="Like">
                <div class="advisetit">
                    <div>猜你喜欢</div>
                    <router-link :to="'/Projectlist/'+id">
                        <div  style="cursor:pointer" class="gd">
                            <span>更多</span>
                            <img src="../../../static/img/easybutimg/right.png" alt="">
                        </div>
                    </router-link>
                </div>
                <div  class="Likeitem" v-for="(item,key) in Data.others" :key="key"
                    v-if="key<2" @click="servieroute(item.id)">
                    <div class="Like_left">
                        <div v-text="item.name"></div>
                        <div v-html="item.introduce"></div>
                        <div>￥{{item.price}}元/次起</div>
                    </div>
                    <div class="likeimg">
                        <img :src="imgurl+item.image" alt="">     
                    </div>
                </div>
            </div>
            <!-- 底部 -->
            <div id="bottom">
                <a class="kf" href="tel:4008-068-222">
                    <img src="../../../static/img/easybutimg/kf.png" alt="">
                    <div>客服</div>
                </a>
                <button class="yuyue" v-if="Data.buyType==1" @click="appointment">首次体验</button>
                <button class="yuyue" v-else @click="appointment">立即预约</button>
            </div>
            <!-- 占位 -->
            <div style="height:1.54rem"></div>
      </div>
        <!-- 服务保障 -->
        <yd-popup v-model="servicebz" position="bottom" height="6.5rem">
                <div class="seession1">
                    <div class="sessionitem">
                        <img src="../../../static/img/easybutimg/sb.png" alt="">
                        <div>进口设备 食品级清洁剂 环保安全 品质保障</div>
                    </div>
                    <div class="sessionitem">
                        <img src="../../../static/img/easybutimg/zs.png" alt="">
                        <div>员工制 非中介 公安局联网备案 管家工作经验及技能认证 100%持健康证上岗</div>
                    </div>
                    <div class="sessionitem">
                        <img src="../../../static/img/easybutimg/aq.png" alt="">
                        <div>携手（平安） 全程护航</div>
                    </div>
                    <div class="sessionitem">
                        <img src="../../../static/img/easybutimg/sh.png" alt="">
                        <div>售后保障 包您满意</div>
                    </div>
                </div>
                <button @click="servicebzfu" id="serc">确定</button>

        </yd-popup>
  </div>
</template>
<script>
import main from "../../../static/css/easybutler/main.css";
export default {
  data() {
    return {
      sertype: "detail",
      adcive: "",
      adcivelenth: 0,
      Data: "",
      imgurl: "http://image.qsmam.com/",
      appToken: "",
      id: "",
      servicebz: false,
      string: ""
    };
  },
  mounted() {
    $("html,body").animate({ scrollTop: 0 }, 0);
    this.$dialog.loading.open("加载中...");
    this.loaddetail();
  },
  methods: {
    //立即预约
    appointment() {
      let type, price;
      if (this.$route.query.type) {
        type = this.$route.query.type;
        price = this.$route.query.price;
      } else {
        type = 0;
        price = 0;
      }
      this.$router.push({
        name: "appointment",
        params: {
          id: this.id,
          type: type,
          price: price,
          Date: 0,
          spe: 0,
          Coupon: 0,
          style: "service"
        }
      });
    },
    loaddetail() {
      let self = this;
      self.appToken = $.cookie("appToken");
      self.id = self.$route.params.id;
      $.ajax({
        url: domain.Url + "app/easyStewardService/projectDetails",
        data: {
          id: self.id,
          appToken: self.appToken
        },
        success: data => {
          console.log(data);
          if (data.isSuccess) {
            self.Data = data.result;
            let string = self.Data.content;
            let reg = /<img[^>]*>/gi;
            let imgarr = string.match(reg);
            for (let i = 0; i < imgarr.length; i++) {
              let str = imgarr[i].replace(/width=/g, "");
              str = str.replace(/height=/g, "");
              str = str.replace(/style=/g, "");
              string = string.replace(imgarr[i], str);
            }
            self.string = string;
            this.$dialog.loading.close();
          }
        }
      });
    },
    //服务保障
    servicebzfu() {
      this.servicebz = !this.servicebz;
    },
    //服务详情跳转
    servieroute(id) {
      this.$router.replace({ name: "Projectdetail", params: { id: id } });
      this.Data = null;
      this.$dialog.loading.open("加载中...");
      $("html,body").animate({ scrollTop: 0 }, 0);
      this.loaddetail();
    },
    //点赞
    zan(id) {
      let self = this;
      this.$dialog.loading.open("加载中...");
      $.ajax({
        url: domain.Url + "app/easyconnups/projecup",
        data: {
          id: id,
          appToken: self.appToken,
          type: 1
        },
        success: data => {
          if (data.isSuccess) {
            self.loaddetail();
          }
        }
      });
    },
    //提示
    Service(type) {
      this.sertype = type;
    },

    //服务类型
    servicetype(type, buyType) {
      if (buyType == 1) {
        this.$router.push({
          name: "Servicetype3",
          params: {
            id: this.$route.params.id,
            type: 0,
            price: 0,
            Date: 0,
            spe: 0,
            Coupon: 0,
            style: "service"
          },
          query: {
            orign: "detail"
          }
        });
      } else if (type == 1) {
        this.$router.push({
          name: "Servicetype1",
          params: {
            id: this.$route.params.id,
            type: 0,
            price: 0,
            Date: 0,
            spe: 0,
            Coupon: 0,
            style: "service"
          },
          query: {
            orign: "detail"
          }
        });
      } else {
        this.$router.push({
          name: "Servicetype2",
          params: {
            id: this.$route.params.id,
            type: 0,
            price: 0,
            Date: 0,
            spe: 0,
            Coupon: 0,
            style: "service"
          },
          query: {
            orign: "detail"
          }
        });
      }
    },
    //领卷
    juan() {
      this.$router.push({
        name: "Coupon"
      });
    },
    Submit() {
      let self = this;
      if (this.adcive) {
        $.ajax({
          url: domain.Url + "app/easyconnups/projeccomment",
          data: {
            appToken: this.appToken,
            content: this.adcive,
            id: this.id,
            type: "project"
          },
          success: data => {
            if (data.isSuccess) {
              self.$dialog.toast({
                mes: "提交成功",
                timeout: 1500,
                icon: "success"
              });
              self.loaddetail();
            } else {
              self.$dialog.toast({
                mes: data.message,
                timeout: 1500
              });
            }
          }
        });
      }
    },
    change() {
      this.adcivelenth = this.adcive.length;
    }
  }
};
</script>
<style  scoped>
@import url(../../../static/css/easybutler/Projectdetail.css);
</style>
