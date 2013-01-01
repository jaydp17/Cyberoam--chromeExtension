var storage = chrome.storage.local;
var submit = document.querySelector('button.submit');
var user = document.getElementById('user');
var pass = document.getElementById('pass');

loadData();

submit.addEventListener('click',saveData);

function saveData(){
    var username = user.value;
    var password = pass.value;
    alert("user = " + user.value + "pass ="+pass.value);
    if(!username || !password){
	return;
    }
    
    storage.set({'user':username, 'pass':password});
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
