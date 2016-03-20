window.onload = function(){
	document.documentElement.style.fontSize = document.documentElement.clientWidth/6.4 + "px";
	
	var swiper = new Swiper('.swiper-container', {
        pagination: '.swiper-pagination',
        paginationClickable: true,
      autoplay:5000,
      autoplayDisableOnInteraction:false,
      loop:true
    });
    
   $(".one > li").click(function(){
	 	if($(".two").css("display") == "block"){
	   		$(".two").hide(300);	
	   		$(".one > li p").css("transform","rotate(0deg)");
	 	}else{
	 		$(".two").show(300);
	 		$(".one > li p").css("transform","rotate(90deg)");
	 	}
    });

	$(".two").on("click","li",function(){
		if($(this).next(".three").css("display") == "block"){
	   		$(this).next(".three").hide(300);	
	   		$(this).find("p").css("transform","rotate(0deg)");
	 	}else if($(this).next(".three").css("display") == "none"){
	 		$(this).next(".three").show(300);
	 		$(this).find("p").css("transform","rotate(90deg)");
	 	}
	});
	
	$(".foot li").on("click",function(){
		var i = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".yiye:eq("+i+")").show().siblings(".yiye").hide();
	});
	
	var h = $(".photo").height();
	$(".swiper-slide img").css("height",h);
}

