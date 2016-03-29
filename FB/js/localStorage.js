var local = (function(){
	function createLocal(){
		var local = window.localStorage;
		return local;
	}
	function write(key,cxt){      //传入单个属性或json
		if(typeof(key)=="string"){
			createLocal().setItem(key,cxt);
		}else if(typeof(key)=="object"){
			for(var i in key){
				local.write(i,key[i]);
			};
		}
	}
	function read(key){           //传入单个属性或属性数组,不传默认取出全部,以json返回
		if(typeof(key)=="string"){
			var val = createLocal().getItem(key);
			return val;
		}else if(typeof(key)=="object"){
			var json = {};
			for(var i=0; i<key.length; i++){
				json[key[i]] = createLocal().getItem(key[i]);
			}
			return json;
		}else{
			var json = {};
			for(var i in createLocal()){
				json[i] = createLocal().getItem(i);
			}
			return json;
		}
	}
	function remove(cxt){           //删除单个属性
		createLocal().removeItem(cxt);
	}
	function clear(){                //清除存储
		for(var i in createLocal()){
			createLocal().removeItem(i);	
		}
	}
	return{
		write:function(key,cxt){
			write(key,cxt);
		},
		read:function(key){
			 return read(key);
		},
		remove:function(key){
			remove(key);
		},
		clear:function(){
			clear();
		}
	}
})();


