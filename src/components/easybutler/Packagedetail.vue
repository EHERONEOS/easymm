<template>
  <div>
      <div v-if="Data">
            <div id="Package_head" v-html="string">
                <!-- <img src="http://image.qsmam.com/ueditor/jsp/upload/image/20171216/1513419205772046596.jpg" alt=""> -->
            </div>
            <div id="tuijian">
                <div class="tjzs">
                    <b class="tj_head" v-if="Data.recommendNickname" v-text="'推荐者:'+Data.recommendNickname"></b>
                    <div class="tj1" v-if="Data.recommendValue">
                        <b>推荐理由:</b>
                        <span v-text="Data.recommendValue"></span>
                    </div>
                    <div class="tj2" v-if="Data.recommendIntroduce">
                        <b>服务保障:</b>
                        <span v-text="Data.recommendIntroduce"></span>
                    </div>
                </div>
            </div> 
            <!-- <div class="familylb" v-for="(item,key) in Data.subjectsuit" :key="key">
                <div class="familytit" v-text="item.name"></div>
                <div class="familyitem" v-for="(item1,key) in item.details" :key="key">
                    <div class="familyleft">
                        <div class="familyone">
                            <span v-if="item1.name=='YS'">月嫂</span>
                            <span v-else-if="item1.name=='YYS'">育婴师</span>
                            <span v-else-if="item1.name=='CRS'">催乳师</span>
                            <span v-else-if="item1.name=='SHORT_YS'">短期月嫂</span>
                            <span v-else-if="item1.name=='SHORT_YYS'">短期育婴师</span>
                            <span v-text="item1.name" v-else></span>
                            <span>×{{item1.count}}</span>
                        </div>
                        <div class="familytwo" v-html="item1.detail"></div>
                        <div class="familythree">￥{{item1.prize}}元/次</div>
                    </div>
                   <div class="likeimg">
                        <img :src="imgurl + item1.image" alt="">
                    </div>
                </div>
                <div class="lbbottom">
                    <div class="botleft">
                        <span>￥{{item.price}}</span>
                        <span>优惠{{item.originalPrice - item.price}}元</span>
                    </div>
                    <button @click="Buy(item.id,item.price)">购买</button> 
                </div>
            </div> -->
            <div id="suittype2">
                <div class="type2item" v-for="(item,key) in Data.subjectsuit" :key="key">
                    <img :src="imgurl+item.logo" alt="" class="head" v-if="item.logo">
                    <div class="bottom">
                        <div class="tit">{{item.name}}</div>
                        <div class="content">
                            <div class="conleft">
                                <div class="price1">
                                    <span>￥{{item.price}}</span>
                                    <span>元/起</span>
                                </div>
                                <div class="price2" v-if="item.originalPrice">优惠：{{item.originalPrice}}元</div>
                            </div>
                            <div class="conright" @click="Buy(item.id,item.price)" v-if="appToken">立即预约</div>
                        </div>
                        <div class="contenttxt">{{item.introduce}}</div>
                        <div class="table" v-if="item.details">
                            <div class="tit">套餐清单</div>
                            <table class="tables">
                                <tr>
                                    <td>名称</td>
                                    <td>数量</td>
                                    <td>原价</td>
                                </tr>
                                <tr v-for="(item1,key) in item.details" :key='key'>
                                    <td>{{item1.name}}</td>
                                    <td>{{item1.count}}</td>
                                    <td>{{item1.showPrice2}}</td>
                                </tr>
                            </table>
                        </div>
                        <div class="warn">
                            <div>购买须知:</div>
                            <div>{{item.remark}}</div>
                        </div>
                    </div>
                </div>
            </div>
            <div id="fx">
                <!-- <div class="Share" @click="Share">分享有惊喜</div> -->
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
            <div id="Selectedadvise" v-if="Data.comments">
                <div class="advisetit">
                    <div>精选建议</div>
                    <router-link :to="'/Projectadvice/'+id+'/suit/'">
                        <div  style="cursor:pointer" class="gd">
                            <span>更多</span>
                            <img src="../../../static/img/easybutimg/right.png" alt="">
                        </div>
                    </router-link>
                </div>
                <div class="adviseitem" v-for="(item,key) in Data.comments" :key="key" v-if="key<2">
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
            <div id="Like" v-if="Data.suits">
                <div class="advisetit">
                    <div>猜你喜欢</div>
                    <router-link to="/Packagelist">
                        <div  style="cursor:pointer" class="gd">
                            <span>更多</span>
                            <img src="../../../static/img/easybutimg/right.png" alt="">
                        </div>
                    </router-link>
                </div>
                <div class="Likeitem" v-for="(item,key) in Data.suits" :key="key"
                    v-if="key<2" @click="Package(item.id)">
                    <div class="Like_left">
                        <div v-text="item.titles"></div>
                        <div v-html="item.details"></div>
                        <div>￥{{item.prize}}元/次起</div>
                    </div>
                    <div class="likeimg">
                        <img :src="imgurl + item.image" alt="">
                    </div>
                </div>
            </div>
      </div>
  </div>
</template>
<script>
import main from "../../../static/css/easybutler/main.css";
export default {
  data() {
    return {
      Data: "",
      appToken: "",
      id: "",
      imgurl: "http://image.qsmam.com/",
      adcive: "",
      adcivelenth: 0,
      string: ""
    };
  },
  mounted() {
    $("html,body").animate({ scrollTop: 0 }, 0);
    this.$dialog.loading.open("加载中...");
    this.loaddetail();
  },
  methods: {
    //购买
    Buy(id, price) {
      this.$router.push({
        name: "suitappointment",
        params: {
          id: id,
          type: 0,
          price: price,
          Date: 0,
          spe: 0,
          Coupon: 0,
          style: "suit"
        }
      });
    },
    //加载数据
    loaddetail() {
      let self = this;
      self.appToken = $.cookie("appToken");
      self.id = self.$route.params.id;
      $.ajax({
        url: domain.Url + "app/easymanageindex/mealdetails",
        data: {
          id: self.id,
          appToken: self.appToken
        },
        success: data => {
          console.log(data);
          if (data.isSuccess) {
            self.Data = data.result;
            self.subjectsuit = data.result.subjectsuit;
            let string = self.Data.content;
            let reg = /<img[^>]*>/gi;
            let imgarr = string.match(reg);
            if (imgarr) {
              for (let i = 0; i < imgarr.length; i++) {
                let str = imgarr[i].replace(/width=/g, "");
                str = str.replace(/height=/g, "");
                str = str.replace(/style=/g, "");
                string = string.replace(imgarr[i], str);
              }
            }
            self.string = string;
            this.$dialog.loading.close();
          }
        }
      });
    },
    //猜你喜欢跳转
    Package(id) {
      this.$router.push({ name: "Packagedetail", params: { id: id } });
      this.Data = null;
      this.$dialog.loading.open("加载中...");
      $("html,body").animate({ scrollTop: 0 }, 0);
      this.loaddetail();
    },
    //提交
    Submit() {
      let self = this;
      if (this.adcive) {
        $.ajax({
          url: domain.Url + "app/easyconnups/projeccomment",
          data: {
            appToken: this.appToken,
            content: this.adcive,
            id: this.id,
            type: "suit"
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
    //点赞
    zan(id) {
      let self = this;
      this.$dialog.loading.open("加载中...");
      $.ajax({
        url: domain.Url + "app/easyconnups/projecup",
        data: {
          id: id,
          appToken: self.appToken,
          type: 0
        },
        success: data => {
          console.log(data);
          if (data.isSuccess) {
            self.loaddetail();
          }
        }
      });
    },
    //判断字符长度
    change() {
      this.adcivelenth = this.adcive.length;
    }
  }
};
</script>
<style scoped>

</style>
<style lang="less" scoped>
@import url(../../../static/css/easybutler/Packagedetail.less);
</style>
