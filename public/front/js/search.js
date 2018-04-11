$(function(){
	// 进行本地存储操作操作，获取本地存储的内容
	// 约定以search_list为键名

	// 功能1：渲染搜索历史记录
	// 1、读取本地历史记录里的数组
	// 2、结合模版进行渲染

	// 一进入页面就先进行渲染操作
	render();

	// 封装方法，专门用于读取本地存储中的历史记录的数组
	function getHistory(){
		// 获取本地存储的search_list数组，并且确保获取的一定是数组，同时防止本地存储数据不存在
		var history=localStorage.getItem("search_list")|| "[]";
		// 获取的是json字符串，解码
		var arr=JSON.parse(history);
		// 返回数组
		return arr;
	}

	// 封装渲染函数，专门用于页面渲染
	function render(){
		// 获取到本地存储的数组，进行渲染，如果没有获取到数据，就不渲染
		var arr=getHistory();
		$(".lt_history").html(template("searchTp1",{arr:arr}))
	}

	// 删除功能：删除本地存储数组里的一项
	// 1、给所有的删除按钮添加事件委托
	// 2、获取索引
	// 3、读取本地存储的数组，删除对应索引的项
	// 4、同步到本地存储
	// 5、重新渲染也页面
	$(".lt_history").on("click",".btn-delete",function(){
		// this在下面的方法中的指向被改变，这里记录一下
		var that=this;
		// 弹出确认删除的模态框
		// 弹出的确认删除模态框，参数分为为，提示内容、标题、选项、回调函数
		mui.confirm("你确定要删除么？","温馨提示",["确认","取消"],function(e){
			// console.log(e)
			// 打印出来的e.index的值都为0，
			if(e.index===0){
				// 获取被点的删除按钮的自定义属性，即获取被点的索引
				var index=$(that).data("index");
				// 读取本地存储的数组
				var arr=getHistory();
				// 删除被点的索引
				arr.splice(index,1);
				// 将删除之后的数组重新持久化到本地存储
				localStorage.setItem("search_list",JSON.stringify(arr));
				// 重新渲染页面
				render()
			}
		})
	})

	// 清空功能
	// 1、注册事件，事件委托
	// 2、清除本地存储的search_list
	// 3、页面重新渲染
	$(".lt_history").on("click",".btn-empty",function(){
		// 弹出确认模态框
		mui.confirm("是否清空所有历史记录？","温馨提示",["确认","取消"],function(e){
			if(e.index===0){
				// 清空本地存储的数组
				localStorage.removeItem("search_list");
				// 重新渲染页面
				render();
			}
		})
	})

	// 添加功能
	// 1、点击搜索框按钮，获取输入框里的值
	// 2、获取本地存储的数组
	// 3、将输入框的值添加到数组的最前面
	// 4、数据持久化到本地存储中，修改search_list
	// 5、重新渲染页面

	// 注册搜索点击事件
	$(".lt_search button").click(function(){
		// 获取搜索输入框的value值
		var key=$(".lt_search input").val().trim();
		// 判断value值是否为空，如果为空，弹出提示框，并返回
		if(key===""){
			mui.toast("请输入搜索关键字");
			return;
		}
		// 获取本地存储
		var arr=getHistory();
		// 查询本地存储的数组中是否已经存在了输入框里的value值，如果已经存在，删除
		if(arr.indexOf(key)!==-1){
			var index=arr.indexOf(key);
			arr.splice(index,1);
		}
		// 限制数组的长度为10，超出的话，删除最后一项
		if(arr.length>=10){
			arr.pop();
		}
		// 将输入框的value值添加到数组中
		arr.unshift(key);
		// 将更新之后的数组持久化到本地存储
		localStorage.setItem("search_list",JSON.stringify(arr));
		// 重新渲染页面
		render();
		// 页面要跳转，清空输入框
		$(".lt_search input").val("");
		// 跳转的时候地址后面拼接上输入框的value值，跳转的页面请求服务器渲染数据时使用
		location.href="searchList.html?key="+key;
	});
});

// $(function(){
// 	// 进行本地存储操作操作，获取本地存储的内容
// 	// 约定以search_list为键名
// 	render();
// 	function getHistory(){
// 		var history=localStorage.getItem("search_list")||"[]";
// 		var arr=JSON.parse(history);
// 		return arr;
// 	}
// 	// 功能1：渲染搜索历史记录
// 	// 1、读取本地历史记录里的数组
// 	// 2、结合模版进行渲染
// 	// 一进入页面就先进行渲染操作
// 	// 封装方法，专门用于读取本地存储中的历史记录的数组
// 	// 封装渲染函数，专门用于页面渲染
// 	function render(){
// 		var arr=getHistory();
// 		$(".lt_history").html(template("searchTp1",{arr:arr}))
// 	};
// 	// 删除功能：删除本地存储数组里的一项
// 	// 1、给所有的删除按钮添加事件委托
// 	// 2、获取索引
// 	// 3、读取本地存储的数组，删除对应索引的项
// 	// 4、同步到本地存储
// 	// 5、重新渲染也页面
// 	$(".lt_history").on("click",".btn-delete",function(){
// 		var that=this;
// 		mui.confirm("你确定要删除么？","温馨提示",["确认","取消"],function(e){
// 			if(e.index===0){
// 				var index=$(that).data("index");
// 				var arr=getHistory();
// 				arr.splice(index,1);
// 				localStorage.setItem("search_list",JSON.stringify(arr));
// 				render();
// 			}
// 		});
		
// 	});
// 	// 清空功能
// 	// 1、注册事件，事件委托
// 	// 2、清除本地存储的search_list
// 	// 3、页面重新渲染
// 	$(".lt_history").on("click",".btn-empty",function(){
// 		// alert(1)
// 		mui.confirm("你确定要清空历史记录吗？","温馨提示",["确认","取消"],function(e){
// 			if(e.index===0){
// 				localStorage.removeItem("search_list");
// 				render();
// 			}
// 		});
// 	})
// 	// 添加功能
// 	// 1、点击搜索框按钮，获取输入框里的值
// 	// 2、获取本地存储的数组
// 	// 3、将输入框的值添加到数组的最前面
// 	// 4、数据持久化到本地存储中，修改search_list
// 	// 5、重新渲染页面

// 	// 注册搜索点击事件
// 	$(".lt_search button").click(function(){
// 		var key=$(".lt_search input").val().trim();
// 		if(key==""){
// 			mui.toast("请输入搜索关键字");
// 			return;
// 		}
// 		var arr=getHistory();
// 		if(arr.indexOf(key)!==-1){
// 			arr.splice(arr.indexOf(key),1);
// 		}
// 		if(arr.length>=10){
// 			arr.pop();
// 		}
// 		arr.unshift(key);
// 		localStorage.setItem("search_list",JSON.stringify(arr))
// 		render()
// 		$(".lt_search input").val("");
// 		location.href="searchList.html?key="+key;
// 	});
// });