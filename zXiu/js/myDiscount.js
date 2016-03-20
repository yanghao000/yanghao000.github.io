$(function(){
	var discountBtn = $(".discountClass li");
	var disBox = $(".disBox");
	discountBtn.click(function(){
		var i = $(this).index();
		$(this).addClass("active").siblings().removeClass("active");
		$(".disBox:eq("+i+")").fadeIn(300).siblings().fadeOut(300);
	});
});
