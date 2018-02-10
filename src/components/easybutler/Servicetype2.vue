<template>
  <div>
      <div v-if="Data">
            <div id="head">英式管家式服务、优享品质</div>
            <div id="home" v-if="Data">
                <div class="homeitem" :class="{'check1':key==che1}" v-for="(item,key) in Data" :key="key" v-text="item.name" @click="home(key)">
                </div>
            </div>
            <div id="week" v-if="Data">
                <div id="box">
                    <div v-for="(item,key) in Data2" :key="key" :class="{'check2':key==che2}" v-text="item.name" @click="week(key)">一周1次</div>
                </div>

            </div>
            <div id="package">
                <div class="packitem" v-for="(item,key) in Data3" :key="key" @click="suitcheck(key)">
                    <div class="left">
                        <div class="leftone">
                            <span v-text="item.name"></span>
                        </div>
                        <div class="lefttwo" v-text="item.introduce"></div>
                    </div>
                    <div class="right">{{item.price}}元</div>
                </div>
            </div>
            <div id="bottom"></div>
            <div id="foot">
                <div class="pre">￥{{price}}元</div>
                <div class="appointment" @click="appointment">立即购买</div>
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
      che1: 0,
      che2: 0,
      Data2: "",
      Data3: "",
      price: 0,
      type: 0
    };
  },
  mounted() {
    $("html,body").animate({ scrollTop: 0 }, 0);
    let self = this;
    this.$dialog.loading.open("加载中...");
    $.ajax({
      url: domain.Url + "app/easyStewardService/loadServiceChildren",
      data: {
        id: self.$route.params.id,
        appToken: $.cookie("appToken")
      },
      success: data => {
        console.log(data);
        if (data.isSuccess) {
          self.Data = data.result;
          self.Data2 = data.result[0].children;
          self.Data3 = data.result[0].children[0].children;
          this.$dialog.loading.close();
        }
      }
    });
  },
  methods: {
    appointment() {
      this.$router.push({
        name: "appointment",
        params: {
          id: this.$route.params.id,
          type: this.type,
          price: this.price,
          Date: this.$route.params.Date,
          spe: this.$route.params.spe,
          Coupon: this.$route.params.Coupon,
          style: this.$route.params.style
        }
      });
    },
    home(key) {
      if (key != this.che1) {
        $(".packitem").removeClass("checkred");
        this.price = 0;
        this.type = "";
      }
      this.che1 = key;
      this.che2 = 0;
      this.Data3 = this.Data[this.che1].children[this.che2].children;
    },
    week(key) {
      if (key != this.che2) {
        $(".packitem").removeClass("checkred");
        this.price = 0;
        this.type = "";
      }
      this.che2 = key;
      this.Data3 = this.Data[this.che1].children[this.che2].children;
    },
    suitcheck(key) {
      $(".packitem").removeClass("checkred");
      $(".packitem")
        .eq(key)
        .addClass("checkred");
      this.price = this.Data3[key].price;
      // this.type = this.Data3[key].name;
      let type = {
        name: this.Data3[key].name,
        id: this.Data3[key].id,
        num: 1
      };
      this.type=JSON.stringify(type)
    }
  }
};
</script>
<style scoped>
@import url(../../../static/css/easybutler/servicetypezs2.css);
</style>
