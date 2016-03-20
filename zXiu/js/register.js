$(function(){
	$("input[name='agree']").click(function(){
		var userName = $("input[name='userName']").val();
		var passWord = $("input[name='passWord']").val();
		var repassWord = $("input[name='repassWord']").val();	
		if(passWord==repassWord){
			var jsons = {};
			jsons.status = "register";
			jsons.userID = userName;
			jsons.password = passWord;
			$.ajax({
				url:"http://datainfo.duapp.com/shopdata/userinfo.php",
				type:"post",
				data:jsons,
				dataType:"json",
				success:function(data){
					var flag = data;
					if(flag==1){
						pop("注册成功",function(){window.location.href="login.html";});
					}
					if(flag==0){
						pop("用户名已存在");
					}
				}
			});
		}else{
			$("input[name='repassWord']").attr("type","text");
			$("input[name='repassWord']").val("两次输入密码不一致");
			$("input[name='repassWord']").css({"border":"1px solid #e4366b",color:"#e4366b"});
			pop("两次输入密码不一致");
		}	
	});
	$("input[name='repassWord']").focus(function(){
		$(this).attr("type","password");
		$(this).val("");
		$(this).css({"border":"1px solid #ccc",color:"#000"});
	});
	function pop(str,fn){
		$("<div>"+str+"</div>").appendTo("body").css({
		 	width:"4rem",
		 	height:"2rem",
		 	fontSize:"0.4rem",
		 	lineHeight:"2rem",
		 	textAlign:"center",
		 	margin:"0 auto",
		 	background:"#e4366b",
		 	borderRadius:"0.2rem",
		 	color:"#fff",
		 	marginTop:"1rem",
		 	opacity:"0",
		}).animate({opacity:"1",marginTop:"0"},1000,function(){
		 	var that = $(this);
		 	var t = setTimeout(function(){
		 		that.fadeOut(300);
		 		if(fn){fn();}
		 	},1100);
		});
	}
});
