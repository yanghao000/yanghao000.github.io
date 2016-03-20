$(function(){
	$(".exit").on("click",function(){
		sessionStorage.removeItem("id");
		window.location.href = "myXiu.html";
	});
});
