var Dept = {
    id: "deptTable",
    table: null,
    layerIndex: -1
};

/**
 * 初始化表格的列
 */
Dept.initColumn = function () {
    var columns = [
        {field: 'selectItem', radio: true},
        {title: '地区编号', field: 'deptId', visible: false, align: 'center', valign: 'middle', width: '80px'},
        {title: '地区名称', field: 'name', align: 'center', valign: 'middle', sortable: true, width: '180px'},
        {title: '排序号', field: 'orderNum', align: 'center', valign: 'middle', sortable: true, width: '100px'}]
    return columns;
};

$(function () {
    $.get( "../sys/dept/info", function(r){
        var colunms = Dept.initColumn();
        var table = new TreeTable(Dept.id,  "../sys/dept/list", colunms);
        table.setRootCodeValue(r.deptId);
        table.setExpandColumn(2);
        table.setIdField("deptId");
        table.setCodeField("deptId");
        table.setParentCodeField("parentId");
        table.setExpandAll(false);
        table.init();
        Dept.table = table;
    });
});

//添加
function openAddWin(){
	openWin(600,600,'添加区域','./dept-add.html')
}

function openUpdateWin(){
	var deptId = getOneTreeGridId("deptTable");
	if(deptId == false){
		return ;
	}
	openWin(600,600,'修改区域','./dept-upd.html?deptId='+deptId);
}

function delFun(){
	var deptId = getOneTreeGridId("deptTable");
	if(deptId == false){
		return ;
	}
	confirm('确定要删除选中的记录？', function(){
        $.ajax({
            type: "POST",
            url:  "./dept/delete",
            cache : false,
    		dataType : "json",
            data: {
            	deptId:deptId
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

