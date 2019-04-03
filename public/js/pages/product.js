"use strict"
$(document).ready(function(){
    cl(['sub-category.js']); 
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
            showError('',response.message, function(){
            });
            return;
        }
  
        displayProduct(response.result);
        getComponentsOfProduct();
    });
}

function displayProduct(data){
    cl([data]);
    $('#product_name').text(data.short_code);
    $('#product_price').text(data.price);

    var po = JSON.parse( getStorage('product_order') ); 
    po = [];
    po.push({
        product_id : data.product_id,
        name : data.short_code,
        price : data.price,
        qty : 1,
        main_product_id : data.product_id,
        main_product_component_id : null,
        main_product_component_qty : null,
        total : (1 * data.price),
        instruction : "",
        is_take_out : false,
    });  

    setStorage('product_order', JSON.stringify(po));

    logicDisplay();
}

$('#instruction').on('change', function(){

    var _this = $(this);

    var po = JSON.parse( getStorage('product_order') );  
    $.each(po, function(k,v){
        if(v.product_id == v.main_product_id){ 
             po[k].instruction = _this.val();
        } 
    }); 

    setStorage('product_order', JSON.stringify(po)); 
});

$('#is_takeout').change('change', function(){ 
    var _this = $(this);

    var po = JSON.parse( getStorage('product_order') );  
    $.each(po, function(k,v){
        if(v.product_id == v.main_product_id){ 
            po[k].is_take_out = _this.is(':checked');

        } 
    }); 

    setStorage('product_order', JSON.stringify(po)); 
});

$('#btn-m-minus').on('click', function(){
    cl(['minus']);
    var po = JSON.parse( getStorage('product_order') );  
    $.each(po, function(k,v){
        if(v.product_id == v.main_product_id){ 
            if(v.qty > 1){
                po[k].qty--;
                po[k].total = po[k].qty * po[k].price;
                $('#m-product-qty').val(po[k].qty);
            }
        }
    });  
    setStorage('product_order', JSON.stringify(po));
    logicDisplay();
});

$('#btn-m-plus').on('click', function(){
    cl(['plus']);
    var po = JSON.parse( getStorage('product_order') );  
    $.each(po, function(k,v){
        if(v.product_id == v.main_product_id){  
            po[k].qty++;
            po[k].total = po[k].qty * po[k].price;
            $('#m-product-qty').val(po[k].qty); 
        }
    });  
    setStorage('product_order', JSON.stringify(po));
    logicDisplay();
});

function logicDisplay(){ 
    var grand_total = 0; 

    var po = JSON.parse( getStorage('product_order') );  
    $.each(po, function(k,v){ 
        grand_total += v.total;
    });  
    $('#grand-total').text('TOTAL : ' + numberWithCommas(grand_total));
}

$('.btn.btn-flat.btn-info.add-to-order').on('click', function(){
    cl(['done..']);
    $(this).attr('disabled','disabled');
    showSuccess('','Added Successfully!', function(){ 
    });
});

function getComponentsOfProduct(){
    let outlet = JSON.parse(getStorage('outlet'));  
    let data = {
        product_id  : getStorage('selected-product'),
        outlet_id   : outlet.id
    }; 
    postWithHeader(routes.productComponents, data, function(response){
        if(response.success == false){ 
            showError('',response.message, function(){
            });
            return;
        } 
        cl([response]);
    });
}