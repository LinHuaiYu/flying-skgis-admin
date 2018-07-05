/*$(function () {
    $("#jqGrid").jqGrid({
        url: '../sys/menu/list',
        datatype: "json",
        colModel: [			
			{ label: '菜单ID', name: 'menuId', index: "menu_id", width: 40, key: true },
			{ label: '菜单名称', name: 'name', width: 60 },
			{ label: '上级菜单', name: 'parentName', sortable: false, width: 60 },
			{ label: '菜单图标', name: 'icon', sortable: false, width: 50, formatter: function(value, options, row){
				return value == null ? '' : '<i class="'+value+' fa-lg"></i>';
			}},
			{ label: '菜单URL', name: 'url', width: 100 },
			{ label: '授权标识', name: 'perms', width: 100 },
			{ label: '类型', name: 'type', width: 50, formatter: function(value, options, row){
				if(value === 0){
					return '<span class="label label-primary">目录</span>';
				}
				if(value === 1){
					return '<span class="label label-success">菜单</span>';
				}
				if(value === 2){
					return '<span class="label label-warning">按钮</span>';
				}
			}},
			{ label: '排序号', name: 'orderNum', index: "order_num", width: 50}
        ],
		viewrecords: true,
        height: 385,
        rowNum: 10,
		rowList : [10,30,50],
        rownumbers: true, 
        rownumWidth: 25, 
        autowidth:true,
        multiselect: true,
        pager: "#jqGridPager",
        jsonReader : {
            root: "page.list",
            page: "page.currPage",
            total: "page.totalPage",
            records: "page.totalCount"
        },
        prmNames : {
            page:"page", 
            rows:"limit", 
            order: "order"
        },
        gridComplete:function(){
        	//隐藏grid底部滚动条
        	$("#jqGrid").closest(".ui-jqgrid-bdiv").css({ "overflow-x" : "hidden" }); 
        }
    });
});*/
var Grid = {
    id: "grid",
    table: null,
    layerIndex: -1
};
/**
 * 初始化表格的列
 */
Grid.initColumn = function () {
    var columns = [
        {field: 'selectItem', radio: true},
        {title: '菜单ID', field: 'menuId',  align: 'center', valign: 'middle', width: '40px'},
        {title: '菜单', field: 'name', align: 'center', valign: 'middle', sortable: true, width: '120px'},
        {title: '菜单图标', field: 'icon', align: 'center', valign: 'middle', sortable: true, width: '120px',formatter: function(item, index){
        	if(item.icon === 0){
				return '<span class="label label-primary">目录</span>';
			}
			if(item.icon === 1){
				return '<span class="label label-success">菜单</span>';
			}
			if(item.icon === 2){
				return '<span class="label label-warning">按钮</span>';
			}
        }},
        {title: '菜单URL', field: 'url', align: 'center', valign: 'middle', sortable: true, width: '80px'},
        {title: '授权标识', field: 'perms', align: 'center', valign: 'middle', sortable: true, width: '80px'},
        {title: '类型', field: 'type', align: 'center', valign: 'middle', sortable: true, width: '160px',formatter: function(item, index){
			if(item.type === 0){
				return '<span class="label label-primary">目录</span>';
			}
			if(item.type === 1){
				return '<span class="label label-success">菜单</span>';
			}
			if(item.type === 2){
				return '<span class="label label-warning">按钮</span>';
			}
        }},
        ]
    return columns;
};

$(function () {
    var colunms = Grid.initColumn();
    var table = new TreeTable(Grid.id, "../sys/menu/treelist", colunms);
    table.setExpandColumn(2);
    table.setIdField("menuId");
    table.setCodeField("menuId");
    table.setParentCodeField("parentId");
//    table.setExpandAll(true);
    table.init();
    Grid.table = table;
});

var setting = {
	data: {
		simpleData: {
			enable: true,
			idKey: "menuId",
			pIdKey: "parentId",
			rootPId: -1
		},
		key: {
			url:"nourl"
		}
	}
};
var ztree;

var vm = new Vue({
	el:'#rrapp',
	data:{
		showList: true,
		title: null,
		menu:{
			parentName:null,
			parentId:0,
			type:1,
			orderNum:0
		}
	},
	methods: {
		getMenu: function(menuId){
			//加载菜单树
			$.get("../sys/menu/select", function(r){
				ztree = $.fn.zTree.init($("#menuTree"), setting, r.menuList);
				var node = ztree.getNodeByParam("menuId", vm.menu.parentId);
				ztree.selectNode(node);
				
				vm.menu.parentName = node.name;
			})
		},
		add: function(){
			vm.showList = false;
			vm.title = "新增";
			vm.menu = {parentName:null,parentId:0,type:1,orderNum:0};
			vm.getMenu();
		},
		update: function (event) {
//			var menuId = getSelectedRow();
			var menuId = selectOneData();
			if(menuId == null){
				return ;
			}
			
			$.get("../sys/menu/info/"+menuId, function(r){
				vm.showList = false;
                vm.title = "修改";
                vm.menu = r.menu;
                
                vm.getMenu();
            });
		},
		del: function (event) {
//			var menuIds = getSelectedRows();
//			if(menuIds == null){
//				return ;
//			}
			var menuIds = [];
			var menuId = selectOneData();
			if(menuId == false){
				return ;
			}
			menuIds.push(menuId);
			confirm('确定要删除选中的记录？', function(){
				$.ajax({
					type: "POST",
				    url: "../sys/menu/delete",
				    data: JSON.stringify(menuIds),
				    success: function(r){
				    	if(r.code === 0){
							alert('操作成功', function(index){
								vm.reload();
							});
						}else{
							alert(r.msg);
						}
					}
				});
			});
		},
		saveOrUpdate: function (event) {
			var url = vm.menu.menuId == null ? "../sys/menu/save" : "../sys/menu/update";
			$.ajax({
				type: "POST",
			    url: url,
			    data: JSON.stringify(vm.menu),
			    success: function(r){
			    	if(r.code === 0){
						alert('操作成功', function(index){
							vm.reload();
						});
					}else{
						alert(r.msg);
					}
				}
			});
		},
		menuTree: function(){
			layer.open({
				type: 1,
				offset: '50px',
				skin: 'layui-layer-molv',
				title: "选择菜单",
				area: ['300px', '450px'],
				shade: 0,
				shadeClose: false,
				content: jQuery("#menuLayer"),
				btn: ['确定', '取消'],
				btn1: function (index) {
					var node = ztree.getSelectedNodes();
					//选择上级菜单
					vm.menu.parentId = node[0].menuId;
					vm.menu.parentName = node[0].name;
					
					layer.close(index);
	            }
			});
		},
		reload: function (event) {
			vm.showList = true;
//			var page = $("#jqGrid").jqGrid('getGridParam','page');
//			$("#jqGrid").jqGrid('setGridParam',{ 
//                page:page
//            }).trigger("reloadGrid");
			var colunms = Grid.initColumn();
		    var table = new TreeTable(Grid.id, "../sys/menu/treelist", colunms);
		    table.setExpandColumn(2);
		    table.setIdField("menuId");
		    table.setCodeField("menuId");
		    table.setParentCodeField("parentId");
		    table.init();
		    Grid.table = table;
		}
	}
});
/* 获取表格中的一条记录  */
function selectOneData () {
    var selected = $('#grid').bootstrapTreeTable('getSelections');
    console.log(selected);
    console.log(selected[0].id);
    if (selected.length == 0) {
    	layer.msg("请选择一条记录", {icon: 5,time:2000});
        return false;
    } else {
        return selected[0].id;
    }
}