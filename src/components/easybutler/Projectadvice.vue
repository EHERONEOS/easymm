<template>
  <div>
      <div id="Selectedadvise"  v-if="Data">
            <div class="adviseitem" v-for="(item,key) in Data" :key="key">
                <div class="advitem_tit">
                    <div class="advitem_left">
                        <img :src="imgurl+item.userImage" alt="" v-if="item.userImage && item.userImage!='default_mother.png'">
                            <img src="../../../static/img/easybutimg/mrimg.png" alt="" v-else>
                        <span v-text="item.userNickname"></span>
                    </div>
                    <div class="advitem_right">
                        <img src="../../../static/img/easybutimg/zan.png" alt="">
                        <span v-text="item.eUserUp"></span>
                    </div>
                </div>
                <div class="advitem_content" v-html="item.msg">
                </div>
                <div class="advitem_time" v-text="item.pushTime"></div>
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
      appToken: ""
    };
  },
  mounted() {
    $("html,body").animate({ scrollTop: 0 }, 0);
    this.loadlist();
  },
  methods: {
    loadlist() {
      let self = this;
      self.appToken = $.cookie("appToken");
      self.id = self.$route.params.id;
      self.type = self.$route.params.type;
      $.ajax({
        url: domain.Url + "app/easycomment/listcomment",
        data: {
          type: self.type,
          id: self.id,
          appToken: self.appToken
        },
        success: data => {
          console.log(data);
          if (data.isSuccess) {
            self.Data = data.result;
          }
        }
      });
    }
  }
};
</script>
<style scoped>
#Selectedadvise {
  /* margin-top: .8rem; */
  padding: 0 0.3rem;
  box-sizing: border-box;
}

.advisetit {
  font-family: PingFangSC-Regular;
  letter-spacing: 0.05px;
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
}

.advisetit > div:nth-child(1) {
  font-size: 0.32rem;
  color: #333333;
}

.advisetit > div:nth-child(2) {
  font-size: 0.24rem;
  color: #999999;
}

.advisetit > div:nth-child(2) > img {
  width: 0.09rem;
  height: 0.18rem;
}

.adviseitem {
  border-bottom: 0.02rem solid #f4f4f4;
}
.adviseitem:last-child {
  border: none;
}
.advitem_tit {
  display: flex;
  justify-content: space-between;
  margin: 0.2rem 0;
}

.advitem_left {
  font-family: PingFangSC-Regular;
  font-size: 0.3rem;
  color: #666666;
  letter-spacing: 0.04px;
  display: flex;
  align-items: center;
}

.advitem_left > img {
  width: 0.5rem;
  height: 0.5rem;
  border-radius: 50%;
  margin-right: 0.2rem;
}

.advitem_right {
  font-family: PingFangSC-Regular;
  font-size: 0.2rem;
  color: #999999;
  display: flex;
  align-items: center;
}

.advitem_right > img {
  width: 0.22rem;
  height: 0.22rem;
  margin-right: 0.08rem;
}

.advitem_content {
  font-family: PingFangSC-Regular;
  font-size: 0.3rem;
  line-height: 0.28rem;
  color: #666666;
  line-height: 0.34rem;
  margin-bottom: 0.2rem;
}

.advitem_time {
  font-family: PingFangSC-Regular;
  font-size: 0.2rem;
  color: #999999;
  margin-bottom: 0.2rem;
}

.advitem_Customer {
  font-family: PingFangSC-Regular;
  font-size: 0.24rem;
  height: 0.44rem;
  line-height: 0.44rem;
  color: #666666;
  background: #f4f4f4;
  margin-bottom: 0.2rem;
}
</style>
