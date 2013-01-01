// this js file will be loaded when the browser starts

var loggedin = false;

loginHandler();

chrome.browserAction.onClicked.addListener(function(tab){
    if(loggedin){
	logoutHandler();
    } else {
	loginHandler();
    }
} );

function loginHandler(){
    var op = login();
    if(op == false){
	alert("Error: login credentials not defined");
    } else {
	loggedin = true;
	chrome.browserAction.setIcon({path:"icon.png"});
    }
}

function logoutHandler(){
    var op = logout();
    if(op == false){
	alert("Error: login credentials not defined");
    } else {
	loggedin = false;
	chrome.browserAction.setIcon({path:"icon_grey.png"});
    }
}