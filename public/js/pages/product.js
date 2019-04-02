"use strict"
$(document).ready(function(){
    console.log('sub-category.js'); 
    if(!isLogin()){
        redirectTo('/login');
        return;
    } 

    getProduct();
});

function getProduct(){

    //parse
    let outlet = JSON.parse(getStorage('outlet'));  
    let data = {
        product_id  : getStorage('selected-product'),
        outlet_id   : outlet.id
    };

    postWithHeader(routes.product, data, function(response){
        if(response.success == false){
            if(response.status == 401){
                clearStorage(); 
                redirectTo('/login');
                return;
            }

            showError('',response.message, function(){
            });
            return;
        }
 
        cl([response.result])
    });
}