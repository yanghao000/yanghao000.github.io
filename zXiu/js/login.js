
$(function(){
	var flagg = true;
//	checkUser();
console.log(sessionStorage.id);
	if(typeof(sessionStorage.id)=="undefined"){
		$(".nicheng").html("请登录");
	}else{
		$(".nicheng").html(sessionStorage.id).css({"color":"#e4366b","fontWeight":"900"});
	}

//	发送登录请求
	$("input[name='login']").click(function(){
		var user = $("input[name='user']").val();
		var pass = $("input[name='pass']").val();
		var jsons = {};
		jsons.status = "login";
		jsons.userID = user;
		jsons.password = pass;
		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/userinfo.php",
			type:"post",
			data:jsons,
			dataType:"json",
			success:function(data){
				flag = data;
				console.log(flag);
				if(flag==0){
					pop("用户名不存在");
				}else if(flag==2){
					pop("用户名与密码不符");
				}else{
//					var dataObject = jQuery.parseJSON(flag);
					sessionStorage.id=flag.userID;
					pop("登录成功",function(){window.location.href="myXiu.html";});				
//					window.location.href="myXiu.html?nicheng="+flag.userID;
				}
			}
		});
	});
	
//	function pop(str,fn){
//		var flagg = false;
//		if(flagg==false){
//		$("<div>"+str+"</div>").appendTo("body").css({
//		 	width:"4rem",
//		 	height:"2rem",
//		 	fontSize:"0.4rem",
//		 	lineHeight:"2rem",
//		 	textAlign:"center",
//		 	margin:"0 auto",
//		 	background:"#e4366b",
//		 	borderRadius:"0.2rem",
//		 	color:"#fff",
//		 	marginTop:"1rem",
//		 	opacity:"0",
//		}).animate({opacity:"1",marginTop:"0"},1000,function(){
//		 	var that = $(this);
//		 	var t = setTimeout(function(){
//		 		that.fadeOut(300);
//		 		flagg=true;
//		 		if(fn){fn();}
//		 	},1300);
//		});
//		}
//	}
	
//	function checkUser(){
//		var httpUrl = window.location.search;
//		var pos = httpUrl.indexOf("?");
//		var userID = httpUrl.substring(pos+1,httpUrl.length);
//		userID = userID.split("=");
//		if(userID!=""){
//			$(".nicheng").html(userID[1]);		
//		}else{
//			$(".nicheng").html("未知");	
//		}
//	}
});