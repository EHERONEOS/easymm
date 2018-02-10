//数据请求url
const domain = 'https://www.qsmam.com/';
// const domain = 'http://test.qsmam.com/';
const Imgsrc = 'http://image.qsmam.com/';
//手机号验证
const Isphone = (phone) => {
  let r = /^1[3,4,5,7,8]\d{9}$/;
  return r.test(phone);
}

//检测身份证的合法性
const isCardNo = (card) => {
  // 身份证号码为15位或者18位，15位时全为数字，18位前17位为数字，最后一位是校验位，可能为数字或字符X
  let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
  return reg.test(card)
}
const getDays = (strDateStart, strDateEnd) => {
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
}
//获取当月天数
const getDaysInOneMonth = (year, month) => {
  month = parseInt(month, 10);
  var d = new Date(year, month, 0);
  return d.getDate();
}
//判断哪天是星期几
const getWeekByDay = (dayValue) => {
  var day = new Date(Date.parse(dayValue.replace(/-/g, '/')));
  return day.getDay();
}

const addday = (x) => {
  var Day = '';
  for (var i = 0; i < 7; i++) {
    Day += '<td>' + (x + i) + '</td>'
  }
  return Day
}
const wxpay = (data) => {
  function onBridgeReady() {
    WeixinJSBridge.invoke(
      'getBrandWCPayRequest', {
        "appId": data.appId, //公众号名称，由商户传入
        "timeStamp": data.timeStamp, //时间戳，自1970年以来的秒数
        "nonceStr": data.nonceStr, //随机串
        "package": data.packageStr,
        "signType": 'md5', //微信签名方式：
        "paySign": data.sign //微信签名
      },
      function (res) {
        if (res.err_msg == "get_brand_wcpay_request:ok") {
          location.href = "orddetal.html?id=" + orderId + '&appToken=' + appToken;
        }
        if (res.err_msg == "get_brand_wcpay_request:fail") {
          alert('支付失败')
        }
        if (res.err_msg == "get_brand_wcpay_request:cancel") {
          alert("您取消了支付")
        }
      }
    );
  }
  if (typeof WeixinJSBridge == "undefined") {
    if (document.addEventListener) {
      document.addEventListener('WeixinJSBridgeReady', onBridgeReady, false);
    } else if (document.attachEvent) {
      document.attachEvent('WeixinJSBridgeReady', onBridgeReady);
      document.attachEvent('onWeixinJSBridgeReady', onBridgeReady);
    }
  } else {
    onBridgeReady();
  }
}
var Orgin = 'weixin'
export default {
  Url: domain,
  Isphone: Isphone,
  Imgsrc: Imgsrc,
  getDays: getDays,
  getDaysInOneMonth: getDaysInOneMonth,
  getWeekByDay: getWeekByDay,
  addday: addday,
  isCardNo: isCardNo,
  wxpay: wxpay,
  Orgin: Orgin
}
