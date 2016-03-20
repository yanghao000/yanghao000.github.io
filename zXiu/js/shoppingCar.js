
$(function(){
//	打开购物车页面更新购物车	
	var toPrice = 0;
	var carNum = 0;
	var addGood = {}
	addGood.userID = sessionStorage.id;
	$.ajax({
		url:"http://datainfo.duapp.com/shopdata/getCar.php",
		data:addGood,
		type:"get",
		dataType:"jsonp",
		success:function(data){	
			console.log(data);
			if(typeof(data)!="object"){
				$(".shopping").css("display","none");
				$(".yuan").css("display","none");
				$(".shoppingEmpty").css("display","block");
			}else{
				$(".shopping").css("display","block");
				$(".yuan").css("display","block");
				$(".shoppingEmpty").css("display","none");
			}
			for(var i=0; i<data.length; i++){
				$('<section class="hadGood"><a href=""><img name='+data[i].goodsID+' src='+data[i].goodsListImg+'></a><div class="hadGoodInfo"><img class="del" src="img/img-icon/shanchu.png"/><p>'+data[i].goodsName+'</p><p>单价：￥<span>'+data[i].price+'</span><em>L</em></p><p>数量：<i class="cut" name='+data[i].goodsID+'>-</i><span class="num">'+data[i].number+'</span><i class="plus" name='+data[i].goodsID+'>+</i></p></div></section>').appendTo(".shopping");
				carNum+=Number(data[i].number);
				toPrice += Number(data[i].number)*Number(data[i].price);
			}	
			$(".yuan").html(carNum);
			$(".toSum").html(carNum);
			$(".toPrice").html("￥"+parseInt(toPrice));
		}
	});
//	购物车点击加减更新购物车
	$(".shopping").on("click",".plus",function(){
		var that = $(this).siblings(".num");
		var num = Number($(this).siblings(".num").html());
		num++;
		that.html(num);
		carNum++;
		$(".yuan").html(carNum);
//		计算商品数和总金额
		$(".toSum").html(carNum);
		toPrice+=parseInt($(this).parent().prev().find("span").html());
		$(".toPrice").html("￥"+parseInt(toPrice));
		
		var addGood = {}
		addGood.userID = sessionStorage.id;
		addGood.goodsID = $(this).attr("name");
		addGood.number = that.html();
		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/updatecar.php",
			data:addGood,
			type:"get",
			dataType:"json",
			success:function(data){	
				console.log(data);
			}
		});
	});
	$(".shopping").on("click",".cut",function(){
		var that = $(this).siblings(".num");
		var num = Number($(this).siblings(".num").html());
		num--;
		if(num<1){
			num=1;
		}else{
			that.html(num);
			carNum--;
			$(".yuan").html(carNum);
			$(".toSum").html(carNum);
			toPrice-=Number($(this).parent().prev().find("span").html());
			$(".toPrice").html("￥"+parseInt(toPrice));
			
			var addGood = {}
			addGood.userID = sessionStorage.id;
			addGood.goodsID = $(this).attr("name");
			addGood.number = that.html();
			$.ajax({
				url:"http://datainfo.duapp.com/shopdata/updatecar.php",
				data:addGood,
				type:"get",
				dataType:"json",
				success:function(data){	
					console.log(data);
				}
			});
		}
	});
	$(".shopping").on("click",".del",function(){
		carNum-=$(this).parent().find(".num").html();
		if(carNum<=0){
			$(".shopping").css("display","none");
			$(".yuan").css("display","none");
			$(".shoppingEmpty").css("display","block");
		}
		$(".yuan").html(carNum);
//		计算商品数和总金额
		$(".toSum").html(carNum);
		toPrice-=parseInt($(this).next().next().find("span").html()*$(this).parent().find(".num").html());
		$(".toPrice").html("￥"+parseInt(toPrice));
		
		var that = $(this);
		var addGood = {}
		addGood.userID = sessionStorage.id;
		addGood.goodsID = $(this).parent().find(".plus").attr("name");
		addGood.number = "0";
		$.ajax({
			url:"http://datainfo.duapp.com/shopdata/updatecar.php",
			data:addGood,
			type:"get",
			dataType:"json",
			success:function(data){	
				console.log(data);
				that.parents(".hadGood").hide(300);
			}
		});
	});
// 	点击购物车图片跳转商品详情
	$(".shopping").on("click",".hadGood a",function(event){
		event.preventDefault();
		window.location.href = "goodsInfo.html?shoppingCar.html="+$(this).find("img").attr("name");
	});
})