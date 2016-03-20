$(function(){
	var inData = {"goodsID":getGoodId(1)}
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getGoods.php",
		data:inData,
		dataType:"jsonp",
		success:function(data){
			console.log(data);
			builder(data);
		}
	});
	$(".back").click(function(){
		window.location.href = getGoodId(0);
	});
	
	function getGoodId(num){
		var url = window.location.search
		var pos = url.indexOf("?");
		var id = url.substring(pos+1,url.length);
		id = id.split("=");
		return id[num];
	}
	
	function builder(data){
		var intorImg = data[0].goodsListImg;
		var price = data[0].price;
		var discount = data[0].discount;
		var buyNumber = data[0].buynumber;
		var goodsName = data[0].goodsName;
		if(discount==0){
			var cost = price;
		}else{
			var cost = parseInt(price)/(parseInt(discount)/10);
			var cost = parseInt(cost);
		}
		
		$('<div class="info">'+
			'<a href=""><img src='+intorImg+'></a>'+
			'<div class="infoTitleOut">'+
				'<div class="trigon"></div>'+
				'<div class="infoTitle">'+
					'￥<span>'+price+'</span>'+goodsName+''+
				'</div>'+
			'</div>'+
			'<p>市场价:'+ '<span>￥<i>'+cost+'</i></span><span><i>'+discount+'</i>折</span><span><i>'+buyNumber+'</i>人'+
			'购买</span></p>'+
		'</div>').appendTo(".intro");	
		
		var det = data[0].detail;
		$(".word p").html(det);
		
		var oImg = JSON.parse(data[0].goodsBenUrl);
		$("<img src="+oImg[0]+">").prependTo(".details");
		
		var imgList = jQuery.parseJSON(data[0].imgsUrl);
		for(var i=0; i<imgList.length; i++){
			$('<img src='+imgList[i]+'>').appendTo(".swiper-slide:eq("+i+")");
		}
	}
});
