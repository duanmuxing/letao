$(function(){
	var currentPage=1;
	var pageSize=5;

	render();
	// 渲染函数
	function render(){
		$.ajax({
			type:"get",
			url:"/category/querySecondCategoryPaging",
			data:{
				page:currentPage,
				pageSize:pageSize
			},
			success:function(info){
				console.log(info);
				$(".lt_content tbody").html( template("userTp2",info) );
				// 分页功能
				$("#paginator").bootstrapPaginator({
					bootstrapMajorVersion:3,
					currentPage:info.page,
					totalPages:Math.ceil(info.total/info.size),
					onPageClicked:function(a,b,c,page){
						currentPage=page,
						render();
					}
				});
			}
		});
	};

	// 添加
	$("#addBtn").click(function(){
		$("#addModal").modal("show");
		$.ajax({
			type:"get",
			url:"/category/queryTopCategoryPaging",
			data:{
				page:1,
				pageSize:100
			},
			success:function(info){
				$(".dropdown-menu").html( template("dropdownTpl",info) );
			}
		});
	});

	$(".dropdown-menu").on("click","a",function(){
		var txt=$(this).text();
		var id=$(this).data("id");
		$("#dropdownText").text(txt);
		$("[name='categoryId']").val(id);
		$("#form").data("bootstrapValidator").updateStatus("categoryId","VALID");
	});

	$("#fileupload").fileupload({
		dataType:"json",
		done:function(e,data){
			// console.log(data)
			var picAddr=data.result.picAddr;
			$("#imgBox img").attr("src",picAddr);
			$("[name=brandLogo]").val(picAddr);
			$("#form").data("bootstrapValidator").updateStatus("brandLogo","VALID");
		}
	})
	

	$("form").bootstrapValidator({
		excluded: [],
		feedbackIcons: {
	      valid: 'glyphicon glyphicon-ok',
	      invalid: 'glyphicon glyphicon-remove',
	      validating: 'glyphicon glyphicon-refresh'
	    },
	    fields:{
	    	brandName:{
	    		validators:{
	    			notEmpty:{
	    				message:"请输入二级分类名称"
	    			}
	    		}
	    	},
	    	categoryId:{
	    		validators:{
	    			notEmpty:{
	    				message:"请选择一级分类"
	    			}
	    		}
	    	},
	    	brandLogo:{
	    		validators:{
	    			notEmpty:{
	    				message:"请上传图片"
	    			}
	    		}
	    	}
	    }
	});

	$("#form").on("success.form.bv",function(e){
		e.preventDefault();
		console.log(1)
		$.ajax({
			type:'post',
			url:"/category/addSecondCategory",
			data:$("#form").serialize(),
			success:function(info){
				console.log(info)
				$("#addModal").modal("hide");
				$("#form").data("bootstrapValidator").resetForm(true);
				currentPage=1;
				render();
				$("#dropdownText").text("请选择一级分类");
				$("#imgBox img").attr("src","images/none.png")
			}
		});
	})

});