<template>
    <div>
        <div id="Hlslist_head">
            <div @click="zhRules"><span v-text="zhtitle" :class="{'red':zhtit}"></span></span><img src="../../../static/img/easymmimg/top.png" ></div>
			<div @click="kb" :class="{'red':kbtit}">口碑</div>
			<div @click="screen">筛选</div>
        </div>
        <!-- 筛选条件 -->
        <div id="Hlslist_Rules">
            <div v-for="(item, key) in sortRules" :key="key" :class="{'red': check==key}" v-text="item.name" @click="zhrules(key,item.value,item.name)"></div>
        </div>
        <!-- 搜索 -->
        <div id="Hlslist_sou">
			<img src="../../../static/img/easymmimg/ss.png"/>
			<input @compositionstart="compos(false)" @compositionend="compos(true)" placeholder="搜索" v-model="canshu.nurseName" @input="nurseName"/>
		</div>
        
        <yd-infinitescroll :callback="loadList" ref="infinitescrollDemo">

        <yd-list theme="1" slot="list">
            <div id="Hlslist_List">
            <div v-for="(item, key) in list"  :key="key" @click="Hlsdetail(item.job,item.nurseId,item.nurseJobId)">
				<div class="Hlslist_it1">
					<img :src="'http://image.qsmam.com/'+item.image"/>
					<div v-text="item.jobTitle"></div>
				</div>
				<div class="Hlslist_it2"> 
					<div class="Hlslist_xx1">
						<span>{{item.realName}}</span>
						<span>{{item.showPrice}}</span>
					</div>
					<div class="Hlslist_xx2">
						<span>{{item.hometown}}</span>
						<span>{{item.age}}岁</span>
					</div>
					<div class="Hlslist_xx3">
						<div>
							<img src="../../../static/img/easymmimg/star.png" alt="" v-for="n in Math.round(item.startLevel/2)" :key="'s'+n"/>
							<img src="../../../static/img/easymmimg/nostar.png" alt="" v-for="n in 5-(Math.round(item.startLevel/2))" :key="'n'+n"/>
						</div>
						<div>{{item.byOrderCount}}条评价</div>
					</div>
				</div>
			</div>
            </div>
            <!-- <yd-backtop></yd-backtop> -->
        </yd-list>

        <!-- 数据全部加载完毕显示 -->
        <span slot="doneTip">啦啦啦，啦啦啦，没有数据啦~~</span>

        <!-- 加载中提示，不指定，将显示默认加载中图标 -->
        <img slot="loadingTip" src="http://static.ydcss.com/uploads/ydui/loading/loading10.svg"/>

    </yd-infinitescroll>
        <!-- 蒙板 -->
        <div id="Hlslist_mb" @click="zhRules"></div>
    </div>
</template>
<script type="text/babel">
export default {
  name: "Hlslist",
  data() {
    return {
      job: "",
      appToken: "",
      sortRules: [],
      list: [],
      check:0,
      zhtit:false,
      kbtit:false,
      zhtitle:'综合',
      bul:false, 
      canshu: {
        //开始时间结束时间
        startTime: "",
        endTime: "",
        ageListBean: "",
        prizeListBean: "",
        workYearListBean: "",
        animalSign: "",
        nurseCity: "",
        job: "",
        nurseName: "",
        sortRule: 1,
        pageNo: 1,
        pageSize: 10,
        city: "杭州",
        workMouth: ""
      }
    };
  },
  mounted() {
      $("html,body").animate({ scrollTop: 0 }, 0);
    let self = this;
    self.$dialog.loading.open('加载中...');
    this.job = this.$route.params.job;
    this.canshu.job = this.$route.params.job;
    this.appToken = $.cookie("appToken");
    this.canshu.appToken = $.cookie("appToken");
    let sx =this.$route.params.sx;
    if(sx){
        sx=JSON.parse(sx);
        self.canshu.startTime=sx.startTime;
        self.canshu.endTime=sx.endTime;
        self.canshu.ageListBean=sx.age;
        self.canshu.prizeListBean=sx.pre;
        self.canshu.workYearListBean=sx.year;
        self.canshu.animalSign=sx.animal;
        self.canshu.nurseCity=sx.city;
        self.canshu.nurseName=sx.nurseName;
    }
     
    
    //筛选条件
    $.ajax({
      url: domain.Url + "app/nursejob/searchInit2",
      data: {
        job: self.job
      },
      success: data => {
        console.log(data)
        if (data.isSuccess) {
            this.$dialog.loading.close();
          self.sortRules = data.result.sortRules;
        }
      }
    });
    //初始列表加载
    $.ajax({
        url:domain.Url +  "app/nursejob/search5",
        data:self.canshu,
        success:(data)=>{
          
            if(data.isSuccess){
                self.list = data.result;
            }else if(data.code==404){
                    self.list =[];
                    self.$refs.infinitescrollDemo.$emit(
                        "ydui.infinitescroll.loadedDone"
                    );
                    return;
                }
        }
    })
  },
  methods: {
      //护理师详情
      Hlsdetail(x,y,z){
        this.$router.push({ name:'Hlsdetail',params: {job:x,nurseId:y,nurseJobId:z}})   
      },
      //条件展开
    zhRules() {
      $("#Hlslist_Rules").slideToggle();
      $("#Hlslist_mb").toggle();
    },
    //滚动加载
    loadList() {
      //加载列表
      let self = this;
      self.canshu.pageSize += 10;
      $.ajax({
        url: domain.Url + "app/nursejob/search5",
        data: self.canshu,
        success: data => {
       
          if (data.isSuccess) {
            if (data.result.length == self.list.length) {
                setTimeout(() => {
                    self.$refs.infinitescrollDemo.$emit(
                        "ydui.infinitescroll.loadedDone"
                    );
                    return;
                }, 500);
              
            } else {
                setTimeout(() => {
                    self.list = data.result;
                    self.$refs.infinitescrollDemo.$emit(
                        "ydui.infinitescroll.finishLoad"
                    );
                }, 500);
              
            }
          }
        }
      });
    },
    //口碑
    kb(){
        this.canshu.sortRule ='by_order_count.desc';
        this.canshu.pageSize =10;
        this.Ruleslist();
        this.zhtit=false;
        this.kbtit=true;
        $("#Hlslist_Rules").slideUp();
        $("#Hlslist_mb").hide();
    },
    //综合排序
    zhrules(x,y,z){
        this.canshu.sortRule =y,
        this.canshu.pageSize =10,
        this.check = x;
        this.zhtitle = z;
        this.zhtit=true;
        this.kbtit=false;
        this.zhRules(); 
        this.Ruleslist()
    },
    compos(bul){
        this.bul=bul
    },
    //关键字查询
    nurseName(){
        if(this.bul){
            this.Ruleslist()
        }
    },
    //跳转筛选
    screen(){
        let self = this;
        if(this.$route.params.sx){
            this.$router.push({ name:'Screen',params: {job:self.job,sx:self.$route.params.sx}})
        }else{
            this.$router.push({ name:'Screen',params: {job:self.job,sx:0}})            
        }
        
    },
    //条件加载
    Ruleslist(){
        document.body.scrollTop = document.documentElement.scrollTop = 0;
        let self = this;
        $.ajax({
            url: domain.Url + "app/nursejob/search5",
            data: self.canshu,
            success:function(data){
           
                if(data.isSuccess){
                    self.list = data.result;
                    self.$refs.infinitescrollDemo.$emit(
                        "ydui.infinitescroll.finishLoad"
                    );
                }else if(data.code==404){
                    self.list =[];
                    self.$refs.infinitescrollDemo.$emit(
                        "ydui.infinitescroll.loadedDone"
                    );
                    return;
                }
            }
        })
    }
  }
};
</script>
<style scoped>
 @import url(../../../static/css/easymm/Hlslist.css);
</style>
