// JavaScript Document
var currentSwitchStage = 1;
function setHead() 
{
    var head = document.getElementById("head");
    var obj = parent.document.getElementById("all");
    var sImg = document.getElementById("imgHead");
    if (currentSwitchStage == 1) 
    {
        head.style.display = "none";
        obj.rows = "29,*";
        currentSwitchStage = 0;
        sImg.src = "../statics/images/m_02.gif";
    }
    else 
    {
        head.style.display = "block";
        currentSwitchStage = 1;
        obj.rows = "105,*";
        sImg.src = "../statics/images/m_01.gif";
    }
}

function tab(th){
	var li_list = th.parentNode.getElementsByTagName("li");
	for(var q = 0; q<li_list.length; q++){
		li_list[q].className="";
	}
	th.className = "l_sel";
}

function sel(li) {
    var li_list = li.parentNode.getElementsByTagName("li");
    for (var q = 0; q < li_list.length; q++) {
        if (li_list[q] == li) {
            li_list[q].className = "l_sel";
        }
        else {
            li_list[q].className = "";
        }
    }
}

var status_img = 0;
var status_memu = 0;
var status_up = 0;
function menuChange(obj, menu, img_up, img_down) {
    if (menu.style.display == "") {
        obj.background = img_up; ;
        menu.style.display = "none";
    } else {
        obj.background = img_down;
        menu.style.display = "";
        //������ε�����ϴβ�ͬ��Ŀ��ر��ϴδ���Ŀ
        if (status_img != 0 && menu != status_memu) {
            status_img.background = status_up;
            status_memu.style.display = "none";
        }
        //���汾���б�ֵ
        status_img = obj;
        status_memu = menu;
        status_up = img_up;
    }
}

function ImgChange(obj, menu, img) {
    if (menu.style.display == "none") {
        obj.background = img; ;
    }
}

var status_aid = "DispatchShow";
function firmsel(id) {
    document.getElementById(status_aid).className = "mLeft";
    document.getElementById(id).className = "mActive";
    status_aid = id;
}


 function tr_over(tr)
 {
   tr.style.backgroundColor="#5ec7fa";
 }
 function tr_out(tr)
 {
 if(tr.className == "tr_1")
 {
     tr.style.background = "#fff";
 }
 else 
 {
   tr.style.background = "#e9f3ff";
 }

 	
 }
 function OpenWindowTree(src, xzqhdm, aName, aGrade, allowGrade) {
     if (!allowGrade) {
         allowGrade = 5;
         if (src.indexOf("xmlbdm_13.aspx") >= 0) {
             allowGrade = 4;
         }
     }
     if (!aName) {
         aName = 0;
     }

     var textValue = '';

     if (src.indexOf("xmlbdm.aspx") >= 0 || src.indexOf("xmlbdm_13.aspx") >= 0) {
         textValue = escape(document.getElementById("txtXmlbdm").value);
     }
     else {
         textValue = escape(document.getElementById("txtXzqhdm").value);
     }


     window.open(src + '?aID=' + xzqhdm + '&aName=' + escape(aName) + '&aGrade=' + escape(aGrade) + '&allowGrade=' + escape(allowGrade) + '&aFullName=' + textValue + '', '', 'align:center,height=590,width=696,left=200,top=10,location=no,menubar=no,resizable=false,scrollbars=yes,status=no,titlebar=no,toolbar=no');

     //return false;
 }

 function OpenWindowChart(src) {
     var width = document.documentElement.clientWidth - 10;
     var height = document.documentElement.clientHeight;
     window.open(src, "newwin", "resizable=false,scrollbars=yes,titlebar=no,toolbar=no,location=no,directories=no,status=no,menubar=no,left=152,top=160,width=" + width + ",height=" + height);
 }
  