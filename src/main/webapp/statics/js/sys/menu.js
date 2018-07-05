var Menu = {
	id : "menuTable",
	table : null,
	layerIndex : -1
};
/**
 * 初始化表格的列
 */
Menu.initColumn = function() {
	var columns = [ {
		field : 'selectItem',
		radio : true
	}, {
		title : '菜单ID',
		field : 'menuId',
		visible : false,
		align : 'center',
		valign : 'middle',
		width : '80px'
	}, {
		title : '菜单名称',
		field : 'name',
		align : 'center',
		valign : 'middle',
		sortable : true,
		width : '180px'
	}, {
		title : '上级菜单',
		field : 'parentName',
		align : 'center',
		valign : 'middle',
		sortable : true,
		width : '100px',
		formatter : function(item, index) {
			return item.parentName == null ? '' : item.parentName;
		}
	}, {
		title : '类型',
		field : 'type',
		align : 'center',
		valign : 'middle',
		sortable : true,
		width : '100px',
		formatter : function(item, index) {
			if (item.type === 0) {
				return '<span class="label label-primary">目录</span>';
			}
			if (item.type === 1) {
				return '<span class="label label-success">菜单</span>';
			}
			if (item.type === 2) {
				return '<span class="label label-warning">按钮</span>';
			}
		}
	}, {
		title : '排序号',
		field : 'orderNum',
		align : 'center',
		valign : 'middle',
		sortable : true,
		width : '100px'
	}, {
		title : '菜单URL',
		field : 'url',
		align : 'center',
		valign : 'middle',
		sortable : true,
		width : '160px',
		formatter : function(item, index) {
			return item.url == null ? '' : item.url;
		}
	}, {
		title : '授权标识',
		field : 'perms',
		align : 'center',
		valign : 'middle',
		sortable : true,
		formatter : function(item, index) {
			return item.perms == null ? '' : item.perms;
		}
	}]
	return columns;
};
$(function() {
	//初始化表格
	var colunms = Menu.initColumn();
	var table = new TreeTable(Menu.id, "../sys/menu/treelist", colunms);
	table.setExpandColumn(2);
	table.setIdField("menuId");
	table.setCodeField("menuId");
	table.setParentCodeField("parentId");
	table.setExpandAll(false);
	table.init();
	Menu.table = table;
});

//添加
function openAddWin(){
	openWin(600,600,'添加菜单','./menu-add.html')
}

//更新
function openUpdateWin(){
	var deptId = getOneTreeGridId("menuTable");
	if(deptId == false){
		return ;
	}
	openWin(600,600,'修改菜单','./menu-upd.html?deptId='+deptId);
}

//删除
function delFun(){
	var menuId = getOneTreeGridId("menuTable");
	if(menuId == false){
		return ;
	}
	confirm('确定要删除选中的记录？', function(){
        $.ajax({
            type: "POST",
            url:  "./dept/delete",
            cache : false,
    		dataType : "json",
            data: {
            	menuId:menuId
            },
            success: function(r){
                if(r.code === 0){
                    alert('操作成功', function(){
                    	Dept.table.refresh();
                    });
                }else{
                    alert(r.msg);
                }
            }
        });
    });
}