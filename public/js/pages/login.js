$(document).ready(function(){
    cl(['login.js']); 
    if(isLogin()){
        redirectTo('/');
        return;
    }
});

function btnLogin(){
    $('#btn-login').on('click', function(){ 
        var username = $('#username');
        var password = $('#password');

        if(username.val() == '' || username.val() == null){
            showWarning('','Username is required.', function(){ 
            });
            username.focus();
            return;
        }

        if(password.val() == '' || password.val() == null){
            showWarning('','Password is required.', function(){ 
            });
            password.focus();
            return;
        }

        login(username.val(), password.val());
    });
}

function login(username, password){
    var data = {
        username: username,
        password: password,
        grant_type: 'ambulant'
    };

    post('/login', data, function(response){
        if(response.success == false){ 
            showWarning('',response.message, function(){});
            return; 
        }
        cl([response]);
        setStorage('api_token', response.data.api_token);
        setStorage('name', response.data.name);
        setStorage('outlet', JSON.stringify(response.data.outlet));
        init();
        redirectTo('/');
    });
}