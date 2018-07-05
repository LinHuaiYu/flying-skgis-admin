
//String.prototype.endWith = function(str) {
//    var reg = new RegExp(str + "$");
//    return reg.test(this);
//}

function viewRs(code, name) {
    var cbname = document.getElementById("cbname");
    if (window.location.href.indexOf("tree.aspx") >= 0 || window.location.href.indexOf("xmlbdm.aspx") >= 0 || window.location.href.indexOf("xmlbdm_13.aspx") >= 0) {
        $("a").removeAttr("class");
    }
    clearSelect(cbname);
    if (code.toString().length > 0) {
        var newOption = document.createElement("OPTION");
        newOption.text = name;
        newOption.value = code;
        cbname.options.add(newOption);
    }

    if (window.location.href.indexOf("tree.aspx") >= 0 || window.location.href.indexOf("xmlbdm.aspx") >= 0 || window.location.href.indexOf("xmlbdm_13.aspx") >= 0) {

        $("a").filter(function(index) {
            return $(this).attr("href").indexOf("javascript:viewRs('" + code + "',") == 0
        }).removeAttr("class").addClass("itemNodeSel")
    }
}

//function openwin() {

//    if (window.parent != "undefined" && window.parent != null) {
//        window.parent.opener = null;
//        window.parent.open("", "_self");
//        window.parent.close();
//    }
//    else if (window != "undefined" && window != null)
//    { window.close(); }


//    var d = new Date();
//    s = d.getSeconds();
//    /**********************************************************************************************/
//    window.opener = null;
//    windowstr = window.open("http:/ /treeview/main.aspx?temp=" + s, 'DTJGWin' + s, 'top=0, left=0, toolbar=no, menubar=no, scrollbars=no,resizable=yes,location=yes, status=yes');

//    windowstr.resizeTo(screen.width, screen.height);
//    windowstr.moveTo(0, -10);
//    window.opener = null;
//    window.open("", "_self");
//    window.close();
//}

function LoadXmlTree(src, code, allowGrade) {

    var txtSerch = trimStr(document.getElementById("txtSerch").value);
    var cbjb = document.getElementById("cbjb");
    cbjb = cbjb.options[cbjb.selectedIndex].value;
    var sSrc = src + "?name=" + escape(txtSerch) + "&jb=" + escape(cbjb) + "&code=" + escape(code) + "&allowGrade=" + escape(allowGrade);

    var xmlHttp = XmlHttp.create();
    xmlHttp.open("GET", sSrc, true); // async
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4) {

            LoadXmled(xmlHttp.responseXML);
        }
    };
    // call in new thread to allow ui to update
    window.setTimeout(function() {
        xmlHttp.send(null);
    }, 10);
}

function LoadXmled(oXmlDoc) {
    // check that the load of the xml file went well
    if (oXmlDoc == null || oXmlDoc.documentElement == null) {

    }
    else {
        // there is one extra level of tree elements
        var root = oXmlDoc.documentElement;
        // loop through all tree children
        var cs = root.childNodes;
        var l = cs.length;

        if (l > 2000) {
            l = 2000;
            alert("显示前2000行");
        }

        var cbname = document.getElementById("cbname");
        clearSelect(cbname);
        for (var i = 0; i < l; i++) {
            var newOption = document.createElement("OPTION");
            newOption.text = cs[i].getAttribute('text');
            newOption.value = cs[i].getAttribute('value');
            cbname.options.add(newOption);
        }
    }
}

function clearSelect(obj) {
    for (i = obj.length; i >= 0; i--) {
        obj.options.remove(i);
    }
}

function trimStr(value) {
    return value.replace(/(^\s*)|(\s*$)/g, "");
}

function closeName() {
    window.close();
    window.opener.focus();
    return false;
}
function setName(type) {
    var cbname = document.getElementById("cbname");
    if (cbname.options.length == 0) {
        alert("请选择内容");
        return;
    }
    var selname = cbname.options[cbname.selectedIndex].text;
    var selvalue = cbname.options[cbname.selectedIndex].value;


    if (type == "0") {
        if (document.getElementById("chlevel").checked) {
            if (selname.substring(selname.length - 1) != "属") {
                selname = selname + "属";
            }
            window.opener.init(selname, selvalue + "|1");
        }
        else {

            if (selvalue.length == 6) {
                if (selvalue.substring(selvalue.length - 2) == "00") {
                    selvalue = selvalue.substring(0, selvalue.length - 2);
                }
                if (selvalue.substring(selvalue.length - 2) == "00") {
                    selvalue = selvalue.substring(0, selvalue.length - 2);
                }
            }
           
           window.opener.init(selname, selvalue + "|0");
        }
    }
    else if (type == "1") {
        if (selname == "全部") {
            selvalue = "";
        }
        else {
            if (selvalue.length == 6) {
                if (selvalue.substring(selvalue.length - 2) == "00") {
                    selvalue = selvalue.substring(0, selvalue.length - 2);
                }
                if (selvalue.substring(selvalue.length - 2) == "00") {
                    selvalue = selvalue.substring(0, selvalue.length - 2);
                }
            }
        }
         
        window.opener.initXmlbdm(selname, selvalue);
    }
    else if (type == "2") {
        var selnames = selname.split("|");

        selname = selnames[0];
        if (selname == "全部") {
            selvalue = "";
            selname = "";
        }
        window.opener.initReservoir(selname, selvalue);
    }
    else if (type == "3") {
        if (selname == "全部") {
            selvalue = "";
        }
        else {
            if (selvalue.length == 8) {
                if (selvalue.substring(selvalue.length - 2) == "00") {
                    selvalue = selvalue.substring(0, selvalue.length - 2);
                }
                if (selvalue.substring(selvalue.length - 2) == "00") {
                    selvalue = selvalue.substring(0, selvalue.length - 2);
                }
                if (selvalue.substring(selvalue.length - 2) == "00") {
                    selvalue = selvalue.substring(0, selvalue.length - 2);
                }
            }
        }
        window.opener.initXmlbdm(selname, selvalue);
    }
    closeName();

}
function showcbjb(aGrade, allowGrade) {
    var cbjb = document.getElementById("cbjb");

    if (allowGrade > 0) {
        allowGrade = parseInt(allowGrade) + 1;
        for (i = 6; i > allowGrade; i--) {
            cbjb.options.remove(i);
        }
    }
    if (aGrade > 0) {
        for (i = aGrade; i >= 1; i--) {
            cbjb.options.remove(i);
        }
    }
}