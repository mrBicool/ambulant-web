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
    var po = JSON.parse( getStorage('product_order') );   
    var poSet = new Set();
    $.each(po,function(k,v){
         
        // main
        if(v.product_id == v.main_product_id){ 
            //console.log(k,v);
            if(v.qty > 1){ 
                poSet.add(v); 
                $.each(po,function(kk,vv){
                    // component
                    if(vv.product_id == vv.main_product_component_id){ 
                        if(po[0].qty > 1){
                            poSet.add(v);
                            //console.log('::1', vv);
                            vv.qty -= vv.main_product_component_qty * 1;
                            //console.log('::2', vv);
                        }
                        poSet.add(vv);
                    }
                });

                v.qty--;
                v.total = v.qty * v.price; 
            }  
            poSet.add(v);
            
        } 
    });
    
    //console.log(po,poSet);
    setStorage('product_order', JSON.stringify(po));
    logicDisplay();
});

$('#btn-m-plus').on('click', function(){ 
    var po = JSON.parse( getStorage('product_order') ); 
    $.each(po, function(k,v){ 
        //main product
        if(v.product_id == v.main_product_id){  
            po[k].qty++;
            po[k].total = po[k].qty * po[k].price; 
        }

        //main component of product
        if(v.product_id == v.main_product_component_id){   
            po[k].qty += po[k].main_product_component_qty * 1;
        } 
    });    
    setStorage('product_order', JSON.stringify(po));
    logicDisplay();
}); 

$('.btn.btn-flat.btn-info.add-to-order').on('click', function(){ 
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
        componentsDisplayer(response.result.data);
        
    });
}

function componentsDisplayer(data){
    var cc = $('.components-container');
    cc.empty();

    var po = JSON.parse( getStorage('product_order') ); 

    $.each(data, function(k,v){ 
        v.quantity = parseInt(v.quantity, 10);
        
        po.push({
            product_id : v.product_id,
            name : v.description,
            price : 0,
            qty : v.quantity,
            main_product_id : po[0].product_id,
            main_product_component_id : v.product_id,
            main_product_component_qty : v.quantity,
            total : (v.quantity * 0),
            instruction : "",
            is_take_out : false,
        });  

        var _id = po[0].product_id+'-'+v.product_id;
        cc.append(
            '<div class="mrg-top-0">'+
                '<div id="accordion-cc-'+k+'" class="accordion border-less" role="tablist" aria-multiselectable="true">'+
                    '<div class="panel panel-default">'+
                        '<div class="panel-heading" role="tab">'+
                            '<h4 class="panel-title">'+
                                '<a class="collapsed" data-toggle="collapse" data-parent="#accordion-cc-'+k+'" href="#collapse-cc-'+k+'" aria-expanded="false">'+
                                    '<span>'+v.description+' | <i id="'+_id+'">'+v.quantity+'</i></span>'+
                                    '<i class="icon ti-arrow-circle-down"></i> '+
                                '</a>'+
                            '</h4>'+
                        '</div>'+
                        '<div id="collapse-cc-'+k+'" class="panel-collapse collapse" style="">'+
                            '<div class="panel-body" id="'+_id+'-categories'+'"> '+ 
                            '</div>'+
                        '</div>'+
                    '</div> '+
                '</div>'+
            '</div>'
        );

        getComponentCategories(v.product_id, _id+'-categories');
    });
    setStorage('product_order', JSON.stringify(po)); 
} 

function getComponentCategories(product_id,container){
    let outlet = JSON.parse(getStorage('outlet'));  
    let data = {
        product_id  : product_id,
        outlet_id   : outlet.id
    }; 
    postWithHeader(routes.productComponentCategories, data, function(response){
        if(response.success == false){ 
            showError('',response.message, function(){
            });
            return;
        }
         
        componentCategoriesDisplayer(response.result.product,response.result.categories.data,container);
    });
}

function componentCategoriesDisplayer(product,data,container){
    var c = $('#'+container);
    c.empty();
    $.each(data, function(k,v){ 

        if(v.price <= product.price){
            v.price = 0;
        }else{
            v.price = v.price - product.price;
        }

        var _id = container+'-'+v.product_id;
        c.append(
            '<div class="row border bottom">'+
                '<div class="col-md-8">'+
                    '</span>'+
                    '<span class="mrg-left-0 font-size-14 text-dark ">'+v.short_code+' (₱ '+ numberWithCommas(v.price)+')</span>'+
                '</div>'+
                '<div class="col-md-4 text-right">'+
                    '<p class="mrg-top-10">'+
                        '<span>(0)</span>'+
                        '<button '+
                        'id="'+_id+'" '+ 
                        'data-main_product_component_id="'+product.product_id+'" '+ 
                        'data-main_product_id="'+getStorage('selected-product')+'" '+
                        'data-name="'+v.short_code+'" '+
                        'data-price="'+v.price+'" '+
                        'data-product_id="'+v.product_id+'" '+
                        'class="btn btn-danger btn-inverse btn-xs no-mrg-btm mrg-left-10 border-radius-4">'+
                            '<i class="fa fa-minus"></i>'+
                        '</button> '+ 
                        '<button '+ 
                        'id="'+_id+'" '+
                        'data-main_product_component_id="'+product.product_id+'" '+ 
                        'data-main_product_id="'+getStorage('selected-product')+'" '+
                        'data-name="'+v.short_code+'" '+
                        'data-price="'+v.price+'" '+
                        'data-product_id="'+v.product_id+'" '+
                        'class="btn btn-success btn-inverse btn-xs no-mrg-btm mrg-left-10 border-radius-4">'+
                            '<i class="fa fa-plus"></i>'+
                        '</button>'+
                    '</p>'+
                '</div>'+
            '</div>'
        );
        btnComponentCategoryMinus(_id);
    });
}

function btnComponentCategoryMinus(id){
    $('#'+id).on('click', function(){
        cl([ $(this)]);
    });
}

function logicDisplay(){ 
    var grand_total = 0; 

    var po = JSON.parse( getStorage('product_order') );  
    $.each(po, function(k,v){ 
        
        //computation
        grand_total += v.total;

        //display
        if(v.product_id == v.main_product_id){   
            $('#m-product-qty').val(v.qty); 
        }

        if(v.product_id == v.main_product_component_id){   
            $('#'+v.main_product_id+'-'+v.product_id).text(v.qty); 
        }

    });  
    $('#grand-total').text('TOTAL : ' + numberWithCommas(grand_total));
}