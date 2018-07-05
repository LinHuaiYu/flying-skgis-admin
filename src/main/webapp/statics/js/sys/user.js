$(function() {
	// grid自适应宽度
	$(window).resize(function() {
		$("#jqGrid").setGridWidth($(window).width());
	});
	// 初始化grid
	initGrid();
});

// 初始化表单数据
function initGrid() {
	$("#jqGrid").jqGrid({
		url : '../sys/user/list',
		datatype : "json",
		mtype : 'POST',
		styleUI : 'Bootstrap',
		colModel : [ {
			label : 'userId',
			name : 'userId',
			index : 'user_id',
			width : 50,
			key : true
		}, {
			label : '用户名',
			name : 'username',
			index : 'username',
			width : 80
		}, {
			label : '邮箱',
			name : 'email',
			index : 'email',
			width : 80
		}, {
			label : '手机号',
			name : 'mobile',
			index : 'mobile',
			width : 80
		}, {
			label : '状态',
			name : 'status',
			index : 'status',
			width : 80,
			formatter: function(value, options, row){
				return value === 0 ? 
					'<span class="label label-danger">禁用</span>' : 
					'<span class="label label-success">正常</span>';
			}
		}, {
			label : '创建时间',
			name : 'createTime',
			index : 'create_time',
			width : 80
		} ],
		viewrecords : true,
		height : 385,
		rowNum : 10,
		rowList : [ 10, 30, 50 ],
		rownumbers : true,
		rownumWidth : 25,
		autowidth : true,
		multiselect : true,
		pager : "#jqGridPager",
		jsonReader : {
			root : "page.list",
			page : "page.currPage",
			total : "page.totalPage",
			records : "page.totalCount"
		},
		prmNames : {
			page : "page",
			rows : "limit",
			order : "order"
		},
		gridComplete : function() {
			// 隐藏grid底部滚动条
			$("#jqGrid").closest(".ui-jqgrid-bdiv").css({
				"overflow-x" : "hidden"
			});
		}
	});
}
