$(function(){
	$.ajax({
		type:"get",
		url:"http://datainfo.duapp.com/shopdata/getclass.php",
		dataType:"json",
		success:function(data){
			console.log(data);
			var datas = data;
			$(data).each(function(i,val){
				$('<li>'+datas[i].className+'<p>&gt;</p></li><ul class="three"><li>女衬衫</li><li>男衬衫</li></ul>').appendTo(".two");
			});
		},
	});
});
