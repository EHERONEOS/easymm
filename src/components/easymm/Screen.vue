<template>
  <div >
        <div class="HlsDate">
			<div>护理师档期</div> 
			<div class="start">
				<input type="text" name="appDate" id="appDate1" placeholder="服务开始时间" v-model="starttime" readonly="readonly"/>
				<div id="days" v-text="Days+'天'" v-if="starttime && endtime"></div>             
				<input type="text" name="appDate" id="appDate2" placeholder="服务结束时间" style="text-align:right" v-model="endtime" readonly="readonly"/>
			</div>
		</div>
        <div class="bq">
			<div>年龄</div>
			<div class="bqarr age">
                <div v-for="(item,key) in ageLines" :key="key" :class="{'check':!key}" v-text="item.title" @click="checked('age',key)">       
                </div>
			</div>
		</div>
        <div class="bq">
			<div>价格</div>
			<div class="bqarr pre">
                <div v-for="(item,key) in priceLines" :key="key" :class="{'check':!key}" v-text="item.title" @click="checked('pre',key)">
                </div>
			</div>
		</div>
        <div class="bq">
			<div>从业年限</div>
			<div class="bqarr year">
                <div v-for="(item,key) in workYearSign" :key="key" :class="{'check':!key}" v-text="item.title" @click="checked('year',key)">
    
                </div>
			</div>
		</div>
        <div class="bq">
			<div>属相</div>
			<div class="bqarr animal">
                <div v-for="(item,key) in animalSign" :key="key" :class="{'check':!key}" v-text="item.name" @click="checked('animal',key)">
                    
                </div>
			</div>
		</div>
        <div class="bq" style="margin-bottom:0">
			<div>属相</div>
			<div class="bqarr city">
                <div v-for="(item,key) in cities" :key="key" :class="{'check':!key}" v-text="item" @click="checked('city',key)">
                    
                </div>
			</div>
		</div>
        <div id="foot"></div>
		<div id="bottom">
			<div id="clear" @click="clear">清空</div>
			<div id="qd" @click="submit">确定</div>
		</div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      job: "",
      starttime: "",
      endtime: "",
      ageLines: "",
      animalSign: "",
      cities: "",
      workYearSign: "",
      priceLines: "",
      agearr: [],
      prearr: [],
      yeararr: [],
      animalarr: [],
      cityarr: [],
      Days: 0,
      Today: ""
    };
  },
  mounted() {
    $("html,body").animate({ scrollTop: 0 }, 0);
    let selectDateDom1 = $("#appDate1");
    let showDateDom1 = $("#appDate1");
    let selectDateDom2 = $("#appDate2");
    let showDateDom2 = $("#appDate2");
    let self = this;
    this.job = this.$route.params.job;
    let myDate = new Date();
    let nowYear = myDate.getFullYear();
    let nowMonth = myDate.getMonth() + 1;
    let nowDate = myDate.getDate();
    showDateDom1.attr("data-year", nowYear);
    showDateDom1.attr("data-month", nowMonth);
    showDateDom1.attr("data-date", nowDate);
    showDateDom2.attr("data-year", nowYear);
    showDateDom2.attr("data-month", nowMonth);
    showDateDom2.attr("data-date", nowDate);
    if (this.$route.params.sx != 0) {
      let sx = JSON.parse(this.$route.params.sx);
      self.starttime = sx.startTime;
      self.endtime = sx.endTime;
      self.Days = domain.getDays(sx.startTime, sx.endTime) + 1;
    }
    let mon, da;
    if (nowMonth < 10) {
      mon = "0" + nowMonth;
    } else {
      mon = nowMonth;
    }
    if (nowDate < 10) {
      da = "0" + nowDate;
    } else {
      da = nowDate;
    }
    self.Today = nowYear + "-" + mon + "-" + da;
    // 数据初始化
    function formatYear(nowYear) {
      var arr = [];
      for (var i = nowYear - 5; i <= nowYear + 5; i++) {
        arr.push({
          id: i + "",
          value: i + "年",
          inval: i
        });
      }
      return arr;
    }
    function formatMonth() {
      var arr = [];
      for (var i = 1; i <= 12; i++) {
        let m = 0;
        if (i < 10) {
          m = "0" + i;
        } else {
          m = i;
        }
        arr.push({
          id: i + "",
          value: i + "月",
          inval: m
        });
      }
      return arr;
    }
    function formatDate(count) {
      var arr = [];
      for (var i = 1; i <= count; i++) {
        let m = 0;
        if (i < 10) {
          m = "0" + i;
        } else {
          m = i;
        }
        arr.push({
          id: i + "",
          value: i + "日",
          inval: m
        });
      }
      return arr;
    }
    var yearData = function(callback) {
      callback(formatYear(nowYear));
    };
    var monthData = function(year, callback) {
      callback(formatMonth());
    };
    var dateData = function(year, month, callback) {
      if (/^(1|3|5|7|8|10|12)$/.test(month)) {
        callback(formatDate(31));
      } else if (/^(4|6|9|11)$/.test(month)) {
        callback(formatDate(30));
      } else if (/^2$/.test(month)) {
        if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) {
          callback(formatDate(29));
        } else {
          callback(formatDate(28));
        }
      } else {
        throw new Error("month is illegal");
      }
    };
    selectDateDom1.bind("click", function() {
      var oneLevelId = showDateDom1.attr("data-year");
      var twoLevelId = showDateDom1.attr("data-month");
      var threeLevelId = showDateDom1.attr("data-date");
      var iosSelect = new IosSelect(3, [yearData, monthData, dateData], {
        title: "服务开始时间",
        itemHeight: 35,
        oneLevelId: oneLevelId,
        twoLevelId: twoLevelId,
        threeLevelId: threeLevelId,
        showLoading: true,
        callback: function(selectOneObj, selectTwoObj, selectThreeObj) {
          showDateDom1.attr("data-year", selectOneObj.id);
          showDateDom1.attr("data-month", selectTwoObj.id);
          self.starttime =
            selectOneObj.inval +
            "-" +
            selectTwoObj.inval +
            "-" +
            selectThreeObj.inval;
          if (self.starttime && self.endtime) {
            self.Days = domain.getDays(self.starttime, self.endtime) + 1;
          }
        }
      });
    });
    selectDateDom2.bind("click", function() {
      var oneLevelId = showDateDom2.attr("data-year");
      var twoLevelId = showDateDom2.attr("data-month");
      var threeLevelId = showDateDom2.attr("data-date");
      var iosSelect = new IosSelect(3, [yearData, monthData, dateData], {
        title: "服务结束时间",
        itemHeight: 35,
        oneLevelId: oneLevelId,
        twoLevelId: twoLevelId,
        threeLevelId: threeLevelId,
        showLoading: true,
        callback: function(selectOneObj, selectTwoObj, selectThreeObj) {
          showDateDom2.attr("data-year", selectOneObj.id);
          showDateDom2.attr("data-month", selectTwoObj.id);
          self.endtime =
            selectOneObj.inval +
            "-" +
            selectTwoObj.inval +
            "-" +
            selectThreeObj.inval;
          if (self.starttime && self.endtime) {
            self.Days = domain.getDays(self.starttime, self.endtime) + 1;
          }
        }
      });
    });
    $.ajax({
      url: domain.Url + "app/nursejob/searchInit2",
      data: {
        job: self.job
      },
      success: data => {
        if (data.isSuccess) {
          self.ageLines = data.result.ageLines;
          self.animalSign = data.result.animalSign;
          self.cities = data.result.cities;
          self.workYearSign = data.result.workYearSign;
          self.priceLines = data.result.priceLines;
        }
      }
    });
  },
  methods: {
    getDays(strDateStart, strDateEnd) {
      var strSeparator = "-"; //日期分隔符
      var oDate1;
      var oDate2;
      var iDays;
      oDate1 = strDateStart.split(strSeparator);
      oDate2 = strDateEnd.split(strSeparator);
      var strDateS = new Date(oDate1[0], oDate1[1] - 1, oDate1[2]);
      var strDateE = new Date(oDate2[0], oDate2[1] - 1, oDate2[2]);

      iDays = (strDateE - strDateS) / 1000 / 60 / 60 / 24; //把相差的毫秒数转换为天数
      return iDays;
    },
    submit() {
      let self = this;
      if ($("#appDate1").val()) {
        sessionStorage.setItem("startTime", $("#appDate1").val());
      }
      if ($("#appDate2").val()) {
        sessionStorage.setItem("endTime", $("#appDate2").val());
      }

      let age = this.agearr.toString();
      let pre = this.prearr.toString();
      let year = this.yeararr.toString();
      let animal = this.animalarr.toString();
      let city = this.cityarr.toString();
      let sx = {
        age: age,
        pre: pre,
        year: year,
        animal: animal,
        city: city,
        startTime: $("#appDate1").val(),
        endTime: $("#appDate2").val(),
        nursename: ""
      };
      // console.log(sx)
      this.$router.push({
        name: "Hlslist",
        params: { job: this.job, sx: JSON.stringify(sx) }
      });
    },
    clear() {
      this.agearr = this.prearr = this.yeararr = this.animalarr = this.cityarr = [];
      $("#appDate1").val("");
      $("#appDate2").val("");
      $(".bqarr>div").removeClass("check");
      $(".bqarr>div:nth-child(1)").addClass("check");
    },
    checked(type, key) {
      let self = this;
      if (type == "age") {
        let agebq = $(".age>div");
        if (key) {
          agebq.eq(0).removeClass("check");
          if (agebq.eq(key).hasClass("check")) {
            agebq.eq(key).removeClass("check");
            let x = self.agearr.indexOf(self.ageLines[key].title);
            if (x > -1) {
              self.agearr.splice(x, 1);
            }
          } else {
            agebq.eq(key).addClass("check");
            self.agearr.push(self.ageLines[key].title);
          }
        } else {
          agebq.removeClass("check"), agebq.eq(0).addClass("check");
          self.agearr = [];
        }
      } else if (type == "pre") {
        let prebq = $(".pre>div");
        if (key) {
          prebq.eq(0).removeClass("check");
          if (prebq.eq(key).hasClass("check")) {
            prebq.eq(key).removeClass("check");
            let x = self.prearr.indexOf(self.priceLines[key].title);
            if (x > -1) {
              self.prearr.splice(x, 1);
            }
          } else {
            prebq.eq(key).addClass("check");
            self.prearr.push(self.priceLines[key].title);
          }
        } else {
          prebq.removeClass("check"), prebq.eq(0).addClass("check");
          self.prearr = [];
        }
      } else if (type == "year") {
        let yearbq = $(".year>div");
        if (key) {
          yearbq.eq(0).removeClass("check");
          if (yearbq.eq(key).hasClass("check")) {
            yearbq.eq(key).removeClass("check");
            let x = self.yeararr.indexOf(self.workYearSign[key].title);
            if (x > -1) {
              self.yeararr.splice(x, 1);
            }
          } else {
            yearbq.eq(key).addClass("check");
            self.yeararr.push(self.workYearSign[key].title);
          }
        } else {
          yearbq.removeClass("check"), yearbq.eq(0).addClass("check");
          self.yeararr = [];
        }
      } else if (type == "animal") {
        let animalbq = $(".animal>div");
        if (key) {
          animalbq.eq(0).removeClass("check");
          if (animalbq.eq(key).hasClass("check")) {
            animalbq.eq(key).removeClass("check");
            let x = self.animalarr.indexOf(self.animalSign[key].name);
            if (x > -1) {
              self.animalarr.splice(x, 1);
            }
          } else {
            animalbq.eq(key).addClass("check");
            self.animalarr.push(self.animalSign[key].name);
          }
        } else {
          animalbq.removeClass("check"), animalbq.eq(0).addClass("check");
          self.animalarr = [];
        }
      } else if (type == "city") {
        let citybq = $(".city>div");
        if (key) {
          citybq.eq(0).removeClass("check");
          if (citybq.eq(key).hasClass("check")) {
            citybq.eq(key).removeClass("check");
            let x = self.cityarr.indexOf(self.cities[key]);
            if (x > -1) {
              self.cityarr.splice(x, 1);
            }
          } else {
            citybq.eq(key).addClass("check");
            self.cityarr.push(self.cities[key]);
          }
        } else {
          citybq.removeClass("check"), citybq.eq(0).addClass("check");
          self.cityarr = [];
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../../static/css/easymm/Screen.less);
</style>
