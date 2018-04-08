// 配置公共的进度条
$(function(){
	// 进度条右边的旋转的小圆圈：showSpinner值是false表示禁止，也就是不显示小圆圈，true表示显示小圆圈
	NProgress.configure({showSpinner:false});

	// ajaxStart:页面中的第一个ajax请求开始时执行
	// ajaxStop:页面中的最后一个ajax请求结束之后开始执行
	$(document).ajaxStart(function(){
		NProgress.start();
	});
	$(document).ajaxStop(function(){
		setTimeout(function(){
			NProgress.done();
		},500)
	});
});

	if(location.href.indexOf("login.html")===-1){
		$.ajax({
			type:'get',
			url:"/employee/checkRootLogin",
			dataType:'json',
			success:function(info){
				if(info.success){
					// console.log(info)
					// 登录成功
					// console.log("登录成功")
				}
				if(info.error===400){
					location.href="login.html";
				}
			}
		});
	}
// 侧边栏二级分类切换功能，顶部菜单栏切换显示功能，点击退出按钮模态框显示，退出按钮注册事件
$(function(){
	// 侧边栏二级菜单显示和隐藏切换
	$(".category").click(function(){
		$(".child").stop().slideToggle()
		// alert(1)
	});

	// 顶部菜单栏切换显示功能

	$(".icon_menu").click(function(){
		// alert(1)
		$(".lt_aside").toggleClass("hidemenu");
		$(".lt_main").toggleClass("hidemenu");
		$(".lt_topbar").toggleClass("hidemenu");
	});

	// 点击退出按钮，模态框显示
	$(".icon_logout").click(function(){
		// alert(1)
		$("#logoutModal").modal("show")
	});

	$("#logoutBtn").click(function(){
		// alert(1)
		$.ajax({
			type:"get",
			url:"/employee/employeeLogout",
			dataType:'json',
			success:function(info){
				// console.log(info);
				if(info.success){
					location.href="login.html";
				}
			}
		})
	})
});

$(function(){
	if(location.href.indexOf("login.html")===-1){
		$.ajax({
			type:'get',
			url:"/employee/checkRootLogin",
			dataType:'json',
			success:function(info){
				if(info.success){
					// 登录成功
					console.log("登录成功")
				}
				if(info.error===400){
					location.href="login.html";
				}
			}
		});
	}
});

