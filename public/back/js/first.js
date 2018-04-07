$(function(){
	var currentPage=1;
	var pageSize=5;
	render();

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
				$(".lt_content tbody").html( template("userTp1",info) )
			}
		});
	}

	$("#addBtn").click(function(){
		$("#addModal").modal("show");
	});

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


	$("#form").on("success.form.bv",function(e){
	// e.preventDefault();
		$.ajax({
			type:"post",
			url:'/category/addTopCategory',
			data:$("#form").serialize(),
			success:function(info){
				console.log(111);

			}
		});
	})
});

