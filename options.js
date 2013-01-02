$('#check').hide();
var storage = chrome.storage.local;
var submit = document.getElementById('button');
var user = document.getElementById('user');
var pass = document.getElementById('pass');

loadData();

submit.addEventListener('click',saveData);

function saveData(){
    var username = user.value;
    var password = pass.value;
    console.log("user = " + user.value + "pass ="+pass.value);
    if(!username || !password){
	return;
    }
    
    storage.set({'user':username, 'pass':password});
    $('#check').fadeIn("slow");
    $('#check').delay(400).fadeOut("slow");
}

function loadData(){
    storage.get(null,function(data){
	if(!data.user || !data.pass){
	    return;
	}
	user.value = data.user;
	pass.value = data.pass;
    });
}
