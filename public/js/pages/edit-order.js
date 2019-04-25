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
    let eos = JSON.parse(getStorage('edit-order-slip'));
    let data = {
        product_id  : eos.main_product_id,
        outlet_id   : outlet.id
    };

    postWithHeader(routes.product, data, function(response){
        if(response.success == false){ 
            showError('',response.message, function(){
            });
            return;
        }
        
        console.log(response);
        displayProduct(response.result);
        getComponentsOfProduct();
    });
}

function displayProduct(data){
    
    $('#product_name').text(data.short_code);
    $('#product_price').text(data.price);

    var eos = JSON.parse( getStorage('edit-order-slip') );  
    eos.data = {
        product_id : parseInt(data.product_id),
        name : data.short_code,
        price : data.price,
        qty : 1,
        main_product_id : parseInt(data.product_id),
        main_product_component_id : null,
        main_product_component_qty : null,
        total : (1 * data.price),
        instruction : "",
        is_take_out : false,
        part_number : data.part_number,
        others:[]
    };  

    setStorage('edit-order-slip', JSON.stringify(eos)); 
    logicDisplay();
}

$('#instruction').on('change', function(){ 
    var _this = $(this); 
    var eos = JSON.parse( getStorage('edit-order-slip') );   
    eos.data.instruction = _this.val();  
    setStorage('edit-order-slip', JSON.stringify(eos)); 
});

$('#is_takeout').change('change', function(){ 
    var _this = $(this); 
    var eos = JSON.parse( getStorage('edit-order-slip') );
    eos.data.is_take_out = _this.is(':checked');
    setStorage('edit-order-slip', JSON.stringify(eos)); 
});

$('#btn-m-minus').on('click', function(){ 
    var eos = JSON.parse( getStorage('edit-order-slip') );    
    if(eos.data.qty > 1){ 
        eos.data.qty--; 
        $.each(eos.data.others, function(k,v){
            v.qty = v.main_product_component_qty * po.qty;
        }); 
    }  
    setStorage('edit-order-slip', JSON.stringify(eos));
    logicDisplay();
});

$('#btn-m-plus').on('click', function(){ 
    var eos = JSON.parse( getStorage('edit-order-slip') );  
    eos.data.qty++;
    eos.data.total = eos.data.qty * eos.data.price;
    $.each(eos.data.others, function(k,v){
        v.qty += v.main_product_component_qty * 1;
    });
    setStorage('edit-order-slip', JSON.stringify(eos));
    logicDisplay();
}); 

function getComponentsOfProduct(){
    let outlet = JSON.parse(getStorage('outlet'));  
    var eos = JSON.parse( getStorage('edit-order-slip') ); 
    let data = {
        product_id  : eos.data.main_product_id,
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

    var eos = JSON.parse( getStorage('edit-order-slip') );  

    $.each(data, function(k,v){ 
        v.quantity = parseInt(v.quantity, 10);  
        eos.data.others.push({
            product_id : parseInt(v.product_id),
            name : v.description,
            price : 0,
            qty : v.quantity,
            main_product_id : parseInt(eos.data.product_id),
            main_product_component_id : parseInt(v.product_id),
            main_product_component_qty : v.quantity,
            total : (v.quantity * 0), 
            part_number : v.product_partno,
            others: []
        });

        var _id = eos.data.product_id+'-'+v.product_id;
        cc.append(
            '<div class="mrg-top-0">'+
                '<div id="accordion-cc-'+k+'" class="accordion border-less" role="tablist" aria-multiselectable="true">'+
                    '<div class="panel panel-default">'+
                        '<div class="panel-heading" role="tab">'+
                            '<h4 class="panel-title">'+
                                '<a class="collapsed" data-toggle="collapse" data-parent="#accordion-cc-'+k+'" href="#collapse-cc-'+k+'" aria-expanded="false">'+
                                    '<span>'+v.description+' | <i class="text-success" id="'+_id+'">'+v.quantity+'</i></span>'+
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
    setStorage('edit-order-slip', JSON.stringify(eos)); 
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
    var eos = JSON.parse( getStorage('edit-order-slip') ); 
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
                        '<span>(<i class="text-success" id="'+_id+'-qty">0</i> )</span>'+
                        '<button '+
                        'id="'+_id+'-minus" '+ 
                        'data-main_product_component_id="'+product.product_id+'" '+ 
                        'data-main_product_id="'+eos.main_product_id+'" '+
                        'data-name="'+v.short_code+'" '+
                        'data-price="'+v.price+'" '+
                        'data-product_id="'+v.product_id+'" '+
                        'class="btn btn-danger btn-inverse btn-xs no-mrg-btm mrg-left-10 border-radius-4">'+
                            '<i class="fa fa-minus"></i>'+
                        '</button> '+ 
                        '<button '+ 
                        'id="'+_id+'-plus" '+
                        'data-main_product_component_id="'+product.product_id+'" '+ 
                        'data-main_product_id="'+eos.main_product_id+'" '+
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
        btnComponentCategoryMinus(_id+'-minus');
        btnComponentCategoryPlus(_id+'-plus');
    });
}

function btnComponentCategoryMinus(id){
    $('#'+id).on('click', function(){
        var data = {
            main_product_component_id : $(this).data('main_product_component_id'),
            main_product_id : $(this).data('main_product_id'),
            name : $(this).data('name'),
            price : $(this).data('price'),
            product_id : $(this).data('product_id')
        }; 

        // initialize product order 
        var eos = JSON.parse( getStorage('edit-order-slip') );  
        $.each(eos.data.others, function(k,v){ 
            if(data.main_product_component_id == v.main_product_component_id){ 
                var _index_to_remove = -1;
                $.each(v.others, function(kk,vv){ 
                    if(data.product_id == vv.product_id){  
                        if(vv.qty > 0){
                            v.qty++; 
                            vv.qty--;
                            vv.total = vv.price * vv.qty;  
                            if(vv.qty == 0){ 
                                var _id = '#'+eos.data.product_id+'-'+v.product_id+'-categories-'+vv.product_id+'-qty';
                                $(_id).text(0);  
                                
                                _index_to_remove = kk;
                            }
                        }
                    }
                });

                // to remove zero quantity of sub components
                if (_index_to_remove > -1) {
                    v.others.splice(_index_to_remove, 1);
                }
            }
        });
        //
        setStorage('edit-order-slip', JSON.stringify(eos)); 
        logicDisplay();
    });
}

function btnComponentCategoryPlus(id){
    $('#'+id).on('click', function(){ 

        var data = {
            main_product_component_id : $(this).data('main_product_component_id'),
            main_product_id : $(this).data('main_product_id'),
            name : $(this).data('name'),
            price : $(this).data('price'),
            product_id : $(this).data('product_id')
        }; 

        // initialize product order 
        var eos = JSON.parse( getStorage('edit-order-slip') );  

        // check if the selected sub component category is exist in sub component
        $.each(eos.data.others, function(k,v){ 
            if(data.main_product_component_id == v.main_product_component_id){ 

                if(v.qty > 0){
                    // adding to sub component if not exist
                    var if_exist = false;
                    $.each(v.others, function(kk,vv){
                        if(data.product_id == vv.product_id){ 
                            if_exist = true;
                            vv.qty++;
                            vv.total = vv.price * vv.qty;
                            v.qty--; 
                        }
                    });

                    if(if_exist == false){ 
                        v.others.push({
                            product_id : parseInt(data.product_id),
                            name : data.name,
                            price : data.price,
                            qty : 1,
                            main_product_id : parseInt(eos.data.product_id),
                            main_product_component_qty : v.quantity,
                            main_product_component_id : parseInt(v.product_id),
                            
                            total : (data.price * 1),
                            part_number : v.part_number,
                        });
                        v.qty -= 1; 
                    }

                }else{
                    cl(['No Available Qty']);
                }
            }
        });

        //
        setStorage('edit-order-slip', JSON.stringify(eos)); 

        logicDisplay();
    });
}

function logicDisplay(){ 
    var grand_total = 0; 

    var eos = JSON.parse( getStorage('edit-order-slip') );  
     
        
        /**
         * MAIN PRODUCT SECTION
         */ 
        grand_total += eos.data.total; 
        $('#m-product-qty').val(eos.data.qty);   


        /**
         * COMPONENTS SECTION
         */
        $.each(eos.data.others, function(k,v){
            $('#'+eos.data.product_id+'-'+v.product_id).text(v.qty);
        }); 


        /**
         * SUB COMPONENTS SECTION
         */
        $.each(eos.data.others, function(k,v){
            $.each(v.others, function(kk,vv){ 
                var _id = '#'+eos.data.product_id+'-'+v.product_id+'-categories-'+vv.product_id+'-qty';
                $(_id).text(vv.qty); 
                grand_total += vv.total;
            });
        });

    $('#grand-total').text('TOTAL : ' + numberWithCommas(grand_total));
}