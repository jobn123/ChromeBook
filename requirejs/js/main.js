requirejs.config({
	paths:{
		jquery: "jquery.min" /*配置别名，js可以省略*/
	}
});

requirejs(['jquery','validate'],function ($,val){	//	使用jquery
	console.log(val.isEmpty(1,2));
})