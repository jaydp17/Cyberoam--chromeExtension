$('#check').hide();
var storage = chrome.storage.local;
var submit = document.getElementById('button');
var user = document.getElementById('user');
var pass = document.getElementById('pass');
var interval = document.getElementById('interval');

loadData();

submit.addEventListener('click',saveData);

$(':radio').change(function() {
    if($(this).val() === "opt1"){
       interval.disabled = false;
       interval.focus();
       chrome.extension.getBackgroundPage().liveTimeFrmServer = false;
    } else {
       interval.disabled = true;
       chrome.extension.getBackgroundPage().liveTimeFrmServer = true;
    }
});


function saveData(){
    var username = user.value;
    var password = pass.value;
    console.log("user = " + user.value + "pass ="+pass.value);
    if(!username || !password){
	return;
    }
    if(!chrome.extension.getBackgroundPage().liveTimeFrmServer){
	chrome.extension.getBackgroundPage().liveTime = parseInt(interval.value);
    }
    storage.set({'user':username, 'pass':password});
    $('#check').fadeIn("slow");
    $('#check').delay(400).fadeOut("slow");
}

function loadData(){
    var lTime = chrome.extension.getBackgroundPage().liveTime;
    interval.value = lTime.toString();
    storage.get(null,function(data){
	if(!data.user || !data.pass){
	    return;
	}
	user.value = data.user;
	pass.value = data.pass;
    });
}

$('#interval').jStepper({minValue:30, maxValue:720});
$('#interval').bind("cut copy paste",function(e) {
    e.preventDefault();
});