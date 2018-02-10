<template>
  <div>
      <div id="head">
	    	<input type="text" id="starday" placeholder="服务开始时间"   disabled="disabled" v-model="starday"/>
			<div id="days" v-text="days"></div>
	    	<input type="text" id="endday" placeholder="服务结束时间"  disabled="disabled" v-model="endday"/>
	    </div>

	    <div id="week">
	    	<div>日</div>
	    	<div>一</div>
	    	<div>二</div>
	    	<div>三</div>
	    	<div>四</div>
	    	<div>五</div>
	    	<div>六</div>
	    </div>
	    <div id="Date">
	    	<div class="Date" v-for="(item,key) in arr" :key="key">
	    		<div v-text="item.title"></div>
	    		<li v-for="x in item.Firstweek" :key="'s'+x"></li>
	    		<li class="day" v-for="(item1,key) in item.Datearr" :class="{'dq':item1.dq,'qt':item1.qt}" :key="'e'+key"  @click="check(item1.Day)">{{key+1}}</li>
	    		<li v-for="y in item.Lastweek" :key="'d'+y" ></li>
	    	</div>
	    </div>
        <div id="bottom"></div>
	    <div id="foot">
	    	<div id="clear"  @click="clear">清空</div>
	    	<div id="yy" @click="appointment">立即预约</div>
	    </div>
  </div>
</template>
<script>
export default {
    data(){
        return{
            arr:[],
            year:'',
            month:'',
            job:'',
            appToken:'',
            nurseId:'',
            nurseJobId:'',
            t0:'',
            Datearr:[],
            Toyear:'',
            Tomonth:'',
            Today:'',
            ToDate:'',
            flage:false,
            s:'',
            e:'',
            starday:'',
            endday:'',
            starDays:'',
            days:''
        }
    },
    mounted(){
        $("html,body").animate({ scrollTop: 0 }, 0);
        let self = this;
        self.job = self.$route.params.job;
        self.nurseId = self.$route.params.nurseId;
        self.nurseJobId = self.$route.params.nurseJobId;
        self.appToken = $.cookie('appToken');
        const Dd =new Date();
        const Toyear = Dd.getFullYear();
        const Tomonth =Dd.getMonth()+1;
        const Today = Dd.getDate();
        self.Toyear=Toyear;
        self.Tomonth=Tomonth;
        self.Today=Today;
        self.ToDate=Toyear*10000+Tomonth*100+Today;
        self.year = Toyear;
        self.month =Tomonth;
        self.cenweek(Toyear,Tomonth);
        self.addmonth(self.year,self.month);
        self.addmonth(self.year,self.month);
        $(window).scroll(function(){
            let scrollTop = $(this).scrollTop();
            let scrollHeight = $(document).height();
            let windowHeight = $(this).height();
            if(scrollTop + windowHeight == scrollHeight){
                self.addmonth(self.year,self.month);
                setTimeout(() => {
                    self.noDate()
                }, 200);
            }
        });
        let data={
            appSecret:'qsmm',
            appToken:self.appToken,
            nurseId:self.nurseId,
            system:'web',
            timestamp:Date.parse(new Date())
        };
        let param =$.param(data);
        data.sign=md5.hexMD5(param);
        $.ajax({
            url:domain.Url+'app/nursebase/seeOrders',
            data:data,
            success:(data)=>{
                console.log(data.result)
                if(data.isSuccess){
                    // self.Datearr= data.result;
                    for(let i=0;i<data.result.length;i++){
                        let year = parseInt(data.result[i].realHireStartTime.slice(0,4));
                        let month = parseInt(data.result[i].realHireStartTime.slice(5,7));
                        let day = parseInt(data.result[i].realHireStartTime.slice(8,10));
                        let year1 = parseInt(data.result[i].realHireEndTime.slice(0,4));
                        let month1 = parseInt(data.result[i].realHireEndTime.slice(5,7));
                        let day1 = parseInt(data.result[i].realHireEndTime.slice(8,10));
                        self.Datearr.push({
                            start:year*10000+month*100+day,
                            end:year1*10000+month1*100+day1
                        })
                    }
						self.noDate()
                }
            }
        })
    },
    methods:{
        //清空
        clear(){

            $(".Date").find('.day').removeClass('red rad1 rad2 rad3');
            this.starday=this.endday='';
            this.flage=false
        },
        //提示
    	tishi(x){
    			this.$dialog.toast({
                    mes: x,
                    timeout: 1500
                });
    		},
        //添加日期数组
        cenweek(year,month){
            let Firstweek=domain.getWeekByDay(year+'-'+month+'-1')//1号在星期几
            let Days =domain.getDaysInOneMonth(year,month);//总天数
            let Lastweek=6-domain.getWeekByDay(year+'-'+month+'-'+Days);//月底还有几天
            let Dateobj={
            	title:year+'年'+month+'月',
            	Firstweek:Firstweek,
            	Lastweek:Lastweek,
            	Datearr:[],

            };
            for(let i=0;i<Days;i++){
            	let Day = year*10000+month*100+i+1;
            	Dateobj.Datearr.push({
            		Day:Day,
            		dq:false,
            		qt:false,
            	})
            }
            this.arr.push(Dateobj);
            this.noDate()
        },
        //增加一月
        addmonth(year,month){
            if(month==12){
                this.cenweek(year+1,1);
                this.year=year+1;
                this.month=1
            }else{
                this.cenweek(year,month+1);
                this.year=year;
                this.month=month+1;
            }
        },
        appointment(){
            if(!this.starday){
                return this.tishi('开始时间不能为空')
            }
            if(!this.endday){
                return this.tishi('开始时间不能为空')
            }
            sessionStorage.setItem('startTime',this.starday);
            sessionStorage.setItem('endTime',this.endday);
            this.$router.push({ name:'Hlsorder',params:{job:this.job,nurseId:this.nurseId,nurseJobId:this.nurseJobId}})
        },
        //去掉占用日期
        noDate(){
        		let self= this;
//      		console.log(self.arr)
            for(let i=0;i<self.arr.length;i++){
            	for(let j=0;j<self.arr[i].Datearr.length;j++){
            		if(self.arr[i].Datearr[j].Day<=self.ToDate){
            			self.arr[i].Datearr[j].dq=true;
            			self.arr[i].Datearr[j].qt=true;
            		}
            		for(let k=0;k<self.Datearr.length;k++){
            			if(self.arr[i].Datearr[j].Day>=self.Datearr[k].start&&self.arr[i].Datearr[j].Day<=self.Datearr[k].end){
            				self.arr[i].Datearr[j].dq=true;
            			}
            		}
            	}
            }
        },
        check(Day){
        	let self = this;
        	let year = parseInt(Day/10000);
        	let month = parseInt(Day%10000/100);
        	let day = parseInt(Day%10000%100);
        	let n;
        	if(year==self.Toyear){
        		n=month-self.Tomonth;
        	}else{
        		n=(12-self.Tomonth)+12*(year-self.Toyear-1)+month;
        	}
            if(!self.flage){
                 $(".Date").find('.day').removeClass('red rad1 rad2 rad3');
                 self.starday=self.endday='';
                let start = $(".Date").eq(n).find('.day').eq(day-1);
                if(!start.hasClass('dq')){
                    start.addClass('red rad3');
                    self.flage=true;
                    self.s=n;
                    if(month<10){
                        month='0'+month
                    }
                    if(day<10){
                        day='0'+day
                    }
                    self.starDays=Day;
                    self.starday=year+'-'+month+'-'+day;
                    
                }else{
                   return self.tishi('所选日期已被占用')
                }
            }else{
                // console.log(Day-self.starDays);
                let x=Day-self.starDays;
               
                if(x>0){
                    let startm = $(".Date").eq(self.s).find('.day');
                    let stard = parseInt(self.starDays%10000%100);
                    if(self.s==n){
                        for(let i=0;i<day-stard+1;i++){
                            if(startm.eq(stard+i-1).hasClass('dq')){
                                $(".Date").find('.day').removeClass('red rad3');
                                self.starday='';
                                self.flage=false;
                                return self.tishi('所选日期含有被占用的日期')
                            }
                        }
                        if(day-stard+1<26){
                            $(".Date").find('.day').removeClass('red rad3');
                            self.starday='';
                            self.flage=false;
                            return self.tishi('所选档期不能小于26天')
                        }
                        self.flage=false;
                        startm.eq(stard-1).removeClass('rad3')
                        startm.eq(stard-1).addClass('rad1');
                        for(let i=0;i<day-stard+1;i++){
                           startm.eq(stard+i-1).addClass('red');
                        }
                        startm.eq(day-1).addClass('rad2');
                        if(month<10){
                            month='0'+month
                        }
                        if(day<10){
                            day='0'+day
                        }
                        self.endday=year+'-'+month+'-'+day;
                        self.days=domain.getDays(self.starday,self.endday)+1+'天'
                    }else{
                        let edays=self.arr[self.s].Datearr.length;
                        for(let i =stard-1;i<edays;i++){
                            if(startm.eq(i).hasClass('dq')){
                               $(".Date").find('.day').removeClass('red rad1 rad2 rad3');
                                self.starday=self.endday='';
                                self.flage=false;
                                return self.tishi('所选日期含有被占用的日期')
                            }
                            startm.eq(i).addClass('red')
                        }
                        
                        for(let i=0;i<n-self.s-1;i++){
                            if($(".Date").eq(self.s+i+1).find('.day').hasClass('dq')){
                                $(".Date").find('.day').removeClass('red rad1 rad2 rad3');
                                self.starday=self.endday='';
                                self.flage=false;
                                return self.tishi('所选日期含有被占用的日期')
                            }
                            $(".Date").eq(self.s+i+1).find('.day').addClass('red')
                        }
                        for(let i=0;i<day;i++){ 
                            if($(".Date").eq(n).find('.day').eq(i).hasClass('dq')){
                                $(".Date").find('.day').removeClass('red rad1 rad2 rad3');
                                self.starday=self.endday='';
                                self.flage=false;
                                return self.tishi('所选日期含有被占用的日期')
                            }
                            $(".Date").eq(n).find('.day').eq(i).addClass('red')
                        }
                        let smonth='';
                        let sday='';
                        if(month<10){
                            smonth='0'+month
                        }else{
                           smonth=month 
                        }
                        if(day<10){
                            sday='0'+day
                        }else{
                            sday=day
                        }
                        let enddays=year+'-'+smonth+'-'+sday;
                        if(domain.getDays(self.starday,enddays)<25){
                             $(".Date").find('.day').removeClass('red rad3');
                            self.starday='';
                            self.flage=false;
                            return self.tishi('所选档期不能小于26天')
                        }
                        $(".Date").eq(self.s).find('.day').eq(stard-1).addClass('rad1')
                        $(".Date").eq(self.s).find('.day').eq(stard-1).removeClass('rad3')
                        $(".Date").eq(n).find('.day').eq(day-1).addClass('rad2');
                        self.flage=false;
                        if(month<10){
                            month='0'+month
                        }
                        if(day<10){
                            day='0'+day
                        }
                        self.endday=year+'-'+month+'-'+day;
                        $('#days').text()
                        self.days=domain.getDays(self.starday,self.endday)+1+'天'
                    }
                    
                }else{
                    console.log(2)
                    $(".Date").find('.day').removeClass('red rad3');
                    self.flage=false;
                    self.starday='';
                    self.check(Day)
                }
                
            }
            
        }
    }
}
</script>
<style  scoped>
@import url(../../../static/css/easymm/Date.css);
</style>
