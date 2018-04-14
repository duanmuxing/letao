$(function(){
	var productId=getSearch("productId");
	$.ajax({
		url:"/product/queryProductDetail",
		type:"get",
		data:{id:productId},
		success:function(info){
			console.log(info);
			$(".mui-scroll").html(template("productTpl",info))
			 var gallery = mui('.mui-slider');
     			 gallery.slider({
        		interval: 1000//自动轮播周期，若为0则不自动播放，默认为0；
     		});

     		mui('.mui-numbox').numbox();
		}
	});


	// 选择尺码的功能
	$(".lt_main").on("click",".lt_size span",function(){
		$(this).addClass("current").siblings().removeClass("current");
	});

	// 加入购物车功能
	// 按钮注册点击事件
	// 获取尺码和数量
	// 发送ajax请求，判断是否登录，登录跳，没登录，跳转到登录页
	$(".add_cart").click(function(){
		var size=$(".lt_size span.current").text();
		var num=$(".mui-numbox-input").val();
		if(!size){
			mui.toast("请选择尺码");
			return;
		}
		$.ajax({
			url:"/cart/addCart",
			type:'post',
			data:{
				productId:productId,
				num:num,
				size:size
			},
			success:function(info){
				console.log(info);
				if(info.success){
					mui.confirm("添加成功","温馨提示",["去购物车","继续浏览"],function(e){
						if(e.index===0){
							location.href="cart.html"
						}
					})
				}
				if(info.error===400){
					// 记录当前页面，登录后还要跳回来
					location.href="login.html?retUrl="+location.href;
				}
			}
		});
	});
});