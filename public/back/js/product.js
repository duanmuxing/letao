$(function(){
	var currentPage=1;
	var pageSize=5;

	render();

	function render(){
		$.ajax({
			type:"get",
			url:"/product/queryProductDetailList",
			data:{
				page:currentPage,
				pageSize:pageSize
			},
			dataType:"json",
			success:function(info){
				// console.log(info);
				$(".lt_content tbody").html( template("tmp-product",info) );

				$("#paginator").bootstrapPaginator({
					bootstrapMajorVersion:3,
					page:currentPage,
					totalPages:Math.ceil(info.total/info.size),
					onPageClicked:function(a,b,c,page){
						currentPage=page;
						render();
					}
				});
			}
		});
	};


	$("#addBtn").click(function(){
		$("#addModal").modal("show");
	});
});