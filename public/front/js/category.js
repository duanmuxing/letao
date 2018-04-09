$(function(){

	$.ajax({
		type:"get",
		url:"/category/queryTopCategory",
		success:function(info){
			$(".category_left ul").html(template("left_tpl",info))

			render(info.rows[0].id)
		}
	});


	$(".category_left ul").on("click","a",function(){
		var id=$(this).data("id");
		render(id)
	});

	function render(id){
		$.ajax({
			type:"get",
			url:"/category/querySecondCategory",
			data:{id:id},
			success:function(info){
				$(".category_right ul").html(template("right_tpl",info))
			}
		});
	}
});