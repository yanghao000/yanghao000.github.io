$(function(){document.documentElement.style.fontSize = document.body.clientWidth/6.4 + "px";});

var flag = 1;
//注册ajax
function regAjax(obj,fn){
	$.ajax({
		type:"get",
		url:"http://localhost:8080/Proxy/FootBall/user/json/reg.do",
		data:obj,
		dataType:"json",
		success:function(data){
			if(fn){fn(data);}
		},
	});
}
//登录ajax
function loginAjax(obj,fn){
	$.ajax({
		type:"get",
		url:"http://localhost:8080/Proxy/FootBall/user/json/login.do",
		data:obj,
		dataType:"json",
		success:function(data){
			if(fn){fn(data);}
		},
	});
}
//首页热点ajax
function indexAjax(obj,fn){
	$.ajax({
		type:"get",
		url:"http://localhost:8080/Proxy/FootBall/tweet/json/query/hotspot.do",
		data:obj,
		dataType:"json",
		success:function(data){
			if(fn){fn(data);}
		},
	});
}
//首页关注ajax
function focusAjax(obj,fn){
	$.ajax({
		type:"get",
		url:"http://localhost:8080/Proxy/FootBall/attention/json/queryall/followed.do",
		data:obj,
		dataType:"json",
		success:function(data){
			if(fn){fn(data);}
		},
	});
}
//发现ajax
function findAjax(obj,fn){
	$.ajax({
		type:"get",
		url:"http://localhost:8080/Proxy/FootBall/user/json/queryall.do",
		data:obj,
		dataType:"json",
		success:function(data){
			if(fn){fn(data);}
		},
	});
}
//发现-关注按钮ajax
function focusPerson(obj,fn){
	$.ajax({
		type:"get",
		url:"http://localhost:8080/Proxy/FootBall/attention/json/follow.do",
		data:obj,
		dataType:"json",
		success:function(data){
			if(fn){fn(data);}
		},
	});
}
//取消关注ajax
function cancelFocus(){
	$.ajax({
		type:"get",
		url:"http://localhost:8080/Proxy/FootBall/attention/json/unfollow.do",
		data:obj,
		dataType:"json",
		success:function(data){
			if(fn){fn(data);}
		},
	});
}
//提示框
function pop(str,fn){
	$("<div>"+str+"</div>").appendTo("body").css({
	 	width:"80%",
	 	height:"1.4rem",
	 	fontSize:"0.32rem",
	 	lineHeight:"1.4rem",
	 	textAlign:"center",
	 	margin:"0 auto",
	 	background:"#0f91c5",
	 	borderRadius:"0.2rem",
	 	color:"#fff",
	 	marginTop:"0.8rem",
	 	opacity:"0",
	}).animate({opacity:"1",marginTop:"0.2rem"},1000,function(){
	 	var that = $(this);
	 	var t = setTimeout(function(){
	 		that.fadeOut(300);
	 		flagg=true;
	 		if(fn){fn();}
	 	},1000);
	});
}
//预加载动画
function loadingFind(obj,text,trig){
	var div = $(
		'<div class="spinnerOut">'+
			'<div class="spinner">'+
			  	'<div class="spinner-container container1">'+
				   '<div class="circle1"></div>'+
				   '<div class="circle2"></div>'+
				   '<div class="circle3"></div>'+
				   '<div class="circle4"></div>'+
				'</div>'+
			   '<div class="spinner-container container2">'+
				   '<div class="circle1"></div>'+
				   '<div class="circle2"></div>'+
				   '<div class="circle3"></div>'+
				   '<div class="circle4"></div>'+
			   '</div>'+
			   '<div class="spinner-container container3">'+
				   '<div class="circle1"></div>'+
				   '<div class="circle2"></div>'+
				   '<div class="circle3"></div>'+
				   '<div class="circle4"></div>'+
			   '</div>'+
			   '<p>'+text+'</p>'+
			'</div>'+
		'</div>'
	);
	if(trig == "before"){
		div.prependTo(obj);
	}else if(trig == "after"){
		div.appendTo(obj);
	}
}
function showLoading(){
	$(".spinnerOut").show();
}
//document.addEventListener('touchmove',function (e) { e.preventDefault(); },false);

//瀑布流
function wall(obj){
	var di = obj;
	var list = di.getElementsByTagName("div");
	var winWid = di.offsetWidth;
	var listWid = list[0].offsetWidth;
	var col = Math.floor(winWid/listWid);
	var hspace = winWid%listWid/(col+1);
	var vspace = 5;
	var pos = [];
	
	for(var i=0;i<col;i++){
		pos[i] = {left:i*listWid+(i+1)*hspace,top:vspace};
	}
	
	for(var i=0;i<list.length;i++){
		var listCol = i%col;
		list[i].style.left = pos[listCol].left + "px";
		list[i].style.top = pos[listCol].top + "px";
		pos[listCol].top += vspace + list[i].offsetHeight;
	}
	
	var n = list.length;
	var sum = [];
	for(var i=n-1; i>n-1-col; i--){
		var topVal = parseInt(list[i].style.top);
		var heiVal = parseInt(list[i].offsetHeight);
		sum.push(topVal+heiVal);
	}
	sum.sort(function(a,b){
		return b-a;
	});
	
	obj.style.height = sum[0] + "px";
}

