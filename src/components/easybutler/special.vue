<template>
  <div>
      <div id="head">
          <div class="title">热门标签</div>
          <div class="labelarr">
              <div class="labelitem" v-for="(item,key) in Data" :key="key" v-text="item.stewardLabels" @click="labelcheck(key)">
                  
              </div>
          </div>
      </div>
      <div id="bz">
          <div class="title">其他备注</div>
          <div class="input">
              <textarea placeholder="请填写您的特殊需求" maxlength="140" v-model="adcive" @input="change"></textarea>
              <div>{{length}}/140</div>
          </div>
      </div>
      <div id="foot" @click="submit">
          提交
      </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Data: "",
      adcive: "",
      length: 0,
      style: ""
    };
  },
  mounted() {
    $("html,body").animate({ scrollTop: 0 }, 0);
    let self = this;
    self.style = self.$route.params.style;
    $.ajax({
      url: domain.Url + "app/easycomment/labelslistspecial",
      data: {
        type: self.style,
        appToken: $.cookie("appToken")
      },
      success: data => {
        if (data.isSuccess) {
          self.Data = data.result;
        }
      }
    });
  },
  methods: {
    labelcheck(key) {
      let label = $(".labelitem").eq(key);
      if (label.hasClass("checkred")) {
        label.removeClass("checkred");
      } else {
        label.addClass("checkred");
      }
    },
    change() {
      this.length = this.adcive.length;
    },
    submit() {
      let label = $(".labelitem");
      let labels = "";
      for (let i = 0; i < this.Data.length; i++) {
        if (label.eq(i).hasClass("checkred")) {
          labels = labels + this.Data[i].stewardLabels + ",";
        }
      }
      if (this.adcive) {
        labels = labels + this.adcive;
      } else {
        labels = labels.slice(0, -1);
      }
      if(labels==''){
        labels=0
      }
      if (this.style == "service") {
        this.$router.push({
          name: "appointment",
          params: {
            id: this.$route.params.id,
            type: this.$route.params.type,
            price: this.$route.params.price,
            Date: this.$route.params.Date,
            spe: labels,
            style: this.$route.params.style
          }
        });
      } else {
        this.$router.push({
          name: "suitappointment",
          params: {
            id: this.$route.params.id,
            type: this.$route.params.type,
            price: this.$route.params.price,
            Date: this.$route.params.Date,
            spe: labels,
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
#head {
  padding: 0.4rem 0.3rem;
  box-sizing: border-box;
  margin-bottom: 0.8rem;
  .title {
    font-family: PingFangSC-Regular;
    font-size: 0.32rem;
    color: #333333;
    letter-spacing: 0.03px;
    margin-bottom: 0.2rem;
  }
}
.labelarr {
  display: flex;
  flex-wrap: wrap;
  .labelitem {
    padding: 0 0.12rem;
    height: 0.42rem;
    line-height: 0.42rem;
    font-family: PingFangSC-Regular;
    font-size: 0.24rem;
    color: #666666;
    letter-spacing: 0.02px;
    margin-right: 0.4rem;
    border: 0.02rem solid #dddddd;
    border-radius: 0.06rem;
    margin-bottom: .2rem;
     cursor: pointer;
  }
  .checkred {
    color: #ffffff;
    background: #f76260;
    border: none;
  }
}
#bz {
  padding: 0 0.3rem;
  box-sizing: border-box;
  .input {
    width: 100%;
    height: 4rem;
    border: 0.02rem solid #dddddd;
    border-radius: 0.06rem;
    padding: 0.2rem;
    box-sizing: border-box;
    font-family: PingFangSC-Regular;
    font-size: 0.24rem;
    letter-spacing: 0.02px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    textarea {
      width: 100%;
      height: 3rem;
      border: none;
    }
    div {
      width: 100%;
      text-align: right;
    }
  }
}
#foot {
  width: 100%;
  height: 0.96rem;
  background: #f76260;
  color: #ffffff;
  text-align: center;
  line-height: 0.96rem;
  font-size: 0.36rem;
  position: fixed;
  bottom: 0;
   cursor: pointer;
}
</style>
