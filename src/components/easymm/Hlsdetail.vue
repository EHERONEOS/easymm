<template>
  <div>
      <div v-if="Data">
          <!-- 头部轮播图 -->
        <div  id="head">
            <yd-slider :show-pagination="page">
                <yd-slider-item v-for="(item, key) in Data.nursejob.workImageArrays" :key="key">
                    <div class="itemimg">
                        <img :src="imgurl+item" alt="">
                    </div>
                </yd-slider-item>
            </yd-slider>
        </div>
        <!--护理师介绍-->
		<div id="Hlsjs">
			<div class="name">
				<span v-text="Data.nursebase.realName"></span>
				<span v-text="Data.nurseJobLevelInfo.name"></span>
			</div>
			<div class="zwjs">
                <div>自我介绍</div>
                <div class="jszk" v-text="Data.nursejob.resume"></div>
            </div>					
		</div>
        <!--保障信息-->
		<div class="bzxx">
			<div class="bzitem">
				<img src="../../../static/img/easymmimg/zlbz.png"/>
				<span>质量保障</span>
		    </div>
			<div class="bzitem">
				<img src="../../../static/img/easymmimg/ph.png"/>
				<span>精准匹配</span>
			</div>
			<div class="bzitem">
				<img src="../../../static/img/easymmimg/PICC.png"/>
				<span>PICC保障</span>
			</div>
			<div class="bzitem">
				<img src="../../../static/img/easymmimg/Sh.png"/>
				<span>售后无忧</span>
			</div>
		</div>
        <!-- 用户评价 -->
        <div class="userpj">
            <div class="pjhead">
                <div>
                    <div>用户评价({{Data.orderCommentAmunt}})</div>
                    <div class="Star">
                        <img src="../../../static/img/easymmimg/star.png" v-for="n in starimg" :key="n"/>
                        <img src="../../../static/img/easymmimg/nostar.png" v-for="n in (5-starimg)" alt="" :key="n">
                    </div>
                </div>

                <div>点评</div>
            </div>
            <div class="pj" v-for="(item, key) in Data.ordercomments" :key="key">
                <div class="pjtx">
                    <img :src="imgurl+item.userHeadimage" v-if="item.userHeadimage && item.userHeadimage!= 'default_mother.png'"/>
                    <img src="../../../static/img/easymmimg/mrimg.png" alt="" v-else>
                    <div>
                        <span v-if="item.userNickname">{{item.userNickname}}</span>
                        <span v-else>轻松妈妈用户</span>
                    </div>

                </div>
                <div class="pjtxt" v-text="item.content"></div>
                <div class="pjimg">
                    <img :src="imgurl+item1" alt="" v-for="(item1, key) in item.imagesArrays" :key="key">
                </div>
                <div class="bq" v-if="item.nurselablesName">
                    <img src="../../../static/img/easymmimg/bq.png" />
                    <div>
                        <span>{{item.nurselablesName[0]}}</span>
                        <span v-for='(item2, key) in item.nurselablesName' :key="key" v-if="key">，{{item2}}</span>
                    </div>
                </div>
            </div>
            <div class="gdpj"  id="gdpj" v-if="Data.orderCommentAmunt>2">
                查看更多评价
            </div>
            <div class="gdpj" v-else>
                此护理师暂时没有任何评价
            </div>
        </div>
        <!--分隔行-->
	    <div class="fg"></div>
        <!--基本信息和动态-->
        <div class="xxhead">
          基本信息
        </div>
        <!--基本信息-->
        <div class="jbxx">
            <div class="xxtitle">个人信息</div>
            <table cellspacing="0" cellpadding="0">
                <tr>
                    <td>
                        <div>身高</div>
                        <div>{{Data.nursebase.height}}cm</div>
                    </td>
                    <td>
                        <div>文化水平</div>
                        <div>{{education}}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div>年龄</div>
                        <div>{{Data.nursebase.age}}岁</div>
                    </td>
                    <td>
                        <div>工作年限</div>
                        <div>{{Data.nursejob.seniority}}年</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div>生肖</div>
                        <div>{{Data.nursebase.yearLunar}}</div>
                    </td>
                    <td>
                        <div>户籍地</div>
                        <div>{{Data.nursebase.hometown}}</div>
                    </td>
                </tr>
                <tr>
                    <td>
                        <div>星座</div>
                        <div>{{Data.nursebase.constellation}}</div>
                    </td>
                    <td>
                        <div>普通话</div>
                        <div>{{proficiency}}</div>
                    </td>
                </tr>
            </table>
            <div class="xxtitle1">
                <span>个人技能</span>
                <img src="../../../static/img/easymmimg/problem1.png" alt="" @click="sevenxx"/>
                <div class="sevenxx" >七星图取自护理师 近两个自然周的数据
                </div>
            </div>
        </div>
      </div>
      <!--七星图--> 
     <div id="SevenStar" style="width:6.74rem;height:4.5rem" ></div>
     <div style="padding: 0.2rem 0.3rem;box-sizing: border-box;" v-if="Data">
          <!--经证实证书-->
		<div class="xxtitle" v-if="Data.certificates.length">经证实</div>
		<div class="zsbox" v-if="Data.certificates.length">
			<div class="zs">
				<div class="zsitem" v-for="(item, key) in Data.certificates" :key="key">
					<img :src="imgurl + item.logo" v-if="item.logo">
					<img src="../../../static/img/easymmimg/mrhead.png" v-else>
					<div>{{item.name}}</div>
				</div>
			</div>
		</div> 
		<div class="xxtitle2">
			<span>服务详情</span>
			<a :href="Data.nurseJobLevelInfo.url">更多</a>
		</div>
		<div class="fwdetail">
			<div>{{Data.nurseJobLevelInfo.name}}</div>
			<pre>{{Data.nurseJobLevelInfo.serviceMsg}}</pre>
		</div>
     </div>
    <div class="bot" v-if="Data"></div>
	<div class="foot" v-if="Data">
		<div>￥{{Data.nursejob.showPrice}}</div>
		<div @click="appointment">立即预约</div>
	</div>
  </div>
</template>
<script>

export default {
  data() {
    return {
      job: "",
      nurseId: "",
      nurseJobId: "",
      Data: "",
      starimg: "",
      nostarimg: "",
      imgurl: "http://image.qsmam.com/",
      education: "",
      proficiency: "",
      page:false
    };
  },
  mounted() {
      $("html,body").animate({ scrollTop: 0 }, 0);
    let self = this;
    self.$dialog.loading.open("加载中...");
    self.job = self.$route.params.job;
    self.nurseId = self.$route.params.nurseId;
    self.nurseJobId = self.$route.params.nurseJobId;

    $.ajax({
      url: domain.Url + "app/nursebase/detail5Web",
      data: {
        job: self.job,
        nurseId: self.nurseId,
        nurseJobId: self.nurseJobId
      },
      success: data => {
          console.log(data)
        if (data.isSuccess) {
          self.Data = data.result;
          self.starimg = Math.round(self.Data.personalSkill.startLevel / 2);
          self.education = self.edu(self.Data.nursebase.education);
          self.proficiency = self.proficity(self.Data.nursebase.proficiency);
          self.$dialog.loading.close();
          let linedata = [
            data.result.personalSkill.proskillScore,
            data.result.personalSkill.emergencyScore,
            data.result.personalSkill.earlyeductScore,
            data.result.personalSkill.speakScore,
            data.result.personalSkill.eathealthScore,
            data.result.personalSkill.serviceScore,
            data.result.personalSkill.healthhabiltScore
          ];
          this.sevenimg(linedata);
        }
      }
    });
  },
  methods: {
    edu(x) {
      switch (x) {
        case "1": {
          return "小学";
          break;
        }
        case "2": {
          return "初中";
          break;
        }
        case "3": {
          return "高中";
          break;
        }
        case "4": {
          return "大学";
          break;
        }
        default:
      }
    },
    proficity(x) {
      switch (x) {
        case "1": {
          return "初级";
          break;
        }
        case "2": {
          return "中级";
          break;
        }
        case "3": {
          return "高级";
          break;
        }
        default:
      }
    },
    sevenxx() {
      $(".sevenxx").fadeToggle();
    },
    sevenimg(linedata) {
      let myChart = this.$echarts.init(document.getElementById("SevenStar"));
      // 绘制图表
      myChart.setOption({
          tooltip: {},
          radar: {
              indicator: [
                  { name: '专业能力', max: 10, color: '#666' },
                  { name: '急救情况', max: 10, color: '#666' },
                  { name: '早教教育', max: 10, color: '#666' },
                  { name: '沟通能力', max: 10, color: '#666' },
                  { name: '饮食健康', max: 10, color: '#666' },
                  { name: '服务意识', max: 10, color: '#666' },
                  { name: '卫生习惯', max: 10, color: '#666' }
              ],
              axisLine: {
                  show: false
              },
              splitNumber: 4,
              splitLine: {
                  show: false
              },
              splitArea: {
                  areaStyle: {
                      color: ['#F66866', '#F8807E', '#FAADAB', '#FDE0DF']
                  }
              },
          },
          series: [{

                  type: 'radar',
                  symbol: 'none',
                  itemStyle: {
                      normal: {
                          lineStyle: {
                              width: 1,//折线宽度
                              color: "#333"//折线颜色
                          }
                      }
                  },
                  data: [
                      {
                          value : linedata,

                      }
                  ]
              }]
      });
    },
    appointment() {
      let starttime = sessionStorage.getItem("startTime");
      let endTime = sessionStorage.getItem("endTime");
      sessionStorage.setItem(
        "nurseImage",
        this.imgurl + this.Data.nursebase.image
      );
      sessionStorage.setItem("nursename", this.Data.nursejob.nurseName);
      sessionStorage.setItem("nurseoldprice", this.Data.nursejob.marketPrice);
      sessionStorage.setItem("nursenewprice", this.Data.nursejob.showPrice);
      sessionStorage.setItem("nurseoneprice", this.Data.nursejob.price);
      if (this.job == "CRS") {
        if (starttime) {
          this.$router.push({
            name: "Crsorder",
            params: {
              job: this.job,
              nurseId: this.nurseId,
              nurseJobId: this.nurseJobId
            }
          });
        } else {
          this.$router.push({
            name: "CrsDate",
            params: {
              job: this.job,
              nurseId: this.nurseId,
              nurseJobId: this.nurseJobId
            }
          });
        }
      } else {
        if (starttime && endTime) {
          this.$router.push({
            name: "Hlsorder",
            params: {
              job: this.job,
              nurseId: this.nurseId,
              nurseJobId: this.nurseJobId
            }
          });
        } else {
          this.$router.push({
            name: "HlsDate",
            params: {
              job: this.job,
              nurseId: this.nurseId,
              nurseJobId: this.nurseJobId
            }
          });
        }
      }
    }
  }
};
</script>
<style lang="less" scoped>
@import url(../../../static/css/easymm/Hlsdetail.less);
</style>
