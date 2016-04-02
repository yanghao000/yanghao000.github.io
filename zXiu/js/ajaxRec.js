var Rec = function(){}
Rec.prototype = {
	getRec:function(url,callback){
		var xhr = new XMLHttpRequest();
		xhr.open("get",url,true);
		xhr.send();
		xhr.onreadystatechange = function(){
			if(req.readyState == 4){
			alert(req.responseText);
		}
	},
	postRec:function(){}
}
var rec = new Rec();
rec.getRec("http://datainfo.duapp.com/shopdata/getGoods.php",function(data){
	console.log(data);
	var json = JSON.parse(data);
});
