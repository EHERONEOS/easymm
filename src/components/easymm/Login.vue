<template>
  <div>
      <div id="Login_head">
          <div id="Login_logo"></div>
      </div>
      <div id="Login_content">
            <yd-cell-group>
              <yd-cell-item>
                  <div  slot="left" id="Login_phone" class="Login_item">
                      <i class="iconfont icon-shouji"></i>
                      <input type="text"  placeholder="请输入手机号码" v-model="phone">
                  </div>
                </yd-cell-item>
                <yd-cell-item>
                    <div  slot="left" id="Login_yzm" class="Login_item">
                        <i class="iconfont icon-mima"></i>
                        <input type="text"  placeholder="请输入验证码" v-model="code">
                    </div>
                    <yd-sendcode slot="right" 
                                v-model="start1" 
                                @click.native="sendCode" 
                                type="warning"
                    ></yd-sendcode>
                </yd-cell-item>
            </yd-cell-group>
            <yd-button @click.native="Login"  size="large" bgcolor="#f76260" color="#FFF" id="Login_button">立即登录</yd-button>
      </div>
  </div>
</template>
<script type="text/babel">
    
    export default{
        name:'Login',
        data() {
            return {
                start1: false,
                phone:'',
                code:'',
                sessionid:'',
                typeSting:''
            }
        },
        methods: {
            //发送验证码
            sendCode() {
                let self=this;          
                if(!self.phone){
                    return self.Prompt('手机号不能为空')
                };
                if(!domain.Isphone(self.phone)){
                    return self.Prompt('请输入正确的手机号')
                };
                self.$dialog.loading.open('发送中...');
                $.ajax({
                    url:domain.Url + 'app/userinfo/sendSmsCode3',
                    data:{
                        mobile:self.phone,
                        mobileId:self.phone,
                    },
                    success:function(data){
                        console.log(data);
                        if(data.isSuccess){
                            self.sessionid = data.result.sessionId;
                            self.typeSting = data.result.type;
                            setTimeout(() => {
                                self.start1 = true;
                                self.$dialog.loading.close();
                                self.$dialog.toast({
                                    mes: '已发送',
                                    icon: 'success',
                                    timeout: 1500
                                });

                            }, 1000);
                        }else{
                            self.$dialog.loading.close();
                            return self.Prompt(data.message)
                        }
                    }
                })                
                
            },
            //登录
            Login(){
                let self=this;          
                if(!self.phone){
                    return self.Prompt('手机号不能为空')
                };
                if(!domain.Isphone(self.phone)){
                    return self.Prompt('请输入正确的手机号')
                };
                if(!self.sessionid){
                    return self.Prompt('验证码未发送')
                };
                if(!self.code){
                    return self.Prompt('验证码不能为空')
                };
                
                self.$dialog.loading.open('登录中...');
                $.ajax({
                   url:domain.Url + 'app/userinfo/mobileLoginReginster',
                   data:{
                        mobile: self.phone,
                        mobileId: self.sessionid,
                        type: self.typeSting,
                        yzm: self.code,
                        origin: "webapp",
                   },
                   success:function(data){
                       console.log(data)
                       if(data.isSuccess){
                           let appToken = data.result.appToken;
                           let useinfo = data.result.userInfo;
                           useinfo = JSON.stringify(useinfo);
                           $.cookie('appToken', appToken, { expires: 7});
                           $.cookie('useinfo', useinfo, { expires: 7});
                           setTimeout(() => {
                                self.$dialog.loading.close();
                                self.$dialog.toast({
                                    mes: '登录成功',
                                    icon: 'success',
                                    timeout: 1500
                                });
                                setTimeout(() => {
                                     self.$router.go(-1)
                                }, 1500);
                            }, 1000);
                       }else{
                          self.$dialog.loading.close();
                          return self.Prompt(data.message) 
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
    }
</script>
<style scoped>
@import url(../../../static/css/easymm/Login.css);
</style>
