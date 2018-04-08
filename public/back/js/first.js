$(function(){
	var currentPage=1;
	var pageSize=5;
	render();
// 渲染函数封装
	function render(){
		$.ajax({
			type:"get",
			url:"/category/queryTopCategoryPaging",
			data:{
				page:currentPage,
				pageSize:pageSize,
			},
			success:function(info){
				// console.log(info)
				$(".lt_content tbody").html( template("userTp1",info) );
				$("#paginator").bootstrapPaginator({
					bootstrapMajorVersion:3,
					currentPage:info.page,
					totalPages:Math.ceil(info.total/info.size),
					onPageClicked:function(a,b,c,page){
						currentPage=page;
						render();
					}
				});
			}
		});
	}
	// 点击添加按钮，添加分类模态框显示
	$("#addBtn").click(function(){
		$("#addModal").modal("show");
	});
// 添加分类表单验证
	$("#form").bootstrapValidator({
		 // 配置图标
	   	feedbackIcons: {
	      valid: 'glyphicon glyphicon-ok',
	      invalid: 'glyphicon glyphicon-remove',
	      validating: 'glyphicon glyphicon-refresh'
	    },
	   	fields:{
	   		categoryName:{
	   			validators:{
	   				notEmpty:{
	   					message:"请输入一级分类名称"
	   				}
	   			}
	   		}
	   	}
	});

	// 添加分类
	$("#form").on("success.form.bv",function(e){
		// e.preventDefault();
		$.ajax({
			type:"post",
			url:'/category/addTopCategory',
			data:$("#form").serialize(),
			success:function(info){
				console.log(info);
				if(info.success){
					$("#addModal").modal("hide");
					render()
				}
			}
		});
	})

	// 分页



});

