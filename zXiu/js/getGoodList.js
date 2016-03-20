$(function(){
var searchText = "";
//	首页商品列表
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		dataType:"jsonp",
		success:function(data){
			if(searchText==""){
			console.log(data);
			var datas = data;
			$.each(datas,function(i,val){

					var price = data[i].price;
					var discount = data[i].discount;
					if(discount==0){
						var cost = price;
					}else{
						var cost = parseInt(price)/(parseInt(discount)/10);
						var cost = parseInt(cost);
					}
					$('<section class="goodList"><div class="limg"><a href="goodsInfo.html"><img src='+datas[i].goodsListImg+'></a></div><div class="goodDel"><div class="goodTitle">'+datas[i].goodsName+'</div><div class="price"><span>￥<i>'+datas[i].price+'</i></span><em>￥'+cost+'</em><p>'+datas[i].discount+'折</p></div><div class="goShop" name='+datas[i].goodsID+'><img src="img/img-icon/jiarugouwuche.png"/></div></div></section>').appendTo(".goodBox");
				});
			}
		},
	});
//	banner轮播图
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getBanner.php",
		dataType:"jsonp",
		success:function(data){
			console.log(data);
			var datass = data;		
			$(datass).each(function(i,val){
				var datajson = jQuery.parseJSON(datass[i].goodsBenUrl);
				$("<img name="+datass[i].goodsID+" src="+datajson[0]+">").appendTo(".swiper-slide:eq("+i+") a");
			});
		},
	});
//	$.ajax({
//		type:"get",
//		url:"http://datainfo.duapp.com/shopdata/getBanner.php",
//		dataType:"jsonp",
//		success:function(data){
//			console.log(data);
//			var datass = data;		
//			$(datass).each(function(i,val){
//				var datajson = jQuery.parseJSON(datass[i].goodsBenUrl);
//				$('<div class="swiper-slide"><a href="goodsInfo.html"><img name='+datass[i].goodsID+' src='+datajson[0]+'></a></div>').appendTo(".swiper-wrapper");
//			});
//		},
//	});
//	添加购物车
	$(".goodBox").on("click",".goShop",function(){
		var that = $(this);
		if(sessionStorage.id==""||sessionStorage.id=="undefined"||sessionStorage.id==null){
			window.location.href = "myXiu.html";
		}
		
		$.get("http://datainfo.duapp.com/shopdata/getCar.php",{"userID":sessionStorage.id},function(data){
			var goodsId = [];
			var goodsNum = []
			$.each(data,function(i,val){
				goodsId.push(val.goodsID);
				goodsNum.push(val.number);
			});
			console.log(goodsId);
			console.log(goodsNum);
			
			var tag = 0;
			var flag = false;
			if(goodsId!=null||goodsId!=""||goodsId!="undefined"||goodsId!=[]){
				var id = that.attr("name");
				for(var i=0; i<goodsId.length; i++){
					if(id == goodsId[i]){
						tag = i;
						flag = true;
						break;
					}
				}
			}
			var addGood = {}
			addGood.userID = sessionStorage.id;
			addGood.goodsID = that.attr("name");
			addGood.number = flag==true? Number(goodsNum[tag])+1:"1";
			$.ajax({
				url:"http://datainfo.duapp.com/shopdata/updatecar.php",
				data:addGood,
				type:"get",
				dataType:"json",
				success:function(data){
					$(".yuan").css("display","block");
					console.log(data);
					carNum++;
					$(".yuan").html(carNum);
//					pop("添加成功");
					clone(that);
				}
			});
			
		},"jsonp");
	});
//	点击商品图片跳转商品详情页面（将商品号传过去）
	$(".goodBox").on("click",".limg a",function(event){
		event.preventDefault();
		window.location.href = "goodsInfo.html?index.html="+$(this).parents(".goodList").find(".goShop").attr("name");
	});
	$(".swiper-slide a").click(function(event){
		event.preventDefault();
		window.location.href = "goodsInfo.html?index.html="+$(this).find("img").attr("name");
	});
});

function clone(obj){
	var box = obj.parent().siblings();
	var son = obj.parent().siblings().find("img").clone();
	son.css({
		position:"absolute",
		zIndex:"99999",
		top:"0",
		left:"0",
		animation:"myfirst 1s linear infinite alternate",
	});
	son.appendTo(box);
	var footerTop = $(".footer").offset().top;
	var sonTop = son.offset().top;
	var imgTop = footerTop-sonTop+20;
	var imgLeft = $(".footer li").eq(2).offset().left+40;
	son.animate({
		top:imgTop,
		left:imgLeft,
		width:"0",
		height:"0"
	},1000,function(){
		this.remove();
	});
}

