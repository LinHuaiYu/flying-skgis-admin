$.validator.setDefaults({
	submitHandler : function() {
		update();
	}
});

/* ztree设置参数 */
var setting = {
	data : {
		simpleData : {
			enable : true,
			idKey : "deptId",
			pIdKey : "parentId",
			rootPId : -1
		},
		key : {
			url : "nourl"
		}
	}
};

var ztree,deptId;

$(function() {
	formValidate();
	deptTree();
	parentSelectEvent();
	initData();
});

function initData(){
	//获取url传递的参数id
	deptId = getQueryString('deptId');
	$.get("./dept/info/"+deptId, function(r){
		r = JSON.parse(r);
		$("#id").val(deptId);
		$("#name").val(r.dept.name);
		$("#parentId").val(r.dept.parentId);
		$("#parentName").val(r.dept.parentName);
		$("#orderNum").val(r.dept.orderNum);
    });
}

//表单验证
function formValidate() {
	$("#myForm").validate({
		rules : {
			id:"required",
			name : "required",
			parentName : "required",
			orderNum:'required'
		},
		messages : {
			id:"请填写区域编号",
			name : "请填写区域名称",
			parentName : "请选择上级区域",
			orderNum:'请选择排序'
		}
	});
}

function update(){
	//url
	var url = "./dept/update";
	//参数
	var param = {
		deptId:$("#id").val(),
		name:$("#name").val(),
		parentId:$("#parentId").val(),
		orderNum:$("#orderNum").val()
	};
	$.ajax({
		type : "POST",
		url : url,
		cache : false,
		dataType : "json",
		contentType : "application/json",
		data : JSON.stringify(param),
		success : function(r) {
			if (r.code === 0) {
				alert('操作成功',function(index){
					//刷新父页面
					window.parent.location.reload();
					layer_close();
				});
			} else {
				alert(r.msg);
			}
		}
	});
}

//树形菜单加载
function deptTree(){
	// 加载菜单树
	$.get("./dept/select", function(r) {
		var r = JSON.parse(r);
		ztree = $.fn.zTree.init($("#deptTree"), setting, r.deptList);
	})
}

function parentSelectEvent() {
	$('input[name=parentName]').click(function() {
		layer.open({
			type : 1,
			offset : '50px',
			title : "选择菜单",
			area : [ '300px', '300px' ],
			shade : 0,
			shadeClose : false,
			content : jQuery("#deptLayer"),
			btn : [ '确定', '取消' ],
			btn1 : function(index) {
				var node = ztree.getSelectedNodes();
				$("input[name='parentId']").val(node[0].deptId);
				$("input[name='parentName']").val(node[0].name);
				layer.close(index);
			}
		});
	});
}