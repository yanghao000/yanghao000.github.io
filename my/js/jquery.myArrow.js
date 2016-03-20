;(function($){
	$.fn.myArrow = function(options){
		var setting = {
			trig:"mouseenter",
			direction:"top",
			arrowS:10,
			arrowC:"red",
			pos:{bottom:0},
			arrowSmallS:8,
			arrowSmallC:"green",
			Smallpos:{bottom:0},
		}
		var opt = $.extend({},setting,options);

		//创建箭头，设置属性
		var arrow = $('<div class="myArrow"></div>');
		var arrowSmall = $('<div class="myArrowSmall"></div>');
		var posArr = [];
		for(var i in opt.pos){
			posArr.push(i);
		}
		arrow.attr("style","position:absolute;border:"+opt.arrowS+"px solid "+opt.arrowC+";"+posArr[0]+":" + opt.pos[posArr[0]] + "px;" + posArr[1] + ":" + opt.pos[posArr[1]] + "px;border-" + opt.direction + ":none;");
		var posArr = [];
		for(var i in opt.Smallpos){
			posArr.push(i);
		}
		arrowSmall.attr("style","position:absolute;border:"+opt.arrowSmallS+"px solid "+opt.arrowSmallC+";"+posArr[0]+":" + opt.Smallpos[posArr[0]] + "px;" + posArr[1] + ":" + opt.Smallpos[posArr[1]] + "px;border-" + opt.direction + ":none;");
		
		var objL = this.width();
		var objT = this.height();
		if(opt.direction == "top"||opt.direction == "bottom"){
			arrow.css({
				"border-right-color":"transparent",
				"border-left-color":"transparent",
//				"left":objL/2-opt.arrowS
			});
			arrowSmall.css({
				"border-right-color":"transparent",
				"border-left-color":"transparent",
//				"left":objL/2-opt.arrowSmallS
			});
		}else{
			arrow.css({
				"border-top-color":"transparent",
				"border-bottom-color":"transparent",
//				"top":objT/2-opt.arrowS
			});
			arrowSmall.css({
				"border-top-color":"transparent",
				"border-bottom-color":"transparent",
//				"top":objT/2-opt.arrowSmallS
			});
		}
		//触发方式
//		return $(this).each(function(){
			if(opt.trig != "false"){
				$(this).on(opt.trig,function(){
					$(this).append(arrow);
//					$(this).append(arrowSmall);
				});
				$(this).on("mouseleave",function(){
					arrow.remove();
//					arrowSmall.remove();
				});
			}else{
				$(this).append(arrow);
//				$(this).append(arrowSmall);
			}
		return this;
//
	}
})(jQuery);
