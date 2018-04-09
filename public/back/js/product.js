$(function(){
	var currentPage=1;
	var pageSize=5;	
	var picArr=[];

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
					},
					// 配置按钮的大小
					size:"normal",
					// 每个按钮都会调用一次这个方法，返回值就是按钮的文本内容
					itemTexts:function(type,page,current){
						// first 首页 last 尾页 prev上一页 next下一页 page普通页码
						// page是当前按钮指向第几页
						// current是指当前是第几页(相对于整个分页来说的)
						switch(type){
							case "first":
								return "首页";
							case "last":
								return "尾页";
							case "prev":
								return "上一页";
							case "next":
								return "下一页";
							case "page":
								return page;
						}
					},
					// 配置提示框的信息(鼠标悬停时的提示文本内容)
					tooltipTitles:function(type,page,current){
						switch( type ) {
			              case "first":
			                return "首页";
			              case "last":
			                return "尾页";
			              case "prev":
			                return "上一页";
			              case "next":
			                return "下一页";
			              case "page":
			                return "前往第" + page + "页";
			            }
					},
					// 使用bootstrap样式的提示组件
					useBootstrapTooltip: true
				});
			}
		});
	};

	// 不要在事件处理函数中注册事件，否则会重复注册事件

	$("#addBtn").click(function(){
		$("#addModal").modal("show");

		$.ajax({
			url:"/category/querySecondCategoryPaging",
			type:"get",
			data:{
				page:1,
				pageSize:100
			},
			success:function(info){
				console.log(info)
				$(".dropdown-menu").html(template("tmp-dropdown",info))
			}
		});
	});


	$(".dropdown-menu").on("click","a",function(){
		var txt=$(this).text();
		var id=$(this).data("id");

		$("#dropdownText").text(txt);
		$("[name=categoryId]").val(id);
		$("#form").data("bootstrapValidator").updateStatus("brandId","VALID");
	});


	$("#fileupload").fileupload({
		dataType:"json",
		done:function(e,data){
			var picObj=data.result;
			var picAddr=picObj.picAddr;
			picArr.unshift(picObj);

			$("#imgBox").prepend('<img src="'+picAddr+'"width="100">');

			if(picArr.length>3){
				picArr.pop();
				$("#imgBox img:last-of-type").remove();
			}

			if(picArr.length==3){
				$("#form").data("bootstrapValidator").updateStatus("picStatus","VALID");
			}
		}
	});


	$("#form").bootstrapValidator({
		excluded: [],

   		// 配置图标
	    feedbackIcons: {
	      valid: 'glyphicon glyphicon-ok',
	      invalid: 'glyphicon glyphicon-remove',
	      validating: 'glyphicon glyphicon-refresh'
	    },

	    fields:{
	    	brandId:{
	    		validators:{
	    			notEmpty:{
	    				message:"请选择二级分类"
	    			}
	    		}
	    	},
	    	proName:{
	    		validators:{
	    			notEmpty:{
	    				message:"请输入商品名称"
	    			}
	    		}
	    	},
	    	proDesc:{
	    		validators:{
	    			notEmpty:{
	    				message:"请输入商品描述"
	    			}
	    		}
	    	},
	    	num:{
	    		validators:{
	    			notEmpty:{
	    				message:"请输入商品库存"
	    			},
	    			regexp:{
	    				regexp:/^[1-9]\d*$/,
	    				message:"商品库存必须是非零开头的数字"
	    			}
	    		}
	    	},
	    	size:{
	    		validators:{
	    			notEmpty:{
	    				message:"请输入商品尺码"
	    			},
	    			regexp:{
	    				regexp:/^[3-4]{2}-[3-4]{2}$/,
	    				message:"商品尺码格式必须是30-49"
	    			}
	    		}
	    	},
	    	price:{
	    		validators:{
	    			notEmpty:{
	    				message:"请输入商品价格"
	    			}
	    		}
	    	},
	    	oldPrice:{
	    		validators:{
	    			notEmpty:{
	    				message:"请输入商品原价"
	    			}
	    		}
	    	},
	    	picStatus:{
	    		validators:{
	    			notEmpty:{
	    				message:"请上传三张图片"
	    			}
	    		}
	    	}
	    }
	});


	$("#form").on("success.form.bv",function(e){
		e.preventDefault();
		var params=$("#form").serialize();
		// 拼接字符串，将上传的图片的信息拼接起来发送到服务器
		params+="&picName1="+picArr[0].picName+"&picAddr1="+picArr[0].picAddr;
		params+="&picName1="+picArr[1].picName+"&picAddr1="+picArr[1].picAddr;
		params+="&picName1="+picArr[2].picName+"&picAddr1="+picArr[2].picAddr;

		$.ajax({
			type:"post",
			url:"/product/addProduct",
			data:params,
			success:function(info){
				console.log(info)

				if(info.success){
					$("#addModal").modal("hide");
					$("#form").data("bootstrapValidator").resetForm(true);
					$("#dropdownText").text("请选择二级分类");
					$("#imgBox img").remove();
					picArr=[];
				}
			}
		});
	})
});