// this js file will be loaded when the browser starts

var loggedin = false;
//var theUrl = "http://10.100.56.55:8090/httpclient.html";
var theUrl = "http://localhost/cyb.php";


checkConnection(login);
chrome.browserAction.onClicked.addListener(function(tab){
    if(loggedin){
	checkConnection(logout);
    } else {
	checkConnection(login);
    }
} );

function login(){
    var storage = chrome.storage.local;
    storage.get(null,function(data){
	if(!data.user || !data.pass){
	    console.log("Login : crendentials not defined");
	    alert("Error: login credentials not defined");
	    return;
	}
	$.post(theUrl, { mode:"191", username:data.user,password:data.pass }, function(response){
	    console.log("Login response :" + response);
	    loggedin = true;
	    chrome.browserAction.setIcon({path:"icon.png"});
	});
    });
}

function logout(){
    var storage = chrome.storage.local;
    storage.get(null,function(data){
	if(!data.user || !data.pass){
	    console.log("Logout : crendentials not defined");
	    alert("Error: login credentials not defined");
	    return;
	}
	$.post(theUrl, { mode:"193", username:data.user }, function(response){
	    console.log("Logout response :" + response);
	    loggedin = false;
	    chrome.browserAction.setIcon({path:"icon_grey.png"});
	});
    });
}

function checkConnection(callback){
    var xmlHttp = new XMLHttpRequest();
    xmlHttp.open("GET", theUrl, true);

    xmlHttp.onreadystatechange=function(){
	if (xmlHttp.readyState === 4 && xmlHttp.status === 200) {
	    clearTimeout(xmlHttpTimeout);
	    console.log("Connection established with cyberoam");
	    chrome.browserAction.setBadgeText({text:""});
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
	console.log("Connection failed");
	chrome.browserAction.setBadgeText({text:"!"});
    }
}