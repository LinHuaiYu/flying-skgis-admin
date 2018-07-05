function getQueryString(name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var reg_rewrite = new RegExp("(^|/)" + name + "/([^/]*)(/|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var q = window.location.pathname.substr(1).match(reg_rewrite);
    if(r != null){
        return unescape(r[2]);
    }else if(q != null){
        return unescape(q[2]);
    }else{
        return null;
    }
}
//选择一条记录
function getSelectedRow() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if(!rowKey){
    	alert("请选择一条记录");
    	return ;
    }
    var selectedIDs = grid.getGridParam("selarrrow");
    if(selectedIDs.length > 1){
    	alert("只能选择一条记录");
    	return ;
    }
    return selectedIDs[0];
}

//选择多条记录
function getSelectedRows() {
    var grid = $("#jqGrid");
    var rowKey = grid.getGridParam("selrow");
    if(!rowKey){
    	alert("请选择一条记录");
    	return ;
    }
    return grid.getGridParam("selarrrow");
}

//选择树形表单中的一条内容
function getOneTreeGridId (id) {
  var selected = $('#'+id).bootstrapTreeTable('getSelections');
  if (selected.length == 0) {
      alert("请选择一条记录");
      return false;
  } else {
      return selected[0].id;
  }
}

//重写alert
window.alert = function(msg, callback){
 	layer.alert(msg, function(index){
 		layer.close(index);
 		if(typeof(callback) === "function"){
 			callback("ok");
 		}
 	});
}
 //重写confirm式样框
window.confirm = function(msg, callback){
 	layer.confirm(msg, {btn: ['确定','取消']},
 	function(){//确定事件
 		if(typeof(callback) === "function"){
 			callback("ok");
 		}
 	});
}

//打开添加页面
function openFullWin(title,url){
	var index = layer.open({
		type: 2,
		title: title,
		content: url
	});
	layer.full(index);
}

//打开指定宽高页面
function openWin(width,height,title,url){
	layer.open({
		type: 2,
		area: [width+'px',height+'px'],
		fix: false, //不固定
		maxmin: true,
		shade:0.4,
		title: title,
		content: url
	});
}