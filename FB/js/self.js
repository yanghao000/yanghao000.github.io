$(function(){
	document.documentElement.style.fontSize = document.body.clientWidth/6.4 + "px";
	function swiperHei(){
		var bodyHei = $("body").height();
	   var headerHei = $(".header").height();
	   var navHei = $(".nav").height();
	   var footerHei = $(".footer").outerHeight(true);
	   var searchHei = $(".search").outerHeight(true);
	   var bodyWid = $("body").width();
	   var userHei = $(".user").outerHeight(true);
	   $(".selfScroll").css({"height":bodyHei-headerHei-searchHei-footerHei-userHei-navHei,"overflow":"hidden"});
	}
	swiperHei();
	function selfScroll(){
		var myScroll = new IScroll('.selfScroll',{
			mouseWheel: true,
			preventDefault:false,
		});
	}
	selfScroll();
	navClick();
	navActive();
});
function navClick(){
	$(".nav li").on("click",function(){
		var i = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".indexSlide").eq(i).show().siblings().not(".nav").hide();
		$(".selfBox").eq(i).show().siblings(".selfBox").hide();
	});
}
//	导航选择状态
function navActive(i){
	$(".nav li").eq(i).addClass("active").siblings().removeClass("active");
}