$(document).ready(function(){
    console.log('login.js'); 
    if(isLogin()){
        redirectTo('/');
        return;
    }
});

function btnLogin(){
    $('#btn-login').on('click', function(){
        console.log('clicked');
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
            if(response.status == 2){
                showWarning('',response.message, function(){});
                return;
            }
            if(response.status == 3){
                showError('',response.message, function(){
                    redirectTo('/login');
                });
                return;
            }
        } 
        console.log(response);
        setStorage('token', response.data.token);
        setStorage('name', response.data.name);
        setStorage('outlet', JSON.stringify(response.data.outlet));
        redirectTo('/');
    });
}