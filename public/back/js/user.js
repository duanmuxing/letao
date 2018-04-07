$(function(){
	var currentPage=1;
	var pageSize=5;

	render();

	function render(){
		$.ajax({
			type:'get',
			url:'/user/queryUser',
			data:{
				page:currentPage,
				pageSize:pageSize
			},
			success:function(info){
				// console.log(info);
				$(".lt_content tbody").html( template("tpl",info) );
				// 分页
				$("#paginator").bootstrapPaginator({
					// 配置分页插件的版本号
					bootstrapMajorVersion:3,
					// 当前页码
					currentPage:info.page,
					// 总页数
					totalPages:Math.ceil(info.total/info.size),
					// 页码的点击事件，
					onPageClicked:function(a,b,c,page){
						// page是页码的点击事件传进来的参数
						currentPage=page;
						render()
					}
				})
			}
		});
	}

	$(".lt_content tbody").on("click",".btn",function(){
		$("#userModal").modal("show");

		var id=$(this).parent().data("id");
		var isDelete=$(this).hasClass("btn-success")?1:0;
			console.log(id)
			console.log(isDelete)
		$("#submitBtn").off("click").on("click",function(){
			$.ajax({
				type:"post",
				url:"/user/updateUser",
				data:{
					id:id,
					isDelete:isDelete
				},
				dataType:'json',
				success:function(info){
					// console.log(info);
					if(info.success){
						$("#userModal").modal("hide");
						render()
					}
				}
			})
		});
	})
});