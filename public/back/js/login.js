// jquery入口函数，防止全局变量污染，等dom渲染完再执行
$(function(){
	// 进行表单验证
	// 要求：
	//   	1、用户名不能为空，且长度为6到12位
	// 		2、密码不能为空，且长度为6到12位
	$("#form").bootstrapValidator({
		// 配置图标(即表单后面的对号或者叉)，可配可不配
		feedbackIcons: {
		    valid: 'glyphicon glyphicon-ok',
		    invalid: 'glyphicon glyphicon-remove',
		    validating: 'glyphicon glyphicon-refresh'
		 },
		 // 对字段进行校验
		 fields:{
		 	// 校验用户名
		 	username:{
		 		// 校验规则
		 		validators:{
		 			// 非空校验
		 			notEmpty:{
		 				// 为空时的提示信息
		 				message:"用户名不能为空",
			 		},
			 		// 长度校验要求
			 		stringLength:{
			 			min:2,
			 			max:6,
			 			message:"用户名长度必须在6到12之间"
			 		},
			 		// ajax请求之后，如果后台验证用户名不存在时的返回信息
			 		callback:{
			 			message:"用户名不存在"
			 		}
		 		}
		 	},
		 	// 密码校验
		 	password:{
		 		// 校验规则
		 		validators:{
		 			// 密码非空校验
		 			notEmpty:{
		 				// 为空时的提示信息
			 			message:"密码不能为空"
			 		},
			 		// 长度校验要求
			 		stringLength:{
			 			min:6,
			 			max:12,
			 			message:"密码长度必须为6到12位"
			 		},
			 		// ajax请求之后，后台如果返回密码不正确时的提示信息
			 		callback:{
			 			message:"密码错误"
			 		}
		 		}
		 	}
		 }
	});

	// 通过ajax进行登录请求
	// 表单校验插件的特点：在表单提交的时候进行校验
	// 如果校验成功，继续提交，需要阻止这次默认的提交，通过ajax请求进行提交
	// 如果校验失败，阻止默认的提交

	$("#form").on("success.form.bv",function(e){
		e.preventDefault();
		$.ajax({
			type:"post",
			url:"/employee/employeeLogin",
			data:$("#form").serialize(),
			dataType:"json",
			success:function(info){
				console.log(info);
				//error 1000 用户名错误  1001 密码错误
				if(info.success){
					// 登录成功
					location.href="index.html";
				}
				if(info.error===1000){
					// 用户名不存在，用bootstrapValidator插件的方法，设置提示文本
					$("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback");
				}
				if(info.error===1001){
					// 密码错误
					// updateStatus：方法
					// 参数1：字段名称(校验的字段)
					// 参数2：校验状态(全部大写)：NOT_VALIDATED(未校验) VALIDATING(较严重) INVALID(校验失败) VALID(校验有效)
					$("#form").data("bootstrapValidator").updateStatus("password","INVALID","callback");
				}
			}
		})
	});



	// 重置功能

	$("[type='reset']").click(function(){
		$("#form").data("bootstrapValidator").resetForm();
	});

});