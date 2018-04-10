$(function(){
	var key=getSearch("key");
	$(".lt_search input").val(key);
	render();

	$(".lt_search button").click(function(){
		render();

		var key=$(".lt_search input").val();
		var history=localStorage.getItem("search_list") || "[]";
		var arr=JSON.parse(history);
		var index=arr.indexOf(key);
	
		if(index!==-1){
			arr.splice(index,1);
		}
		if(arr.length>=10){
			arr.pop();
		}
		arr.unshift(key);
		localStorage.setItem("search_list",JSON.stringify(arr));
	});

	$(".lt_sort a[data-type]").click(function(){
		if($(this).hasClass("current")){
			$(this).find("i").toggleClass("fa-angle-down").toggleClass("fa-angle-up");
		}else{
			$(this).addClass("current").siblings().removeClass("current");
			$(".lt_sort a[data-type]").find("i").removeClass("fa-angle-up").addClass("fa-angle-down");
		}
		render();
	});

	function render(){
		var params={};
		params.proName=$(".lt_search input").val();
		params.page=1;
		params.pageSize=100;
		var $current=$(".lt_sort .current");

		if($current.length>0){
			var sortName=$current.data("type");
			var sortValue=$current.find("i").hasClass("fa-angle-down")?2:1;
			params[sortName]=sortValue;
		}
		$.ajax({
			url:"/product/queryProduct",
			type:'get',
			data:params,
			success:function(info){
				// console.log(info)
				$(".lt_product").html(template("productTpl",info))
			}
		});
	}
});