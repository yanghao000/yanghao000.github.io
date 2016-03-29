(function judgeIE8down(){
	var DEFAULT_VERSION = "8.0";
	var ua = navigator.userAgent.toLowerCase();
	var isIE = ua.indexOf("msie")>-1;
	var safariVersion;
	if(isIE){
   	safariVersion =  ua.match(/msie ([\d.]+)/)[1];
   	if(safariVersion <= DEFAULT_VERSION ){
      	alert("浏览器版本过低，请更换浏览器或提升浏览器版本查看！");
//  		body.style.display = "none";
			window.open("http://www.baidu.com","_self");
  		}else{
      	my();
		}
	}else{
	   my();
	}
})();



var flag = true;
function my(){
$(function(){
	rightSlide();
	myHover();
	brandWord();
	onePageArrow();
	titleLeftRight();
	skillArrow();
	skillClick();
	worksSlide();
	phoneBtn();
//	new WOW().init();
	var mySwiper = new Swiper('.swiper-container', {
		direction: 'vertical',
		pagination: '.swiper-pagination',
      	mousewheelControl: true,
      	autoHeight: true, 
//		freeMode : true,
      	onInit:function(swiper){
      	titleRestart();
//    	swiperAnimateCache(swiper);
         swiperAnimate(swiper);
         navShow(0);
      },
      onSlideChangeEnd:function(swiper){
      	titleRestart();
      	swiperAnimate(swiper);
      	$(".swiper-container .container").scrollTop("0");
      	navShow(mySwiper.activeIndex);
      },
      onTouchEnd:function(){
   		twoPage();
   		fourPage();
   		fivePage();
      }
	});
//	导航定位
	(function nav(){
		$("header li").click(function(){
			var i = $(this).index();
			mySwiper.slideTo(i,1000);
		});
	})();
});

function navShow(i){
	var rightSlide = $(".right-slide");
	rightSlide.stop(true,true).animate({width:"0",left:"46"},0);
	rightSlide.eq(i).animate({width:"92",left:"0"},500);
}
//导航悬停效果
function rightSlide(){
	var rightSlide = $(".right-slide");
	$(".nav li").hover(function(){
		rightSlide.stop(true,true);
		$(this).find(".right-slide").animate({width:"92",left:"0"},500);
	},function(){
		rightSlide.stop(true,true);
		$(this).find(".right-slide").animate({width:"0",left:"46"},500);
	});
}
//头像悬停效果
function myHover(){
	$(".navbar-brand img").mouseenter(function(){
			$(this).attr("class","wow bounceOut");	
	});
	$(".navbar-brand img").mouseleave(function(){
		$(this).removeClass();
	});
}
//头像旁文字效果
function brandWord(){
	$(".brand-word").hover(function(){
		$(this).find("span").stop(true,true).siblings().stop(true,true);
		$(this).find("span").animate({top:"-35"},300);
		$(this).find("i").animate({bottom:"0"},300);
	},function(){
		$(this).find("span").stop(true,true).siblings().stop(true,true);
		$(this).find("span").animate({top:"0"},300);
		$(this).find("i").animate({bottom:"-35"},300);
	});
}
//第一页箭头
function onePageArrow(){
	if($(document).width()>=769){
		$(".infor:even").not(".infor3").myArrow({
			trig:"false",
			direction:"left",
			arrowS:50,
			arrowC:"red",
			pos:{left:-50,top:0},
		});
		$(".infor").eq(2).myArrow({
			trig:"false",
			direction:"right",
			arrowS:50,
			arrowC:"hotpink",
			pos:{right:-50,top:0},
		});
		$(".infor:odd").myArrow({
			trig:"false",
			direction:"right",
			arrowS:50,
			arrowC:"red",
			pos:{right:-50,top:0},
		});
	}else{
		$(".infor:even").myArrow({
			trig:"false",
			direction:"left",
			arrowS:23,
			arrowC:"red",
			pos:{left:-23,top:0},
		});
		$(".infor:odd").myArrow({
			trig:"false",
			direction:"right",
			arrowS:23,
			arrowC:"red",
			pos:{right:-23,top:0},
		});
	}
	$(".inforBox .myArrow").eq(0).css("borderRightColor"," darkcyan");
	$(".inforBox .myArrow").eq(1).css("borderLeftColor","darkgoldenrod");
	$(".inforBox .myArrow").eq(2).css("borderRightColor","hotpink");
	$(".inforBox .myArrow").eq(3).css("borderLeftColor","mediumpurple");
	$(".inforBox .myArrow").eq(4).css("borderRightColor","lightseagreen");
}
//标题左右框生成
function titleLeftRight(){
	var titleAfter = $("<div class='titleAfter'></div>");
	var titleBefore = $("<div class='titleBefore'></div>");
	$(".title h1").append(titleAfter);
	$(".title h1").prepend(titleBefore);
}
//标题动画重制
function titleRestart(){
	$(".titleBefore").css("animationPlayState","paused");
	$(".titleAfter").css("animationPlayState","paused");
	$(".titleBefore").removeAttr("style");
	$(".titleAfter").removeAttr("style");
	var t = setTimeout(function(){
		var titleStyle = "width:45px;height:45px; border-left:3px solid #ddd;border-top:3px solid #ddd;top:0px;-webkit-animation:titleLeft 1s;animation:titleLeft 1s";
		$(".titleBefore").attr("style",titleStyle);
		var titleStyle = "width:45px;height:45px;border-bottom:3px solid #ddd;border-right:3px solid #ddd;bottom:-10px;right:0;-webkit-animation:titleRight 1s;animation: titleRight 1s;";
		$(".titleAfter").attr("style",titleStyle);	
	},10);
}
//第二页滚动问题
function twoPage(){
	var twoHei = $(".two .over").height();//480
	var parHei = $(".two .abcBoxOut").height(); //400
	var boxHei = $(".two .abcBox").height();//750
//	$(".two .container").scrollTop("1");
	$(".two .abcBoxOut").on("touchmove",function(event){
		event.stopPropagation();
		$(this).on("touchmove",function(event){
			var ScrollDis = $(this).scrollTop();
			var max = ScrollDis + parHei;
			if((ScrollDis==0)||max==boxHei){
				$(this).off("touchmove");
			}else{
//				event.stopPropagation();
			}
		});
	});
}
function fourPage(){
	var twoHei = $(".four .over").height();//480
	var parHei = $(".four .abcBoxOut").height(); //400
	var boxHei = $(".four .abcBox").height();//750
//	$(".two .container").scrollTop("1");
	$(".four .abcBoxOut").on("touchmove",function(event){
		event.stopPropagation();
		$(this).on("touchmove",function(event){
			var ScrollDis = $(this).scrollTop();
			var max = ScrollDis + parHei;
			if((ScrollDis==0)||max==boxHei){
				$(this).off("touchmove");
			}else{
//				event.stopPropagation();
			}
		});
	});
}
function fivePage(){
	var twoHei = $(".five .over").height();//480
	var parHei = $(".five .abcBoxOut").height(); //400
	var boxHei = $(".five .abcBox").height();//750
//	$(".two .container").scrollTop("1");
	$(".five .abcBoxOut").on("touchmove",function(event){
		event.stopPropagation();
		$(this).on("touchmove",function(event){
			var ScrollDis = $(this).scrollTop();
			var max = ScrollDis + parHei;
			if((ScrollDis==0)||max==boxHei){
				$(this).off("touchmove");
			}else{
//				event.stopPropagation();
			}
		});
	});
}
//技能页箭头
function skillArrow(){
	$(".two figure").myArrow2({
		trig:"false",
		direction:"top",
		arrowS:12,
		arrowC:"#ccc",
		pos:{bottom:-10},
	});
}
//技能点击展开
function skillClick(){
	$(".two img").on("click",function(){
		var that = $(this).parents(".col-sm-12").find(".skillBox").css("height");
		if(parseInt(that)==0){
			$(this).parents(".col-sm-12").find(".skillBox").stop(true,true).animate({"height":"200px"},800);
			$(this).parents("figure").find(".myArrow2").css({"transform":"rotate(180deg)","transition":"transform 0.8s"});
			$(this).parents(".col-sm-12").find(".skillBox");
		}else{
			$(this).parents(".col-sm-12").find(".skillBox").stop(true,true).animate({"height":"0px"},800);
			$(this).parents("figure").find(".myArrow2").css({"transform":"rotate(0deg)","transition":"transform 0.8s"});
		}
	});
	$(".skillBox").on("click",function(){
		$(this).stop(true,true).animate({"height":"0px"},800);
		$(this).siblings("figure").find(".myArrow2").css({"transform":"rotate(0deg)","transition":"transform 0.8s"});
	});
}
//项目展示效果

function worksSlide(){
	var liNum = $(".slideBox").eq(0).find("li").length;
	var liWid = $(".slideBox").eq(0).find("li").width();
	var max = liWid*liNum;
	var slideBox = $(".slideBox");
	var work = $(".slideBox").find("li");
	slideBox.css("width",max);
	for(var i=0; i<slideBox.size(); i++){
		slideBox.eq(i).css({"left":-liWid*(i+1)});
	}
	var C = $(".slideBoxC");
	var L = $(".slideBoxL");
	var R = $(".slideBoxR");
	$(".slideBox").swipe({
		swipeLeft:function(distance){
			console.log(distance);
			if(flag){
				flag = false;
				var Cleft = parseInt(C.css("left"));
				var Lleft = parseInt(L.css("left"));
				var Rleft = parseInt(R.css("left"));
				C.stop(true,true).animate({"left":Cleft-liWid},1000,function(){judge(C);changeWord(C);});
				L.stop(true,true).animate({"left":Lleft-liWid},1000,function(){judge(L);changeWord(L);});
				R.stop(true,true).animate({"left":Rleft-liWid},1000,function(){judge(R);changeWord(R);});
			}
		},
		swipeRight:function(){
			if(flag){
				flag = false;
				var Cleft = parseInt(C.css("left"));
				var Lleft = parseInt(L.css("left"));
				var Rleft = parseInt(R.css("left"));
				C.stop(true,true).animate({"left":Cleft+liWid},1000,function(){judge(C);changeWord(C);});
				L.stop(true,true).animate({"left":Lleft+liWid},1000,function(){judge(L);changeWord(L);});
				R.stop(true,true).animate({"left":Rleft+liWid},1000,function(){judge(R);changeWord(R);});
			}
		},
		click:function(){
//			goTo($(this));
		}
	});
	function judge(obj){
		var objLeft = parseInt(obj.css("left"));
		if(objLeft==-(max-liWid)){
			obj.css({"left":-liWid});
		}else if(objLeft==0){
			obj.css({"left":-(max-2*liWid)});
		}
		flag=true;
	}
	function changeWord(obj){    //改项目名字
		var objLeft = parseInt(obj.css("left"));
		var word = obj.siblings(".word")
		if(objLeft==-liWid){
			word.html("走秀网");
		}else if(objLeft==-2*liWid){
			word.html("乐橙网");
		}else if(objLeft==-3*liWid){
			word.html("时尚网");
		}
	}
	(function goTo(){    //改项目地址
		$(".mask").on("click",function(event){
			event.stopPropagation;
			event.preventDefault();
			console.log(123);
			var objLeft = parseInt($(this).prev().css("left"));
			if(objLeft==-liWid){
				window.open("http://yanghao000.github.io/zXiu/index.html","_self");
			}else if(objLeft==-2*liWid){
				window.open("http://yanghao000.github.io/lechange/index.html","_self");
			}else if(objLeft==-3*liWid){
				window.open("http://yanghao000.github.io/zXiu2/index3.html","_self");
			}
		});
	})();
}

//手机按钮
function phoneBtn(){
	$(".phoneBtn").click(function(){
		var t = $(this).parent().find(".mask").css("top");
		if(parseInt(t)==0){
			$(this).parent().find(".mask").stop(true,true).animate({"top":"346px"},400);
			$(this).parent().find(".word").stop(true,true).animate({"top":"-60px"},600);
		}else{
			$(this).parent().find(".mask").stop(true,true).animate({"top":"0"},400);
			$(this).parent().find(".word").stop(true,true).animate({"top":"134px"},600);
		}
	});
}
}