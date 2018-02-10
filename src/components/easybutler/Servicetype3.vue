<template>
  <div>
      <div id="head"></div>
        <div class="serviceitem" v-for="(item,key) in Data" :key="key" @click="radios(key)">
            <img :src="imgurl+item.image" alt="">
            <div class="serviceright">
                <div class="righttit" v-text="item.name"></div>
                <div class="rightbot">
                    <span>首次体验￥{{item.firstPrice}}元/{{item.unit}}</span>
                    <div class="radio" :class="{'red':key==radio}">
                            
                    </div>
                </div>
            </div>     
        </div>
      <div id="bottom"></div>
      <div id="foot">
          <div class="pre">￥{{price}}元</div>
          <div class="appointment" @click="appointment">立即购买</div>
      </div>
  </div>

</template> 
<script>
export default {
  data() {
    return {
      xcqnum: 0,
      cyyjnum: 0,
      Data: "",
      numarr: [],
      price: 0,
      imgurl: "http://image.qsmam.com/",
      radio: -1
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
          let Data = data.result;
          for (let i = 0; i < data.result.length; i++) {
            Data[i].num = 0;
          }
          self.Data = Data;
          this.$dialog.loading.close();
        }
      }
    });
  },
  methods: {
    radios(key) {
      this.radio = key;
      this.price = this.Data[key].firstPrice;
    },
    appointment() {
      if (this.radio == -1) {
        this.$dialog.toast({
          mes: "请选择服务类型",
          timeout: 1500
        });
      } else {
        let type = [{
          name: this.Data[this.radio].name,
          id: this.Data[this.radio].id,
          num: 1
        }];
        type = JSON.stringify(type);
        this.$router.push({
          name: "appointment",
          params: {
            id: this.$route.params.id,
            type: type,
            price: this.price,
            Date: this.$route.params.Date,
            spe: this.$route.params.spe,
            Coupon: this.$route.params.Coupon,
            style: this.$route.params.style
          }
        });
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../../static/css/easybutler/servicetype1.less);
</style>
