// $(function(){
// 	// 获取地址栏后面拼接的字符串的值
// 	var key=getSearch("key");
// 	// 将获取的值设置到搜索框中
// 	$(".lt_search input").val(key);
// 	// 渲染商品列表
// 	render();
// 	// 点击搜索按钮，根据搜索框的值进行渲染
// 	$(".lt_search button").click(function(){
// 		render();

// 		// 将搜索框输入的值存储到本地中
// 		var key=$(".lt_search input").val();
// 		// 获取本地存储
// 		var history=localStorage.getItem("search_list") || "[]";
// 		// 将json字符串解码成数组
// 		var arr=JSON.parse(history);
// 		// 判断输入框的值是否在数组中
// 		var index=arr.indexOf(key);
// 		// 如果数组中存在，删除
// 		if(index!==-1){
// 			arr.splice(index,1);
// 		}
// 		// 判断数组长度，如果长度超过10，删除数组最后一项
// 		if(arr.length>=10){
// 			arr.pop();
// 		}
// 		// 将搜索框的值添加到数组的最前面
// 		arr.unshift(key);
// 		// 数据持久化到本地
// 		localStorage.setItem("search_list",JSON.stringify(arr));
// 	});
// 	// 排序
// 	// 有data-type属性的选择器
// 	$(".lt_sort a[data-type]").click(function(){
// 		// 判断当前点击的是否有current这个类，
// 		if($(this).hasClass("current")){
// 			// 如果有current这个类，改变箭头的上下方向
// 			$(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
// 		}else{
// 			// 如果没有current这个类，就给点击的这个加上，其他移除
// 			$(this).addClass("current").siblings().removeClass("current");
// 			// 改变箭头的指向
// 			$(".lt_sort a[data-type]").find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
// 		}
// 		// 重新渲染页面
// 		render();
// 	});
// 	// 封装渲染函数
// 	function render(){
// 		// 定义一个空对象，用于ajax请求传递参数
// 		var params={};
// 		params.proName=$(".lt_search input").val();
// 		params.page=1;
// 		params.pageSize=100;
// 		// 选择有current类的
// 		var $current=$(".lt_sort .current");
// 		// 如果有current类的伪数组的长度大于0，
// 		if($current.length>0){
// 			// 设置排序参数
// 			var sortName=$current.data("type");
// 			var sortValue=$current.find("i").hasClass("fa-angle-down")?2:1;
// 			params[sortName]=sortValue;
// 		}
// 		$.ajax({
// 			url:"/product/queryProduct",
// 			type:'get',
// 			data:params,
// 			success:function(info){
// 				// console.log(info)
// 				$(".lt_product").html(template("productTpl",info))
// 			}
// 		});
// 	}
// });


$(function(){

	// 将需要调用渲染函数的地方，改成调用一次下拉刷新
	var currentPage=1;
	var pageSize=4;
	// 封装渲染函数
	function render( callback ){
		var params={};
			params.proName=$(".lt_search input").val();
			params.page=currentPage;
			params.pageSize=pageSize;
			// 获取有高亮显示的元素
		var $current=$(".lt_sort .current");
		// 如果有元素是高亮显示，设置排序参数
		if($current.length>0){
			var sortName=$current.data("type");
			var sortValue=$current.find("i").hasClass("fa-angle-down")?2:1;
			params[sortName]=sortValue;
		}
		$.ajax({
			type:"get",
			url:"/product/queryProduct",
			data:params,
			success:function(info){
				// $(".lt_product").html(template("productTpl",info))
				// 页面的渲染通过下拉刷新、上拉刷新的回调函数来做，函数以参数的形式传递进来
				callback(info);
			}
		});
	}
	// 获取地址栏后面拼接的字符串的name值
	var key=getSearch("key");
	// 将获取的name值设置给搜索框
	$(".lt_search input").val(key);
	// 配置上拉加载和下拉刷新
	mui.init({
		pullRefresh:{
			// 下拉刷新区域
			container:".mui-scroll-wrapper",
			down:{
				auto:true,//进入页面就下拉刷新一次
				callback:function(){
					currentPage=1;//重置当前页面
					render(function(info){
						$(".lt_product").html(template("productTpl",info));
						// 页面渲染完成后停止下拉刷新
						mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
						// 重新启用上拉加载
						mui(".mui-scroll-wrapper").pullRefresh().enablePullupToRefresh();
					});
				}
			},
			up:{
				callback:function(){
					currentPage++;
					render(function(info){
						if(info.data.length>0){
							$(".lt_product").append(template("productTpl",info));
							// 关闭上拉加载
							mui(".mui-scroll-wrapper").pullRefresh().endPullupToRefresh();
						}else{
							// 关闭上拉加载时, 让其显示没有更多数据的文本, 因为没有更多数据了,
              				// 所以在内部会自动调用禁用上拉加载
							mui('.mui-scroll-wrapper').pullRefresh().endPullupToRefresh(true);
						}
					})
				}
			}
		}
	});

	

	// 注册搜索点击事件
	$(".lt_search button").on("tap",function(){
		 mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
		
		// 获取搜索框的文本值
		var key=$(".lt_search input").val();
		// 获取本地存储数组并确保获取到的是数组
		var history=localStorage.getItem("search_list")||"[]";
		// 将获取到的本地存储的json字符串转换成数组
		var arr=JSON.parse(history);
		// 判断搜索框的值是否在数组中
		var index=arr.indexOf(key);
		if(index!==-1){
			// 如果在数组中，删除数组中的值
			arr.splice(index,1)
		}
		// 控制数组的长度为10，超出10，则删除数组的最后一项
		if(arr.length>=10){
			arr.pop();
		}
		// 将搜索框的值添加到数组的最前面
		arr.unshift(key);
		// 数据持久化
		localStorage.setItem("search_list",JSON.stringify(arr));
	});

	// 排序
	// 选择有自定义属性的元素并添加点击事件
	$(".lt_sort a[data-type]").on("tap",function(){
		// 判断被选中的元素有没有高亮显示，如果有，改变箭头的指向
		if($(this).hasClass("current")){
			$(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up")
		}else{
			// 如果没有，则当前高亮显示，其他移除高亮显示
			$(this).addClass("current").siblings().removeClass("current");
			// 让所有元素的箭头全部向下
			$(".lt_sort a[data-type]").find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
		}
		 mui('.mui-scroll-wrapper').pullRefresh().pulldownLoading();
	});

	
});