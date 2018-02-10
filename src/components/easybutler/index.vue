<template>
  <div>
      <div v-if="Data">
          <!-- 顶部banner轮播 -->
        <div id="head">
            <yd-slider :show-pagination="pag">
                <yd-slider-item v-for="(item,key) in banners" :key='key'>
                    <a :href="item.urlValue" v-if="item.urlType=='url'">
                        <img :src="'http://image.qsmam.com/'+item.logo" alt="">
                    </a>
                    <a :href="'https://qsmam.com/mobile/postDetail.html?id='+item.urlValue" v-if="item.urlType=='forum2post'">
                        <img :src="'http://image.qsmam.com/'+item.logo" alt="">
                    </a>
                </yd-slider-item>
            </yd-slider>
        </div>
        
        <!-- logo导航 -->
        <div id="logoarr">
            <yd-slider>
                <yd-slider-item >
                     <div class="logoarr">
                        <div class="logoitem"  v-for="(item,key) in logos" :key='key' v-if="key<8" @click="service(item.id)">
                        <img :src="'http://image.qsmam.com/'+item.logo" alt="" v-if="item.logo">
                        <img src="../../../static/img/easybutimg/Washing .png" alt="" v-else>
                        <div v-text="item.title"></div>
                        </div>
                    </div>
                </yd-slider-item>
                <yd-slider-item >
                    <div class="logoarr">
                        <div class="logoitem"  v-for="(item,key) in logos" :key='key' v-if="key>=8" @click="service(item.id)">
                            <img :src="'http://image.qsmam.com/'+item.logo" alt="" v-if="item.logo">
                            <img src="../../../static/img/easybutimg/Washing .png" alt="" v-else>
                            <div v-text="item.title"></div>
                        </div>
                    </div>
                </yd-slider-item>   
            </yd-slider>
        </div>
       
        <!-- 新人福利 -->
        <div id="welfare">
            <img src="../../../static/img/easybutimg/welfare.png" alt="" @click="Coupon">
        </div>
        <!-- 精选套餐 -->
        <div id="Package">
            <div class="title">
                <img src="../../../static/img/easybutimg/title.png" alt="">
                精选套餐
            </div>
            <div class="packageitem" v-for="(item,key) in meals" :key="key" @click="Package(item.id)">
                <img :src="'http://image.qsmam.com/'+item.image" alt="">
                <div class="itemtit" v-text="item.titles"></div>
                <div class="details" v-text="item.details"></div>
                <div class="pre">
                    <span v-text="'￥'+item.prize+'元'"></span>
                    <button></button>
                </div>
            </div>
        </div>      
      </div>

  </div>
</template>
<script>
export default {
  name: "index",
  data() {
    return {
      banners: [],
      logos: [],
      meals: [],
      Data: false,
      appToken: "",
      pag: false
    };
  },
  mounted() {
    $("title").text("轻松管家");
    $("html,body").animate({ scrollTop: 0 }, 0);
    this.appToken = $.cookie("appToken");
    this.$dialog.loading.open("加载中...");
    let self = this;
    $.ajax({
      url: domain.Url + "app/easymanageindex/list",
      data: {
        appToken: self.appToken,
        city: "杭州",
        system: "web"
      },
      success: data => {
        console.log(data);
        if (data.isSuccess) {
          self.banners = data.result.banners;
          self.logos = data.result.index_easymanages_icon;
          self.meals = data.result.index_meals;
          self.Data = true;
          this.$dialog.loading.close();
        }
      }
    });
  },
  methods: {
    //跳转服务详情
    service(id) {
      this.$router.push({ name: "Projectdetail", params: { id: id } });
    },
    //跳转套餐详情
    Package(id) {
      this.$router.push({ name: "Packagedetail", params: { id: id } });
    },
    Coupon() {
      this.$router.push({ name: "Coupon" });
    }
  }
};
</script>


<style scoped lang="less">
@import url(../../../static/css/easybutler/index.less);
</style>
