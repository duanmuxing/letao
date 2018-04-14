$(function(){
	$.ajax({
		url: "/user/queryUserMessage",
    	type: "get",
    	success:function(info){
    		if(info.error){
    			location.href="login.html";
    			return;
    		}
    		 $('#userInfo').html( template( "userTpl", info ) );
    	}
	});

	$("#logoutBtn").click(function(){
		$.ajax({
			url: "/user/logout",
      		type: "get",
      		success:function(info){
      			if(info.success){
      				location.href="login.html"
      			}
      		}
		});
	})
});