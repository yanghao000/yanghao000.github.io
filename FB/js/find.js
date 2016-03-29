$(function(){
	document.documentElement.style.fontSize = document.body.clientWidth/6.4 + "px";
	console.log(window.localStorage);
	findScrollHei();
	loadingFind($("#findScrollIn"),"下拉刷新","before");
	loadingFind($("#findScrollIn"),"上拉加载","after");
	loadingHei = $(".spinnerOut").outerHeight(true);
	findScroll();
	findRequire();
});
var myScroll = null;
var loadingHei;
var pageNo = 0;
//设置滚动区域高度
function findScrollHei(){
	var bodyHei = $("body").height();
    var headerHei = $(".header").height();
    var footerHei = $(".footer").outerHeight(true);
    var searchHei = $(".search").outerHeight(true);
    var bodyWid = $("body").width();
    $("#findScrollOut").css({"height":bodyHei-headerHei-searchHei-footerHei,"overflow":"hidden"});
}
//接收搜索数据
function findRequire(){
//	var jsons= {}; 
//	jsons.loginsuserid = local.read("id");
//	jsons[page.pageNo] = "1";
//	console.log(jsons);
	findAjax({loginsuserid:local.read("id"),"page.pageNo":++pageNo},function(data){
		var obj = data.data.userlist;
		console.log(obj);
		for(var i=0; i<obj.length; i++){
			var imgUrl = "http://101.200.173.217:8080/FootBall"+obj[i].avatarpath;
			var userName = obj[i].nickname;
			var sign = obj[i].signnature;
			var id = obj[i].avatarId;
			$(
				'<div class="user">'+
					'<div class="headPhoto"><a href=""><img src="'+imgUrl+'"/></a></div>'+
					'<div class="userInfor">'+
						'<div class="userName">'+userName+'</div>'+
						'<div class="Btn" name="'+id+'">关注</div>'+
						'<div class="sign">'+sign+'</div>'+
					'</div>'+
				'</div>'
			).appendTo(".searchList");
		}
		
		showLoading();
		myScroll.refresh();
		myScroll.maxScrollY = myScroll.maxScrollY + loadingHei;
		focusBtnFn();
	});
}
//new滚动对象
function findScroll(){	
	var up = $(".spinnerOut").eq(0);
	var down = $(".spinnerOut").eq(1);
	myScroll = new iScroll("findScrollOut",{
//		scrollbarClass: 'myScrollbar', /* 重要样式 */
//		useTransition: false, /* 此属性不知用意，本人从true改为false */
		topOffset: loadingHei,
		onRefresh: function () {
			if (up.hasClass("loading")) {
				this.maxScrollY = this.maxScrollY + loadingHei;
				up.removeClass("loading flip");
				up.find("p").html("下拉刷新");
			}
			if (down.hasClass("loading")) {
				this.maxScrollY = this.maxScrollY + loadingHei;
				down.removeClass("loading flip");
				down.find("p").html("上拉加载");
			}
		},
		onScrollMove: function () {
			if (this.y > 60 && !up[0].className.match('flip')) {	
				this.minScrollY = 0;
				up.find("p").html("释放刷新");
				up.addClass("flip");
			}else if(this.y < 40 && up[0].className.match('flip')){
				this.minScrollY = -loadingHei;
				up.find("p").html("下拉刷新");
				up.removeClass("flip");
			}else if(this.y < (this.maxScrollY-90) && !down[0].className.match('flip')){
				this.maxScrollY = this.maxScrollY - loadingHei;
				down.find("p").html("释放加载");
				down.addClass("flip");
			}else if(this.y > (this.maxScrollY-60) && down[0].className.match('flip')){
				this.maxScrollY = this.maxScrollY + loadingHei;
				down.find("p").html("上拉加载");
				down.removeClass("flip");
			}
		},
		onScrollEnd: function () {
			if(up[0].className.match('flip')){
				up.addClass("loading");
				up.find("p").html("正在刷新");
				upActive();
			}else if(down[0].className.match('flip')){
				down.addClass("loading");
				down.find("p").html("正在加载");
				downActive();
			}
		}
	});
//	myScroll.maxScrollY = myScroll.maxScrollY + loadingHei;
}
//下拉后refresh的操作
function upActive(){
	if(flag){
		flag = 0;
		var t = setTimeout(function(){
			findRequire();
			myScroll.refresh();
			flag = 1;
		},1000);
	}
}
//上拉后refresh的操作
function downActive(){
	if(flag){
		flag = 0;
		var t = setTimeout(function(){	
			findRequire()
			myScroll.refresh();
			flag = 1;
		},1000);
	}
}
//点击关注按钮
function focusBtnFn(){
	$(".Btn").on("click",function(){
		var that = $(this);
		console.log(that);
		var jsons = {}
		jsons.loginsuserid = local.read("id");
		jsons.tagetuserid = $(this).attr("name");
		console.log(jsons);
		if(!that.hasClass("focusBtn")){
			focusPerson(jsons,function(data){
				console.log(data);
				if(data.ecode == 200){
					that.addClass("focusBtn");
				}else{
					
				}
			});
		}else{
			cancelFocus(jsons,function(data){
				if(data.ecode == 200){
//					that.addClass("focusBtn");
				}else{
					
				}
			});
		}
	});
}
