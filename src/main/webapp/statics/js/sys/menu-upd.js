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
			idKey : "menuId",
			pIdKey : "parentId",
			rootPId : -1
		},
		key : {
			url : "nourl"
		}
	}
};

var ztree,menuId;

$(function() {
	formValidate();
	deptTree();
	parentSelectEvent();
	initData();
});

function initData(){
	//获取url传递的参数id
	menuId = getQueryString('menuId');
	$.get("./menu/info/"+menuId, function(r){
		r = JSON.parse(r);
		$("input:radio[name=type][value="+r.menu.type+"]").attr("checked","checked");
		$("input[name=name]").val(r.menu.name);
		$("input[name=parentId]").val(r.menu.parentId);
		$("input[name=url]").val(r.menu.url);
		$("input[name=perms]").val(r.menu.perms);
		$("input[name=orderNum]").val(r.menu.orderNum);
    });
}

//表单验证
function formValidate() {
	$("#myForm").validate({
		rules : {
			name : "required",
			parentName : "required",
			orderNum:'required'
		},
		messages : {
			name : "请填写菜单名称",
			parentName : "请选择上级菜单",
			orderNum:'请选择排序'
		}
	});
}

function update(){
	//url
	var url = "./menu/update";
	//参数
	var param = {
		menuId:menuId,
		type:$("input[name=type]:checked").val(),
		name:$("input[name=name]").val(),
		parentId:$("input[name=parentId]").val(),
		url:$("input[name=url]").val(),
		perms:$("input[name=perms]").val(),
		orderNum:$("input[name=orderNum]").val()
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
				alert('操作成功');
				//刷新父页面
				window.parent.location.reload();
				layer_close();
			} else {
				alert(r.msg);
			}
		}
	});
}

//树形菜单加载
function deptTree(){
	// 加载菜单树
	$.get("./menu/select", function(r) {
		var r = JSON.parse(r);
		ztree = $.fn.zTree.init($("#menuTree"), setting, r.menuList);
	})
}

function parentSelectEvent() {
	$('input[name=parentName]').click(function() {
		layer.open({
			type : 1,
			offset : '50px',
			title : "选择菜单",
			area : [ '400px', '400px' ],
			shade : 0,
			shadeClose : false,
			content : jQuery("#menuLayer"),
			btn : [ '确定', '取消' ],
			btn1 : function(index) {
				var node = ztree.getSelectedNodes();
				$("input[name='parentId']").val(node[0].menuId);
				$("input[name='parentName']").val(node[0].name);
				layer.close(index);
			}
		});
	});
}