
var alrt = function(){
    alert("hello"); 
}
//var theUrl = "http://10.100.56.55:8090/httpclient.html";
var theUrl = "http://localhost/cyb.php";

function login(){
    var storage = chrome.storage.local;
    storage.get(null,function(data){
	if(!data.user || !data.pass){
	    return false;
	}
	$.post(theUrl, { mode:"191", username:data.user,password:data.pass }, function(response){
	    alert(response);
	});
    });
}

function logout(){
    var storage = chrome.storage.local;
    storage.get(null,function(data){
	if(!data.user || !data.pass){
	    return false;
	}
	$.post(theUrl, { mode:"193", username:data.user }, function(response){
	    alert(response);
	});
    });
}

function checkConnection(callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, true);

    xmlHttp.onreadystatechange=function(){
	if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
	    clearTimeout(xmlHttpTimeout);
	    console.log("reached true");
	    callback();
   	}
    }

    xmlHttp.send("");
    var xmlHttpTimeout=setTimeout(ajaxTimeout,2000);	// 2 seconds Timeout
    function ajaxTimeout(){
	xmlHttp.abort();
   	alert("Hi !!, this is cyberoam autologin extension\nand I'm really sorry to say that I can't find cyberoam :(");
   	// if cyberoam is unreachable then there is no point in checking for it again & again.
   	//clearInterval(timer);
	console.log("reached false");
    }
}