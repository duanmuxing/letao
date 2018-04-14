$(function(){
	// 封装渲染函数
	function render(){
		// 为了配合下拉刷新，设置延时
		setTimeout(function(){
			$.ajax({
				url:"/cart/queryCart",
				type:'get',
				success:function(info){
					// console.log(info)
					// 渲染
					$("#productList").html(template("productTpl",{list:info}));
					// 下拉刷新在页面渲染完成后手动结束(消失)
					mui(".mui-scroll-wrapper").pullRefresh().endPulldownToRefresh();
				}
			});
		},500)
	};
	// 配置下拉刷新
	mui.init({
		pullRefresh:{
			container:".mui-scroll-wrapper",//下拉刷新容器标识
			down:{//回调函数，下拉刷新时干啥
				auto:true,//可选配置，默认false，首次加载自动下拉刷新一次
				callback:function(){
					render()
					// 必须回调函数，根据业务编写
				}
			}
		}
	});

	// 删除功能：
	// 1、给删除按钮注册点击事件(事件委托)
	// 2、根据购物车id，发送删除的ajax请求(购物车id存在自定义属性上)
	// mui将click事件给禁止了，用tap
	$("#productList").on("tap",".btn_delete",function(){
		var id=$(this).data("id");
		mui.confirm("你是否要删除该商品？","温馨提示",["确认","取消"],function(e){
				// e.index说明点了确定
			if(e.index===0){
				$.ajax({
					url:"/cart/deleteCart",
					type:"get",
					data:{
						// 要求参数id传的是一个数组
						id:[id]
					},
					success:function(info){
						if(info.success){
							// 删除成功之后调用一次下拉刷新，重新渲染页面
							mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
						}
					}
				});
			}
		});
	});	
	// 修改编辑功能
	$("#productList").on("tap",".btn_edit",function(){
		// $(this.dataset) 以数组的形式获取该元素的所有自定义属性
		// 获取购物车id
		var id=this.dataset.id;
		// 引擎模版，生成弹出模态框页面的标签字符串(将换行的\n自动改成了br换行)
		var htmlStr=template("editTpl",this.dataset);
		// 正则匹配将\n去掉
		htmlStr=htmlStr.replace(/\n/g,"");
		// 弹出模态框，顺道生成模态框的标签
		mui.confirm(htmlStr,"编辑商品",["确认","取消"],function(e){
			if(e.index===0){
				// 点确认时，获取模态框修改之后的尺码和数量
				var size=$(".lt_size span.current").text();
				var num=$('.lt_num .mui-numbox-input').val();
				$.ajax({
					url:"/cart/updateCart",
					type:"post",
					data:{
						id:id,
						size:size,
						num:num
					},
					success:function(info){
						if(info.success){
							// 修改成功后调用下拉刷新按钮，重新渲染页面
							mui(".mui-scroll-wrapper").pullRefresh().pulldownLoading();
						}
					}
				});
			}
		});
		// input数字输入框进行初始化
		 mui('.mui-numbox').numbox();
	});
	// 选择尺码注册点击事件
	$("body").on("tap",".lt_size span",function(){
		$(this).addClass("current").siblings().removeClass("current");
	});

});