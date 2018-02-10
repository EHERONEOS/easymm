<template>
  <div>
       <div  v-if="Data">
          
         <div v-if="orderarr">
             <div class="orderitem" v-for="(item,key) in orderarr" :key="key">
                <div class="orderone">
                    <span class="oneleft">订单编号：{{item.orderCode}}</span>
                    <span class="oneright" v-if="item.status=='0'">已关闭</span>
                    <span class="oneright" v-if="item.status=='10'">未支付</span>
                    <span class="oneright" v-if="item.status=='20'">待服务</span>
                    <span class="oneright" v-if="item.status=='25'">分期去服务</span>
                    <span class="oneright" v-if="item.status=='30'">服务中</span>
                    <span class="oneright" v-if="item.status=='35'">待评价</span>
                    <span class="oneright" v-if="item.status=='40'">已完成</span>
                </div>
                <div class="ordertwo" @click="Orderdetail(item.id)">
                    <img :src="imgurl+item.image" alt="">
                    <div class="tworight">
                        <div class="name">{{item.nurseName}}</div>
                        <div class="price">￥{{item.showPrice}}</div>
                        <div class="time">服务时间：{{item.employmentStartTime.slice(0,10)}}至{{item.employmentEndTime.slice(0,10)}}</div>
                    </div>
                </div>
                <div class="orderthree">
                    <div class="threeup">
                        <span>共{{item.days}}天</span>
                        <span>总金额：</span>
                        <span>￥{{Math.floor(item.totalFee)}}</span>
                    </div>
                    <div class="threedown" v-if="item.status=='25'||item.status=='10'">
                        本次支付：￥{{item.toPayMoney}}(护理师订金)
                    </div>
                </div>
                <div class="orderfour" v-if="item.status=='0'">
                    <div>在线客服</div>
                    <div @click="Delorder(item.id)">删除订单</div>
                </div>
                <div class="orderfour" v-if="item.status=='10'">
                    <div>在线客服</div>
                    <div @click="Clearorder(item.id)">取消订单</div>
                    <div class="zf" @click="payment(item.id,item.job,item.toPayMoney)">去支付</div>
                </div>
                <div class="orderfour" v-if="item.status=='20'">
                    <div>在线客服</div>
                </div>
                <div class="orderfour" v-if="item.status=='25'">
                    <div>在线客服</div>
                    <div class="zf"  @click="payment(item.id,item.job,item.toPayMoney)">去支付</div>
                </div>
                <div class="orderfour" v-if="item.status=='30'">
                    <div>在线客服</div>
                </div>
                <div class="orderfour" v-if="item.status=='35'">
                    <div>在线客服</div>
                    <div  @click="Delorder(item.id)">删除订单</div>
                    <div class="zf">评价</div>
                </div>
                <div class="orderfour" v-if="item.status=='40'">
                    <div>在线客服</div>
                    <div  @click="Delorder(item.id)">删除订单</div>
                </div>
            </div>
         </div>
         <!--没有订单-->
          <div id="noOrd" v-else>
			<img src="../../../static/img/easymmimg/nodd.png" alt="">
			<div>暂无订单</div>
		</div>
      </div>
  </div>
</template>
<script>
export default {
  data(){
        return{
            appToken:'',
            Data:false,
            orderarr:null,
            imgurl: "http://image.qsmam.com/",
        }
    },
    mounted () {
        $("html,body").animate({ scrollTop: 0 }, 0);
        let self = this;
        self.appToken = $.cookie('appToken');
        self.$dialog.loading.open("加载中...");
        self.loadlist()
    },
    methods: {
        //订单详情
        Orderdetail(id){
            this.$router.push({name:'Orderdetail',params: {id:id}})
        },
        //删除订单
        Delorder(id){
            let self= this;
            this.$dialog.confirm({
                title: '是否删除该订单',
                opts: () => {
                   $.ajax({
                       url:domain.Url+'app/order/toDel',
                       data:{
                           id:id,
                           appToken:self.appToken
                       },
                       success:(data)=>{
                           if(data.isSuccess){
                               self.loadlist()
                           }
                       }
                   })
                }
            });
        },
        //取消订单
        Clearorder(id){
            let self= this;
            this.$dialog.confirm({
                title: '是否取消该订单',
                // mes: '是否取消该订单',
                opts: () => {
                   $.ajax({
                       url:domain.Url+'app/order/cancel',
                       data:{
                           id:id,
                           appToken:self.appToken
                       },
                       success:(data)=>{
                           if(data.isSuccess){
                               self.loadlist()
                           }
                       }
                   })
                }
            });
        },
        //加载订单
        loadlist(){
            let self=this;
            $.ajax({
            url:domain.Url+'app/order/userList3',
            data:{
                appToken:self.appToken,
                pageNo:1,
                pageSize:100,
                listType:'all',
            },
            success:(data)=>{
                console.log(data)
                self.$dialog.loading.close();
                self.Data=true;
                if(data.isSuccess){
                    if(data.result.length){
                        self.orderarr=data.result
                    }else{
                        self.orderarr=null
                    }
                    
                }else{
                    self.orderarr=null
                }
            }
        })
        },
        //支付
        payment(id,job,pre){
            let self = this;
            let Data={
              orderId:id,
              job:job,
              appToken: $.cookie('appToken'),
              type:'Hls'
            }
            Data=JSON.stringify(Data);
            let redirect_uri = 'http://www.qsmam.com/mobile/weixinH5/page/payment.html?Data='+Data
            redirect_uri = encodeURI(redirect_uri);
            //授权地址
            let Url = 'https://open.weixin.qq.com/connect/oauth2/authorize?appid=wx5db600fa5c3a6eb2&redirect_uri='+redirect_uri+'&response_type=code&scope=snsapi_base&state=123#wechat_redirect';
            location.href=Url;
        }
    }
}
</script>
<style lang="less" scoped>
@import url(../../../static/css/easymm/myHlsdd.less);
</style>

