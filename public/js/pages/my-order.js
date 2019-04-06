$(document).ready(function(){ 
    cl(['login.js']);
    if(!isLogin()){
        redirectTo('/login');
        return;
    } 
});