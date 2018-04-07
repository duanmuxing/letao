// 数据可视化
$(function(){

		// 基于准备好的dom，初始化echarts实例，dom对象需要具有宽高！
	  var echarts_1 = echarts.init(document.querySelector('.echarts_1'));
	  console.log(echarts_1)
	  var option = {
	  		// 大标题
            title: {
                text: '2017年注册人数'
            },
            // 提示框组件(鼠标悬停柱状图上时显示的文本)
            tooltip: {},
            // 图利(柱状图的上面的提示)
            legend: {
                data:['人数']
            },
            // x轴数据
            xAxis: {
                data: ["一月","二月","三月","四月","五月","六月"]
            },
            // y轴数据
            yAxis: {},
            series: [{
                name: '销量',
                type: 'bar',
                data: [1000, 1500,2000, 1200, 600, 1800]
            }]
        };

         echarts_1.setOption(option);

          var echarts_2 = echarts.init(document.querySelector('.echarts_2'));

          option = {
			    title : {
			    	// 大标题
			        text: '热门品牌销售',
			        // 子标题
			        subtext: '2017年6月',
			        // 标题居中(left:居左，right：居右)
			        x:'center'
			    },
			    // 提示信息
			    tooltip : {
			        trigger: 'item',
			        formatter: "{a} <br/>{b} : {c} ({d}%)"
			    },
			    // 图利
			    legend: {
			    	// 图利的排列方式
			        orient: 'vertical',
			        // 居左显示
			        left: 'left',
			        // 图例内容
			        data: ['耐克','阿迪','李宁','新百伦','阿迪王']
			    },
			    series : [
			        {
			            name: '品牌',
			            // 饼状图
			            type: 'pie',
			            // 圆的大小
			            radius : '55%',
			            // 圆心的位置
			            center: ['50%', '60%'],
			            data:[
			                {value:335, name:'耐克'},
			                {value:310, name:'阿迪'},
			                {value:234, name:'李宁'},
			                {value:135, name:'新百伦'},
			                {value:1548, name:'阿迪王'}
			            ],
			    // 设置阴影效果
	            itemStyle: {
	                emphasis: {
	                    shadowBlur: 10,
	                    shadowOffsetX: 0,
	                    shadowColor: 'rgba(0, 0, 0, 0.5)'
               	 }
           		 	}
       			 }
   		 		]
		};
 	echarts_2.setOption(option);
});