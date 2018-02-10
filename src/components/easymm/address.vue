<template>
  <div style="background-color:#E5E5E5">
      <div v-if="load">
          <!--没有地址-->
            <div id="box1" v-if="address">
                <div class='item' v-for="(item,key) in address" :key="key">
                    <div @click="Hlsorder(key)" style="cursor: pointer;">
                        <div class="one">
                            <span>{{item.name}}</span>
                            <span>{{item.mobile}}</span>
                        </div>
                        <div class="two">{{item.province}}{{item.city}}{{item.area}}{{item.address}}</div>
                    </div>

                    <div class="three">
                        <div class="thleft" v-if="item.isDefault">
                            <div class="rad1"></div>
                            <div class="mrdz">默认地址</div>
                        </div>
                        <div class="thleft" v-else @click="mr(item.id)">
                            <div class="rad"></div>
                            <div class="swmr" >设为默认</div>
                        </div>
                        <div class="thright">
                            <div class="del" @click="del(item.id)">
                                <img src="../../../static/img/easymmimg/del.png" alt="" />
                                <div>删除</div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
            
            <div id="box" v-else>
                <div id="nodz">
                    <img src="http://image.qsmam.com/qs-address.png" alt="" />
                    <div>您还没有保存服务地址哦~</div>
                </div>
            </div>
            <div style="height:1.2rem"></div>
            <div class="footer" @click="addaddress">添加新地址</div>
        </div>

  </div>
</template>
<script>
export default {
  data(){
      return{
          appToken:'', 
          address:null,
          load:false,
          job:'',
          nurseId:'',
          nurseJobId:''
      }
  },
  mounted () {
      $("html,body").animate({ scrollTop: 0 }, 0);
      let self=this;
      self.job = self.$route.params.job;
	  self.nurseId = self.$route.params.nurseId;
	  self.nurseJobId = self.$route.params.nurseJobId;
      self.appToken =  $.cookie('appToken');
      self.$dialog.loading.open('加载中...');
      self.loadaddress()
  },
  methods: {
      del(id){
          let self = this;
          $.ajax({
              url:domain.Url+'app/userAddress/del',
              data:{
                  appToken:self.appToken,
                  id:id
              },
              success:(data)=>{
                  if(data.isSuccess){
                      self.loadaddress()
                  }
              }
          })
      },
      Hlsorder(key){
          let address = this.address[key];
          sessionStorage.setItem('address',JSON.stringify(address))
          if(this.job=='CRS'){
              this.$router.push({name:'Crsorder',params: {job:this.job,nurseId:this.nurseId,nurseJobId:this.nurseJobId}})
          }else{
                this.$router.push({name:'Hlsorder',params: {job:this.job,nurseId:this.nurseId,nurseJobId:this.nurseJobId}})
          }
          
      },
      mr(id){
          let self = this;
          $.ajax({
              url:domain.Url+'app/userAddress/defaultAddress',
              data:{
                  appToken:self.appToken,
                  id:id
              },
              success:(data)=>{
                  if(data.isSuccess){
                      self.loadaddress()
                  }
              }
          })
      },
      addaddress(){
          this.$router.push({name:'addaddress',params: {job:this.job,nurseId:this.nurseId,nurseJobId:this.nurseJobId}})          
      },
      loadaddress(){
          let self=this;
          $.ajax({
          url:domain.Url+'app/userAddress/list',
          data:{
              pageNo:1,
              pageSize:100,
              appToken:self.appToken,
          },
          success:(data)=>{
              console.log(data)
              if(data.isSuccess){
                  if(data.result.length){
                      self.address=data.result;
                  }else{
                      self.address=null
                  }
                  self.load=true;
                  this.$dialog.loading.close();
              }
          }
      })
      }
  }
}
</script>

<style lang="less" scoped>
@import url(../../../static/css/easymm/address.less);

</style>
