$(function(){
	$(".search input").on("keyup",function(){
		searchText = $(this).val();
		var data = {"selectText":searchText}
		$.get("http://datainfo.duapp.com/shopdata/selectGoodes.php",data,function(data){
			console.log(data);
			$(".searchBottom").remove();
			if(data!=0){
				$('<div class="searchBottom">'+
					'<ul>'+
					'</ul>'+
				'</div>').prependTo(".slide");
				$.each(data, function(i,val) {
					$("<li>"+data[i].goodsName+"</li>").appendTo(".searchBottom ul");
				});
			}else{
				$(".searchBottom").remove();
			}
		},"jsonp")
	});
	
	$(".slide").on("click",".searchBottom li",function(){
		$(".searchSelect").val($(this).html());
		$(".searchBottom").remove();
	});
//	搜索框
	$(".search img").on("click",function(){
		$(".searchBottom").remove();
		searchText = $(this).next().val();
		var data = {"selectText":searchText}
		$.get("http://datainfo.duapp.com/shopdata/selectGoodes.php",data,function(data){
			$(".goodBox").empty();
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
		},"jsonp")
	});
	
	
});