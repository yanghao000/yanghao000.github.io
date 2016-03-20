var carNum = 0;
$(function(){
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
				$(".yuan").css("display","none");
			}else{
				$(".yuan").css("display","block");
				
				$.each(data,function(i){
					carNum+=Number(data[i].number);
				});
				$(".yuan").html(carNum);
			}
		}
	});
});
