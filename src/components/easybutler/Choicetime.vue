<template>
  <div>
      <div id="head">
          <div class="Datearr">
            <div class="Dateitem" :class="{'checkdate' : Checkdate==key}"  v-for="(item,key) in Data" @click="Datecheck(key)" :key="key">
                <div v-text="item.showName"></div>
                <div v-text="item.date"></div>
            </div>
          </div>
      </div>
      <!-- <div id="Time">
        <div  v-for="(item,key) in Timearr" :key="key" class="Timeitem" :class="{'disabled':!item.eOrder||item.hide}">
          <div  v-text="item.showDate" v-if="!item.hide"></div>
          <div v-if="!item.eOrder||!item.hide">约满</div> 
        </div>
      </div> -->
      <div id="Day">
        <table border="0" cellspacing="0" cellpadding="0">
          <tr v-for="(item1,key1) in Timearr" :key="key1">
            <td v-for="(item2,key2) in item1" :key="key2" :class="{'disabled':!item2.eOrder||item2.hide}" @click="checkred(key1,key2,item2)">
              <div >
                <div   v-text="item2.showDate"></div>
                <div v-if="!item2.eOrder">约满</div>  
              </div>
                          
            </td>
          </tr>
        </table>
      </div>
      <div id="bottom"></div>
      <div id="foot" @click="checkoption">确定选择</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      Data: [],
      Checkdate: 0,
      size: 0,
      Timearr: "",
      checkdate: "",
      style: ""
    };
  },
  mounted() {
    $("html,body").animate({ scrollTop: 0 }, 0);
    let self = this;
    self.style = self.$route.params.style;
    self.id = self.$route.params.id;
    if (self.style == "suit") {
      self.id = JSON.parse(self.id).id;
    }
    self.size++;
    $.ajax({
      url: domain.Url + "app/easyStewardService/loadServiceDate",
      data: {
        id: self.id,
        type: self.style,
        size: self.size,
        appToken:$.cookie('appToken')
      },
      success: data => {
        if (data.isSuccess) {
          console.log(data);
          for (let i = 0; i < data.result.length; i++) {
            self.Data.push(data.result[i]);
          }
          $(".Datearr").css("width", self.Data.length * 1.74 + "rem");
          self.Datezl(data.result[0].dates);
          self.scrolladd();
        }
      }
    });
    //滚动添加
  },
  methods: {
    //确定
    checkoption() {
      if (this.style == "service") {
        this.$router.push({
          name: "appointment",
          params: {
            id: this.$route.params.id,
            type: this.$route.params.type,
            price: this.$route.params.price,
            Date: this.checkdate,
            spe: this.$route.params.spe,
            style: this.$route.params.style
          }
        });
      } else if (this.style == "suit") {
        this.$router.push({
          name: "suitappointment",
          params: {
            id: this.$route.params.id,
            type: this.$route.params.type,
            price: this.$route.params.price,
            Date: this.checkdate,
            spe: this.$route.params.spe,
            style: this.$route.params.style
          }
        });
      } else {
        let self=this
        $.ajax({
          url: domain.Url + "app/easyStewardOrder/modifySericeTime",
          data: {
            scheduleId: this.id,
            appToken: $.cookie("appToken"),
            date: this.checkdate
          },
          success: data => {
            console.log(data);
            if (data.isSuccess) {
              this.$router.push({
                name: "serviceorder",
                params: {
                  id: self.$route.query.orderId
                },
                query:{
                  type:'orderpro'
                }
              });
            }
          }
        });
      }
    },
    //添加日期
    scrolladd() {
      let self = this;
      $("#head").scroll(function() {
        var $this = $(this),
          viewH = $(this).width(), //可见宽度
          contentH = $(this).get(0).scrollWidth, //内容宽度
          scrollLeft = $(this).scrollLeft(); //滚动距离
        if (scrollLeft / (contentH - viewH) >= 0.5) {
          //到达底部100px时,加载新内容
          self.addDate();
        }
      });
    },
    //日期整理
    Datezl(Date) {
      let timearr = [];
      let x = parseInt(Date.length / 4);
      let y = Date.length % 4;
      if (y > 0) {
        for (let i = 0; i < x; i++) {
          timearr.push([]);
          for (let j = 0; j < 4; j++) {
            timearr[i].push(Date[4 * i + j]);
          }
        }
        timearr.push([]);
        for (let i = 0; i < y; i++) {
          timearr[x].push(Date[4 * x + i]);
        }
      } else {
        for (let i = 0; i < x; i++) {
          timearr.push([]);
          for (let j = 0; j < 4; j++) {
            timearr[i].push(Date[4 * i + j]);
          }
        }
      }
      this.Timearr = timearr;
      console.log(this.Timearr)
    },
    addDate() {
      let self = this;
      self.size++;
      $.ajax({
        url: domain.Url + "app/easyStewardService/loadServiceDate",
        data: {
          id: self.$route.params.id,
          type: "service",
          size: self.size
        },
        success: data => {
          if (data.isSuccess) {
            console.log(data);
            for (let i = 0; i < data.result.length; i++) {
              self.Data.push(data.result[i]);
            }
            $(".Datearr").css("width", self.Data.length * 1.74 + "rem");
          }
        }
      });
    },
    //时间选择
    checkred(key1, key2, item2) {
      console.log(item2);
      if (!item2.hide) {
        if (item2.eOrder) {
          $("td").removeClass("checked");
          $("tr")
            .eq(key1)
            .find("td")
            .eq(key2)
            .addClass("checked");
          this.checkdate = item2.date;
        }
      }
    },
    //日期选择
    Datecheck(key) {
      let left = $(".Dateitem")
        .eq(key)
        .get(0).offsetLeft;
      let width = $(".Dateitem")
        .eq(key)
        .get(0).offsetWidth;
      let s;
      if (left) {
        s = left - width;
      } else {
        s = 0;
      }
      this.Checkdate = key;
      this.Datezl(this.Data[key].dates);
      $("#head").animate({ scrollLeft: s }, 100);
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../../static/css/easybutler/Choicetime.less);
</style>
