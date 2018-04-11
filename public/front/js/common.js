$(function(){
	// mui(".box")相当于选择器
	// 初始化滚动区域
	mui('.mui-scroll-wrapper').scroll({
		// deceleration: 0.0005 //flick 减速系数，系数越大，滚动速度越慢，滚动距离越小，默认值0.0006
		indicators: false //是否显示滚动条
	});
	// 配置轮播图自动轮播
	var gallery = mui('.mui-slider');
		gallery.slider({
		  interval:1000//自动轮播周期，若为0则不自动播放，默认为0；
		});
});

// 封装截取地址栏拼接的字符串函数
// function getSearch(key){
// 	// 获取地址栏问号后面的字符串
// 	var search=location.search;
// 	// 解码(中文在获取时是编码状态，解码成中文)
// 	search=decodeURI(search);
// 	// 删除字符串最前面的问号
// 	search=search.slice(1);
// 	// 以&分割字符串成数组
// 	var arr=search.split("&");
// 	// 定义一个空对象，用来保存分割字符串出来的键和值
// 	var obj={};
// 	// 遍历数组，将数组中的键和值以对象的形式保存起来
// 	arr.forEach(function(element,index){
// 		// 以=再分割数组
// 		var k=element.split("=")[0];
// 		var v=element.split("=")[1];
// 		obj[k]=v;
// 	})
// 	// 返回对象的属性值
// 	return obj[key]
// }
// 封装获取地址栏拼接的字符串函数
function getSearch(key){
	// 获取地址栏后拼接的字符串
	var search=location.search;
	// 解码
	search=decodeURI(search);
	// 去掉问号
	search=search.slice(1);
	// 以&分割字符串成数组
	var arr=search.split("&");
	// 定义一个空对象，用来将数组以对象的形式保存
	var obj={};
	arr.forEach(function(element,index){
		// 将分割出来的数组再次分割成键值对
		var k=element.split("=")[0];
		var v=element.split("=")[1];
		// 将分割出来的键值对保存在对象中
		obj[k]=v;
	})
	// 返回对象的属性值
	return obj[key];
}
