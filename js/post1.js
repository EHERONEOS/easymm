//var base_url = "http://test.qsmam.com/";
var base_url = "https://qsmam.com/";
var img_url = "http://7xrxq9.com1.z0.glb.clouddn.com/";

$('.close').on('click', function() {
	$("footer").hide();
})

function getParameterByName(name, url) {
	if(!url) url = window.location.href;
	name = name.replace(/[\[\]]/g, "\\$&");
	var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
		results = regex.exec(url);
	if(!results) return null;
	if(!results[2]) return '';
	return decodeURIComponent(results[2].replace(/\+/g, " "));
}

function titleContent(data) {
	var blockFrom = data.result.blockFrom;
	var blockLogo = data.result.blockLogo;
	$(".head-title").html(blockFrom);
	$("title").html(blockFrom);
	if(blockLogo !=null){
		$(".head-logo img").attr("src", img_url + blockLogo);
	}
}

function post(data) {
	var titles = data.result.title;

	var suffixLableObj = data.result.suffixLableObj;

	var typeLableObjs = data.result.typeLableObjs;
	if(typeLableObjs != null || typeLableObjs.length != 0) {
		for(var i = 0; i < typeLableObjs.length; i++) {
			var typeLable = img_url + typeLableObjs[i].image;
			$(".img1").append(" <div><img src='" + typeLable + "'/> </div>");
		}
	}

	$(".baby-text").html(titles);

	if(!(suffixLableObj == "" || suffixLableObj == null)) {
		var suffUrl = img_url + suffixLableObj.image;
		$(".img2").append("<img src='" + suffUrl + "'/>");
		//	$(".img2 img").hide();
	}

}

function titleUser(data) {
	var userNickname = data.result.userNickname;
	var userImage = data.result.userImage;
	var nurseJobs = data.result.nurseJobs;
	var monthInfo = data.result.monthInfo;
	var nurseJobTitles = data.result.nurseJobTitles;
	if(nurseJobs == "" || nurseJobs == null) {
		$(".left-text>div:nth-of-type(2)").html(monthInfo);
	} else {
		$(".left-text>div:nth-of-type(2)").html(nurseJobTitles.split(",", "1"));
	}
	$(".left-text>div:nth-of-type(1)").html(userNickname);
	//$(".left-text>div:nth-of-type(2)").html(nurseJobs);
	$(".left-img img").attr("src", img_url + userImage);
}

function imgArr(data) {
	var imgArrs = data.result.imagesArrays;
	if(imgArrs != null) {
		for(var i = 0; i < imgArrs.length; i++) {
			var imagesArr = img_url + imgArrs[i];
			$(".product-img").append("<div><img src='" + imagesArr + "'/></div>")
		}
	}
	console.log(data.result)
	var upAmount = data.result.upAmount;
	var scannerAmount = data.result.scannerAmount;
	var replyCountAmount = data.result.replyCountAmount;
	var showTime = data.result.showTime;
	$(".date-day").html(showTime);
	$(".yuedu").html(scannerAmount);
	$(".dianzan").html(upAmount);
	$(".plun").html(replyCountAmount);
}

function hlsjn(data) {
	var content = data.result.content;
	if(content != null){
		content = content.replace(/\n/g, "<br/>");
		
		content = content.replace(/amp;/, "");
		// console.log(content)
		$(".baby-detail").html(content);
	}
}

function list(data) {
	var post = data.result;
	console.log(post)
	if(post.length > 0) {
		var rowCountOuter = 1;
		var rowInstance = null;

		for(var i = 0; i < post.length; i++) {
			var userNickname = post[i].userNickname;
			var msg = post[i].msg;
			var userImage = post[i].userImage;
			
			var showTime = post[i].showTime;
			var downAmount = post[i].downAmount;
			var upAmount = post[i].upAmount;
			var replyAmount = post[i].replyAmount;
			if(userImage == 'default_mother.png' || !userImage ){
				postImg ='img/mrimg.png'
			}else{
				postImg = img_url + userImage;
			}
			
			console.log(postImg)
			var simple = post[i].simpleReplyDtos;
			if(simple != null && simple.length > 0) {
				for(var j = 0; j < simple.length; j++) {
					var nickname = simple[j].userNickname;
					var fromUserNickname = simple[j].fromUserNickname;
					var msgs = simple[j].msg;
				}
			}
			$(".userInfor").append('<div class="luation luation-' + rowCountOuter + '"></div>')
			rowInstance = $(".luation-" + rowCountOuter);
			rowInstance
				.append("<div class='evaluation-head'><img src='" + postImg + "'> </div>")
				.append("<div class='evaluation-content'><div class='evaluation-title'><div class='evaluation-title-name'>" + userNickname + "</div><div class='evaluation-title-star'>" + msg + "</div></div><div class='evaluation-time'>" + showTime + "</div></div>")
				.append("<div class='reply'><ul><li><a>" + nickname + "</a> :回复<a>" + fromUserNickname + "</a><span>" + msgs + "</span></li></ul></div>")
				.append("<div class='product-same'><div><div><img src='http://image.qsmam.com/qsmm_yuedu.png' ></div><span class='product-yuedu'>" + downAmount + "</span></div><div><div><img src='http://image.qsmam.com/qsmm_dianzan.png' ></div><span class='product-dianzan'>" + upAmount + "</span></div><div> <div><img src='http://image.qsmam.com/qsmm_plun.png' ></div> <span class='product-plun'>" + replyAmount + "</span> </div></div>")
			rowCountOuter++;

		}
		if(simple.length == 0){
			$(".reply").hide();
		}
		$("#nums").html($(".userInfor>div").length);
	}

}

$(document).ready(function() {
	var id = getParameterByName("id");
	var type = getParameterByName("type");

	if(type === "web") {
		$("footer").hide();
	}
	$.getJSON({
		url: base_url + "mobileShare/forum2/post/detail?" + "id=" + id,
		dataType: "json",
		beforeSend: function(){ 
	   		$(".popup").show();	
	    },
		success: function(data) {
			// console.log(data.result.content)
			if(data.isSuccess) {
				post(data);
				titleContent(data);
				titleUser(data);
				imgArr(data);
				hlsjn(data)
			} else {

			}
		},
		complete: function(){
     		$(".popup").hide();
	   	},
			error: function(error) {}
		});

	$.getJSON({
		url: base_url + "mobileShare/forum2/reply/list?" + "postId=" + id,
		dataType: "json",
		success: function(data) {

			if(data.isSuccess) {
				list(data);

			} else {
				if($("#nums").text() == "" || $("#nums").html() == 0) {
					$("#stick").hide();
				} 
			}
		},
		error: function(error) {}
	});

})