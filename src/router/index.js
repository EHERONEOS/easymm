import Vue from 'vue'
import Router from 'vue-router'
import { resolve } from 'path';

Vue.use(Router)

export default new Router({
    routes: [{
            //轻松妈妈首页
            path: '/',
            name: 'index',
            component: resolve => require(['../components/easymm/Index.vue'], resolve),
        },
        {
            //登录
            path: '/Login',
            name: 'Login',
            component: resolve => require(['../components/easymm/Login.vue'], resolve),
        },
        // //护理师列表
        {
            path: '/Hlslist/:job/:sx',
            name: 'Hlslist',
            component: resolve => require(['../components/easymm/Hlslist.vue'], resolve),
        },
        // //筛选
        {
            path: '/Screen/:job/:sx',
            name: 'Screen',
            component: resolve => require(['../components/easymm/Screen.vue'], resolve),
        },
        //护理师详情
        {
            path: '/Hlsdetail/:job/:nurseId/:nurseJobId',
            name: 'Hlsdetail',
            component: resolve => require(['../components/easymm/Hlsdetail.vue'], resolve),
        },
        //月嫂档期选择
        {
            path: '/HlsDate/:job/:nurseId/:nurseJobId',
            name: 'HlsDate',
            component: resolve => require(['../components/easymm/HlsDate.vue'], resolve),
        },
        //催乳师档期选择
        {
            path: '/CrsDate/:job/:nurseId/:nurseJobId',
            name: 'CrsDate',
            component: resolve => require(['../components/easymm/CrsDate.vue'], resolve),
        },
        // 护理师订单
        {
            path: '/Hlsorder/:job/:nurseId/:nurseJobId',
            name: 'Hlsorder',
            component: resolve => require(['../components/easymm/Hlsorder.vue'], resolve),
        },
        // 催乳师订单
        {
            path: '/Crsorder/:job/:nurseId/:nurseJobId',
            name: 'Crsorder',
            component: resolve => require(['../components/easymm/Crsorder.vue'], resolve),
        },
        // 改变地址
        {
            path: '/address/:job/:nurseId/:nurseJobId',
            name: 'address',
            component: resolve => require(['../components/easymm/address.vue'], resolve),
        },
        // 增加地址
        {
            path: '/addaddress/:job/:nurseId/:nurseJobId',
            name: 'addaddress',
            component: resolve => require(['../components/easymm/addaddress.vue'], resolve),
        },
        // 用户订单
        {
            path: '/userorderlist',
            name:'userorderlist',
            component: resolve => require(['../components/easymm/userorderlist.vue'], resolve),
            
        },
        // 订单详情 
        {
            path: '/Orderdetail/:id',
            name: 'Orderdetail',
            component: resolve => require(['../components/easymm/Orderdetail.vue'], resolve),
        },
        //轻松管家首页
        {
            path: '/Butlerindex',
            name: 'butler',
            component: resolve => require(['../components/easybutler/index.vue'], resolve),

        },
        //轻松管家服务详情
        {
            path: '/Projectdetail/:id',
            name: 'Projectdetail',
            component: resolve => require(['../components/easybutler/Projectdetail.vue'], resolve),

        },
        //轻松管家服务列表
        {
            path: '/Projectlist/:id',
            name: 'Projectlist',
            component: resolve => require(['../components/easybutler/Projectlist.vue'], resolve),
        },
        //轻松管家套餐详情
        {
            path: '/Packagedetail/:id',
            name: 'Packagedetail',
            component: resolve => require(['../components/easybutler/Packagedetail.vue'], resolve),
        },
        //轻松管家套餐列表
        {
            path: '/Packagelist',
            name: 'Packagelist',
            component: resolve => require(['../components/easybutler/Packagelist.vue'], resolve)
        },
        //轻松管家更多建议
        {
            path: '/Projectadvice/:id/:type',
            name: 'Projectadvice',
            component: resolve => require(['../components/easybutler/Projectadvice.vue'], resolve),
        },
        //轻松管家服务类型1
        {
            path: '/Servicetype1/:id/:type/:price/:Date/:spe/:Coupon/:style',
            name: 'Servicetype1',
            component: resolve => require(['../components/easybutler/Servicetype1.vue'], resolve),
        },
        //轻松管家服务类型3
        {
            path: '/Servicetype3/:id/:type/:price/:Date/:spe/:Coupon/:style',
            name: 'Servicetype3',
            component: resolve => require(['../components/easybutler/Servicetype3.vue'], resolve),
        },
        //轻松管家服务类型2
        {
            path: '/Servicetype2/:id/:type/:price/:Date/:spe/:Coupon/:style',
            name: 'Servicetype2',
            component: resolve => require(['../components/easybutler/Servicetype2.vue'], resolve),
        },
        //轻松管家预约时间选择
        {
            path: '/Choicetime/:id/:type/:price/:Date/:spe/:Coupon/:style',
            name: 'Choicetime',
            component: resolve => require(['../components/easybutler/Choicetime.vue'], resolve),
        },
        //轻松管家优惠卷领取
        {
            path: '/Coupon',
            name: 'Coupon',
            component: resolve => require(['../components/easybutler/Coupon.vue'], resolve),
        },
        //轻松管家优惠卷使用
        {
            path: '/Coupons/:id/:type/:price/:Date/:spe/:Coupon/:style',
            name: 'Coupons',
            component: resolve => require(['../components/easybutler/Coupons.vue'], resolve),
        },
        //轻松管家特殊需求
        {
            path: '/special/:id/:type/:price/:Date/:spe/:Coupon/:style',
            name: 'special',
            component: resolve => require(['../components/easybutler/special.vue'], resolve)
        },
        //轻松管家选择地址
        {
            path: '/butaddress/:id/:type/:price/:Date/:spe/:Coupon/:style',
            name: 'butaddress',
            component: resolve => require(['../components/easybutler/address.vue'], resolve)
        },
        //轻松管家添加地址
        {
            path: '/butaddaddress',
            name: 'butaddaddress',
            component: resolve => require(['../components/easybutler/addaddress.vue'], resolve)
        },
        //轻松管家立即预约
        {
            path: '/appointment/:id/:type/:price/:Date/:spe/:Coupon/:style',
            name: 'appointment',
            component: resolve => require(['../components/easybutler/appointment.vue'], resolve),
        }, 
         //轻松管家套餐购买
         {
            path: '/suitappointment/:id/:type/:price/:Date/:spe/:Coupon/:style',
            name: 'suitappointment',
            component: resolve => require(['../components/easybutler/suitappointment.vue'], resolve),
        },
        //轻松管家订单详情
        {
            path: '/serviceorder/:id',
            name: 'serviceorder',
            component: resolve => require(['../components/easybutler/serviceorder.vue'], resolve),
        },
        //取消订单
        {
            path:'/Clearorder/:id',
            name:'Clearorder',
            component: resolve => require(['../components/easybutler/Clearorder.vue'], resolve),
        },
        //填写面积支付尾款
        {
            path:'/Acreage/:id',
            name:'Acreage',
            component:resolve => require(['../components/easybutler/Acreage.vue'],resolve)
        }
    ]
})