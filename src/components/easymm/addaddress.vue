<template>
  <div style="background-color:#E5E5E5">
      <div class="xx">
			<label for="name">姓名</label>
			<input type="text" id="name" placeholder="请输入姓名" v-model="name"/>
		</div>
		<div class="xx">
			<label for="tel">联系电话</label>
			<input type="text" id="tel" placeholder="请输入联系电话" v-model="mobile"/>
		</div>
		<div class="xx">
			<label for="dz">服务地址</label>
      <input type="hidden" name="contact_province_code" data-id="0001" id="contact_province_code" value="" data-province-name="">                     
      <input type="hidden" name="contact_city_code" id="contact_city_code" value="" data-city-name="">
			<input  data-city-code="330100" data-province-code="330000" data-district-code="330108"  id="addaddress_dz" placeholder="请输入地址" v-model="address"  readonly="readonly">
		</div>
		<textarea name="" rows="" cols="" id="xxdz" placeholder="请输入详细地址" v-model="addressdetail"></textarea>
		<div id="bc">
			<button @click="Prese">保存</button>
		</div>
		<div id="xz">
			<h1>说明：</h1>
			<p>为了保障三方权益，轻松妈妈需要您的真实信息，以便于签订电子合同（合同内容请到订单页面查看），保证护理师准时上户，电子合同和纸质合同具有同等的法律效应。</p>
		</div>
  </div>
</template>
<script>
export default {
	data(){
		return{
			name:'',
			mobile:'',
			address:'',
      addressdetail:'',
      appToken:'',
      job:'',
      nurseId:'',
      nurseJobId:''
		}
	},
  mounted() {
    $("html,body").animate({ scrollTop: 0 }, 0);
    let self = this;
    self.job = self.$route.params.job;
	  self.nurseId = self.$route.params.nurseId;
	  self.nurseJobId = self.$route.params.nurseJobId;
    self.appToken =  $.cookie('appToken');
	  var selectContactDom = $('#addaddress_dz');
    var showContactDom = $('#addaddress_dz');
    var contactProvinceCodeDom = $('#contact_province_code');
    var contactCityCodeDom = $('#contact_city_code');
    selectContactDom.bind('click', function () {
        var sccode = showContactDom.attr('data-city-code');
        var scname = showContactDom.attr('data-city-name');

        var oneLevelId = showContactDom.attr('data-province-code');
        var twoLevelId = showContactDom.attr('data-city-code');
        var threeLevelId = showContactDom.attr('data-district-code');
        var iosSelect = new IosSelect(3, 
            [iosProvinces, iosCitys, iosCountys],
            {
                title: '地址选择',
                itemHeight: 35,
                relation: [1, 1],
                oneLevelId: oneLevelId,
                twoLevelId: twoLevelId,
                threeLevelId: threeLevelId,
                callback: function (selectOneObj, selectTwoObj, selectThreeObj) {
                    contactProvinceCodeDom.val(selectOneObj.id); 
                    contactProvinceCodeDom.attr('data-province-name', selectOneObj.value);
                    contactCityCodeDom.val(selectTwoObj.id);
                    contactCityCodeDom.attr('data-city-name', selectTwoObj.value);

                    showContactDom.attr('data-province-code', selectOneObj.id);
                    showContactDom.attr('data-city-code', selectTwoObj.id);
                    showContactDom.attr('data-district-code', selectThreeObj.id);
                    self.address=selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value
                    // showContactDom.val(selectOneObj.value + ' ' + selectTwoObj.value + ' ' + selectThreeObj.value);
                }
        });
    });
	},
	methods: {
		Prese(){
      let self = this;
      if(!self.name){
       return  self.Prompt('用户名不能为空')
      }
      if(!self.mobile){
       return  self.Prompt('联系方式不能为空')
      }
      if(!domain.Isphone(self.mobile)){
        return self.Prompt('请输入正确的手机号')
      }
      if(!self.address){
        return  self.Prompt('地址不能为空')
      }
      if(!self.addressdetail){
        return  self.Prompt('详细地址不能为空')
      }
      let addressarr =self.address.split(' ');
      $.ajax({
        url:domain.Url+'app/userAddress/add',
        data:{
          appToken: self.appToken,
          province: addressarr[0],
          city: addressarr[1],
          area: addressarr[2],
          address: self.addressdetail,
          name: self.name,
          mobile: self.mobile,
          postCode: 1
        },
        success:(data)=>{
          console.log(data)
          if(data.isSuccess){
            self.$router.push({name:'address',params: {job:self.job,nurseId:self.nurseId,nurseJobId:self.nurseJobId}})
          }
        }
      })
		},
     //提示
    Prompt(text){
      this.$dialog.toast({
        mes: text,
        timeout: 1500
    });
   }
	}
};
</script>

<style scoped>
@import url(../../../static/css/easymm/addaddress.css);
</style>
