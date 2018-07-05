$.validator.setDefaults({
	submitHandler : function() {
		login();
	}
});
//表单验证
function formValidate() {
	$("#myForm").validate({
		rules : {
			txtUserName : "required",
			txtPWD : "required",
			text_CheckCode : "required"
		},
		messages : {
			txtUserName:'请填写用户名',
			txtPWD:'请填写密码',
			text_CheckCode:'请填写验证码'
		},
	});
}
$(function() {
	if(self != top){
		top.location.href = self.location.href;
	}
	//验证码生成
	captcha();
	//更换验证码
	chaneImgEvent();
	console.log("page: login");
	//开启表单验证	
	//formValidate();
});
//生成验证码
function captcha() {
	$("img[name=ImgBtnCheckCode]").attr("src", "captcha.jpg?t=" + $.now());
}
function login(){
	var username = $('#txtUserName').val();
	var password = $('#txtPWD').val();
	var captcha = $('#text_CheckCode').val();
	if(captcha==""){
		alert("请输入验证码");
		return;
	}
	if(password==""){
		alert("请输入密码");
		return;
	}
	if(username==""){
		alert("请输入用户名");
		return;
	}
	var url = "sys/login";
	$.ajax({
		type : "POST",
		url : url,
		data : {
			username : username,
			password : password,
			captcha : captcha
		},
		dataType : "json",
		success : function(r) {
			if (r.code == 0) {
				window.location.href = 'index.html';
			} else {
				alert(r.msg);
				$("img[name=ImgBtnCheckCode]").attr("src", "captcha.jpg?t=" + $.now());
			}
		}
	});
}
//更换验证码事件绑定
function chaneImgEvent(){
	$('#changeImg').on('click', function() {
		captcha();
	});
}