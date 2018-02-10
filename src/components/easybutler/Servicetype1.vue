<template>
  <div>
      <div id="head"></div>
      <div class="serviceitem" v-for="(item,key) in Data" :key="key">
          <img :src="imgurl+item.image" alt="">
          <div class="serviceright">
              <div class="righttit" v-text="item.name"></div>
              <div class="rightbot">
                  <span>￥{{item.price}}元/{{item.unit}}</span>
                  <div>
                      <img src="../../../static/img/easybutimg/reduce.png" alt="" v-if="item.num" @click="reduce(key)">
                      <span v-text="item.num" v-if="item.num"></span>
                      <img src="../../../static/img/easybutimg/add.png" alt="" @click="add(key)">
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
      imgurl: "http://image.qsmam.com/"
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
    add(key) {
      this.Data[key].num++;
      let price = 0;
      for (let i = 0; i < this.Data.length; i++) {
        price = price + this.Data[i].price * this.Data[i].num;
      }
      this.price = price;
    },
    reduce(key) {
      this.Data[key].num--;
      let price = 0;
      for (let i = 0; i < this.Data.length; i++) {
        price = price + this.Data[i].price * this.Data[i].num;
      }
      this.price = price;
    },
    appointment() {
      let Bol=false;
      for(let i=0;i<this.Data.length;i++){
        if(this.Data[i].num>0){
          Bol=true
        }
      }
      if(!Bol){
       return this.$dialog.toast({
          mes: "请选择服务类型",
          timeout: 1500
        });
      }
      let type = [];
      for (let i = 0; i < this.Data.length; i++) {
        if (this.Data[i].num > 0) {
          type.push({
            name: this.Data[i].name,
            id: this.Data[i].id,
            num: this.Data[i].num
          });
        }
      } 
      type = JSON.stringify(type);
      if(this.$route.query.orign=='detail'){
        this.$router.push({
          name: "Projectdetail",
          params: {
            id: this.$route.params.id
          },
          query:{
            type:type,
             price: this.price,
          }
        });
      }else{
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
