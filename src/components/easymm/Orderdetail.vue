<template>
  <div style="background:#f7f7f7">
      <div v-if="Data">
          <div id="head">
              <div class="head1">
                  <img src="../../../static/img/easymmimg/ddxq.png" alt="">
                  <div v-if="Data.order.status=='0'">已关闭</div>
                  <div v-if="Data.order.status=='10'">未支付</div>
                  <div v-if="Data.order.status=='20'">待服务</div>
                  <div v-if="Data.order.status=='25'">分期去服务</div>
                  <div v-if="Data.order.status=='30'">服务中</div>
                  <div v-if="Data.order.status=='35'">待评价</div>
                  <div v-if="Data.order.status=='40'">已完成</div>
              </div>
              <div class="head2" v-text="Data.order.statusDesc"></div>
          </div>
          <div id="address">
              <div class="addressone">
                  <div class="username">
                      <img src="../../../static/img/easymmimg/pos.png" alt="">
                      <span v-text="Data.order.userName"></span>
                  </div>
                  <div class="usermobile" v-text="Data.order.userMobile"></div>
              </div>
              <div class="addresstwo">
                  <div v-text="Data.order.userAddress"></div>
                  <div>身份证：{{Data.order.userIdentificationCode.slice(0,4)}}********{{Data.order.userIdentificationCode.slice(-4)}}</div>
              </div>
          </div>
          <div id="ordertit">订单信息</div>
          <div id="orderxx">
                <img :src="imgurl+Data.orderNurseJob.nurseLogo" alt="">
                <div class="tworight">
                    <div class="name">{{Data.orderNurseJob.nurseName}}</div>
                    <div class="price">￥{{Data.orderNurseJob.showPrice}}</div>
                    <div class="time">服务时间：{{Data.order.realHireStartTime.slice(0,10)}}至{{Data.order.realHireEndTime.slice(0,10)}}</div>
                </div> 
          </div>
          <div id="price">
              <div class="priceone">总金额</div>
              <div class="pricetwo">
                  <span>￥{{Data.order.totalFee}}</span>
                  <span>(共{{Data.order.days}}天)</span>
              </div>
          </div>
          <div id="lxfs">
              <div class="phone" onclick="location.href='tel:4008-068-222'">电话联系</div>
              <div class="zx">在线咨询</div>
          </div>
          <div id="ordernumber">
              <div>订单编号：{{Data.order.orderCode}}</div>
              <div>下单时间：{{Data.order.createTime}}</div>
          </div>
          <div id="foot">
              <div class="footleft"  v-if="Data.order.status=='10'">
                  <span>支付定金:</span>
                  <span class="price">￥{{Data.order.needPay}}</span>
              </div>
              <div class="footleft" v-else-if="Data.order.status=='25'">
                  <span>本次支付:</span>
                  <span class="price">￥{{Data.order.needPay}}</span>
              </div>
              <div class="footleft" v-else>

              </div>
              <div class="footright" v-if="Data.order.status=='0'">
                  <div @click="Delorder">删除订单</div>
              </div>
              <div class="footright" v-if="Data.order.status=='10'">
                  <div @click="Celorder">取消订单</div>
                  <div class="zf">支付</div>
              </div>
              <div class="footright" v-if="Data.order.status=='25'">
                  <div class="zf">支付</div>
              </div>
              <div class="footright" v-if="Data.order.status=='35'">
                  <div @click="Delorder">删除订单</div>
              </div>
              <div class="footright" v-if="Data.order.status=='40'">
                  <div @click="Delorder">删除订单</div>
              </div>
          </div>
      </div>
  </div>
</template>
<script>
export default {
  data(){
      return{
          appToken:'',
          id:'',
          Data:'',
          imgurl: "http://image.qsmam.com/",
      }
  },
  mounted () {
      $("html,body").animate({ scrollTop: 0 }, 0);
      this.$dialog.loading.open('加载中...');
      this.appToken=$.cookie('appToken');
      this.id=this.$route.params.id;
      this.Deatil()
  },
  methods: {
      //加载
      Deatil(){
          let self = this;
          $.ajax({
              url:domain.Url+'app/order/userOrderDetail',
              data:{
                  appToken:self.appToken,
                  id:self.id
              },
              success:(data)=>{
                  console.log(data)
                  if(data.isSuccess){
                      self.Data=data.result;
                      self.$dialog.loading.close();
                  }
              }
          })
      },
      //删除订单
      Delorder(){
           let self= this;
            this.$dialog.confirm({
                title: '是否删除该订单',
                opts: () => {
                   $.ajax({
                       url:domain.Url+'app/order/toDel',
                       data:{
                           id:self.id,
                           appToken:self.appToken
                       },
                       success:(data)=>{
                           if(data.isSuccess){
                               self.$router.go(-1)
                           }
                       }
                   })
                }
            });
      },
      //取消订单
      Celorder(){
           let self= this;
            this.$dialog.confirm({
                title: '是否取消该订单',
                // mes: '是否取消该订单',
                opts: () => {
                   $.ajax({
                       url:domain.Url+'app/order/cancel',
                       data:{
                           id:self.id,
                           appToken:self.appToken
                       },
                       success:(data)=>{
                           if(data.isSuccess){
                               self.Deatil()
                           }
                       }
                   })
                }
            });
      }

  }
}
</script>
<style lang="less" scoped>
@import url(../../../static/css/easymm/Orderdetail.less);
</style>
