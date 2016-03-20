
	function pop(str,fn){
		var flagg = false;
		if(flagg==false){
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
		 		flagg=true;
		 		if(fn){fn();}
		 	},1100);
		});
		}
	}
