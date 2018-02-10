<template>
    <div>
        <div id="Like" v-if="Data">
            <router-link :to="'/Packagedetail/'+item.id" class="Likeitem" v-for="(item,key) in Data" :key="key">
                <div class="Like_left">
                    <div v-text="item.titles"></div>
                    <div v-html="item.details"></div>
                    <div>￥{{item.prize}}元/次起</div>
                </div>
                <div class="likeimg">
                <img :src="imgurl + item.image" alt="">                  
                </div>
            </router-link>
        </div>
    </div>
</template>
<script>
export default {
  data() {
    return {
      Data: "",
      appToken: "",
      imgurl: "http://image.qsmam.com/"
    };
  },
  mounted() {
    $("html,body").animate({ scrollTop: 0 }, 0);
    let self = this;
    this.$dialog.loading.open("加载中...");
    self.appToken = $.cookie("appToken");
    $.ajax({
      url: domain.Url + "app/easymanageindex/listmeal",
      data: {
        appToken: self.appToken
      },
      success: data => {
        if (data.isSuccess) {
          self.Data = data.result;
          self.$dialog.loading.close();
        }
      }
    });
  },
  methods: {}
};
</script>
<style scoped>
#Like {
  padding: 0 0.3rem;
  box-sizing: border-box;
}

#Like > .advisetit {
  margin-bottom: 0.2rem;
}

.Likeitem {
  display: flex;
  justify-content: space-between;
  padding: 0.2rem 0;
  border-bottom: 0.02rem solid #f8f8f8;
}

.Like_left {
  width: 4.6rem;
  font-family: PingFang-SC-Medium;
  letter-spacing: 0.2px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.Like_left > div:nth-child(1) {
  font-size: 0.28rem;
  line-height: 0.4rem;
  color: #333333;
}

.Like_left > div:nth-child(2) {
  font-size: 0.24rem;
  color: #333333;
  line-height: 0.38rem;
  cursor: pointer;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 2;
  overflow: hidden;
}

.Like_left > div:nth-child(3) {
  font-size: 0.32rem;
  color: #f76260;
  line-height: 0.44rem;
}

.likeimg {
  width: 1.8rem;
  height: 1.8rem;
  border-radius: 0.06rem;
  overflow: hidden;
  text-align: center;
}
.likeimg > img {
  height: 1.8rem;
  margin: 0 -10%;
}
</style>
