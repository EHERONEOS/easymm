<template>
	<div>
		<div id="main">
			<div id="yhxx" >
				<!--默认地址-->
				<div class="mradd" v-if="address" @click="changeaddress()">
					<div class="mrleft">
						<div class="mrname">
							<img src="../../../static/img/easymmimg/yonhu.png"/>
							<span>{{address.name}}</span>
						</div>
						<div class="mrtel">
							<img src="../../../static/img/easymmimg/tel.png"/>
							<span>{{address.mobile}}</span>
						</div>
						<div class="mrdz">{{address.province}}{{address.city}}{{address.area}}{{address.address}}</div>
					</div>
					<img src="http://image.qsmam.com/qs-jt-1.png"/>
				</div>
				<!--无默认地址时-->
				<div class="nodezhi" v-else @click="changeaddress()">
					<img src="../../../static/img/easymmimg/yonhu.png" alt="" />
					<div>+新建联系人</div>
				</div>
				<!--身份证-->
				<div id="sfz">
					<label for="sfzhm">身份证号：</label>
					<input type="number" name="sfzhm" id="sfzhm" v-model="sfznumber" placeholder="请填写您的身份证号"/>
				</div>
				<!--雇佣时间-->
				<div class="grtime">
					<div class="grtit">
						<img src="../../../static/img/easymmimg/grsj.png" alt="" />
						<div>雇佣时间</div>
					</div>
					<div class="Time">
						<div class="tt">
							<input type="text" v-model="starttime"  id="left" class="rq" name="appDate" readonly="readonly">
							<div v-text="Days+'天'"></div>
							<input type="text" v-model="endtime" id="right" class="rq" name="appDate" readonly="readonly">
						</div>
						<div class="zhsj">
							<div>开始时间</div>
							<div>结束时间</div>
						</div>
						
					</div>
				</div>
				<!--订单信息-->
				<div class="ddxx">
					<div class="ddtit">
						<img src="../../../static/img/easymmimg/grsj.png" alt="" />
						<div>订单信息</div>
					</div>
					<!--护理师信息-->
					<div class="xx">
						<img :src="nurseImage" alt="" />
						<div class="crsxx">
							<div>{{nursename}}</div>
							<div>￥{{nurseoldprice}}</div>
							<div>￥{{nursenewprice}}</div>
						</div>
					</div>
					<!--假期信息-->
					<div class="xx" v-for="(item,key) in Vacationarr" :key="key">
						<img :src="imgurl+item.image" alt="" />
						<div class="crsxx">
							<div>{{item.name}}</div>
							<div>{{item.time}}</div>
							<div>￥{{item.price}}元</div>
						</div>
					</div>
					<!--合计价格-->
					<div class="jine">
						<span>合计：</span>
						<span>￥{{hjprice}}元</span>
					</div>
				</div>
				<div class="htxz">
				</div>
				<div class="xdd">
					<div>
						<span>支付定金：</span>
						<span>￥{{dj}}元</span>
					</div>
					<div id="xd" @click="appointment">立即下单</div>
				</div>
			</div>		
		</div>			
	</div>
</template>

<script>
export default {
  data() {
    return {
      Data: "",
      appToken: "",
      address: null,
      sfznumber: "",
      starttime: "",
      endtime: "",
      Days: "",
      nurseImage: "",
      nursename: "",
      nurseoldprice: "",
      nursenewprice: "",
      nurseId: "",
      nurseJobId: "",
      Vacationarr: [],
      imgurl: "http://image.qsmam.com/",
      hjprice: "",
      dj: 0
    };
  },
  mounted() {
    $("html,body").animate({ scrollTop: 0 }, 0);
    let self = this;
    self.job = self.$route.params.job;
    self.nurseId = self.$route.params.nurseId;
    self.nurseJobId = self.$route.params.nurseJobId;
    self.appToken = $.cookie("appToken");
    self.nurseImage = sessionStorage.getItem("nurseImage");
    self.nursename = sessionStorage.getItem("nursename");
    self.nurseoldprice = sessionStorage.getItem("nurseoldprice");
    self.nursenewprice = sessionStorage.getItem("nursenewprice");
    self.nurseoneprice = sessionStorage.getItem("nurseoneprice");

    self.starttime = sessionStorage.getItem("startTime");
    self.endtime = sessionStorage.getItem("endTime");
    setTimeout(() => {
      self.Vacation();
    }, 200);
    self.Days = domain.getDays(self.starttime, self.endtime);
    let selectDateDom1 = $("#left");
    let showDateDom1 = $("#left");
    let selectDateDom2 = $("#right");
    let showDateDom2 = $("#right");
    showDateDom1.attr("data-year", parseInt(self.starttime.slice(0, 4)));
    showDateDom1.attr("data-month", parseInt(self.starttime.slice(5, 7)));
    showDateDom1.attr("data-date", parseInt(self.starttime.slice(8, 10)));
    showDateDom2.attr("data-year", parseInt(self.endtime.slice(0, 4)));
    showDateDom2.attr("data-month", parseInt(self.endtime.slice(5, 7)));
    showDateDom2.attr("data-date", parseInt(self.endtime.slice(8, 10)));
    let nowYear = parseInt(self.starttime.slice(0, 4));
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
          self.Vacation();
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
          self.Vacation();
        }
      });
    });

    let address = sessionStorage.getItem("address");
    // 获取地址
    if (address) {
      self.address = JSON.parse(address);
    } else {
      $.ajax({
        url: domain.Url + "app/userAddress/loadDefaultAddress",
        data: {
          appToken: self.appToken
        },
        success: data => {
          console.log(data);
          if (data.isSuccess) {
            self.address = data.result;
          } else {
            self.address = null;
          }
        }
      });
    }
    //获取身份证号
    if (sessionStorage.getItem("sfznumber")) {
      self.sfznumber = sessionStorage.getItem("sfznumber");
    }
  },
  methods: {
    //下订单
    appointment() {
      let self = this;
      let leftr = $("#left").val();
      let rightr = $("#right").val();
      if (domain.getDays(leftr, rightr) < 25) {
        return self.Prompt("亲，预约时间不能小于26天");
      }
      if (!self.sfznumber) {
        return self.Prompt("身份证不能为空");
      }
      if (!domain.isCardNo(self.sfznumber)) {
        return self.Prompt("请输入正确的身份证号");
      }
      if (!self.address) {
        return self.Prompt("地址不能为空");
      }
      $.ajax({
        url: domain.Url + "app/order/toSaveOrder",
        data: {
          identificationCode: self.sfznumber,
          job: self.job,
          nurseJobId: self.nurseJobId,
          nurseId: self.nurseId,
          realHireStartTime: leftr,
          realHireEndTime: rightr,
          userAddress:
            self.address.province +
            self.address.city +
            self.address.area +
            self.address.address,
          province: self.address.province,
          city: self.address.city,
          area: self.address.area,
          address: self.address.address,
          userMobile: self.address.mobile,
          userName: self.address.name,
          appToken: self.appToken,
          ccity: "杭州"
        },
        success: data => {
          if (data.isSuccess) {
            let Data = {
              orderId: data.result.orderId,
              job: self.job,
              appToken: $.cookie("appToken"),
              type: "Hls"
            };
            Data = JSON.stringify(Data);
            let redirect_uri =
              "http://www.qsmam.com/mobile/weixinH5/page/payment.html?Data=" +
              Data;
            redirect_uri = encodeURI(redirect_uri);
            //授权地址
            let Url =
              "https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5db600fa5c3a6eb2&redirect_uri=" +
              redirect_uri +
              "&response_type=code&scope=snsapi_base&state=123#wechat_redirect";
            location.href = Url;
          } else if (data.code == 3000001) {
            self.Prompt(data.message);
            this.$router.push({name:'Orderdetail',params: {id:data.result.orderId}})
          } else {
            return self.Prompt(data.message);
          }
        }
      });
    },
    //改变地址
    changeaddress() {
      this.$router.push({
        name: "address",
        params: {
          job: this.job,
          nurseId: this.nurseId,
          nurseJobId: this.nurseJobId
        }
      });
    },
    //获取假期信息
    Vacation() {
      let self = this;
      $.ajax({
        url: domain.Url + "app/order/toCheckOrder",
        data: {
          nurseJobId: self.nurseJobId,
          realHireStartTime: $("#left").val(),
          realHireEndTime: $("#right").val(),
          appToken: self.appToken
        },
        success: data => {
          console.log(data);
          if (data.isSuccess) {
            self.Vacationarr = data.result;
            self.price();
          } else {
            return self.Prompt(data.message);
          }
        }
      });
    },
    //计算价格
    price() {
      let self = this;
      let price = 0;
      let Days = domain.getDays($("#left").val(), $("#right").val()) + 1;
      for (let i = 0; i < self.Vacationarr.length; i++) {
        price += self.Vacationarr[i].price;
      }
      self.hjprice = Math.round(price + parseInt(self.nurseoneprice) * Days);
      if (self.job == "YS") {
        self.dj = "1050";
      } else {
        let data = {
          appSecret: "qsmm",
          appToken: self.appToken,
          job: "YYS",
          nurseId: self.nurseId,
          realHireEndTime: $("#right").val(),
          realHireStartTime: $("#left").val(),
          system: "web",
          timestamp: Date.parse(new Date())
        };
        //MD5加密
        let param = $.param(data);
        data.sign = md5.hexMD5(param);
        $.ajax({
          type: "post",
          url: domain.Url + "app/order/loadServicePrice",
          data: data,
          success: function(data) {
            if (data.isSuccess) {
              self.dj = data.result + 1050;
            }
          }
        });
      }
    },
    Prompt(text) {
      this.$dialog.toast({
        mes: text,
        timeout: 1500
      });
    }
  }
};
</script>

<style scoped>
@import url(../../../static/css/easymm/Hlsorder.css);
</style>