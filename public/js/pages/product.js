"use strict"
$(document).ready(function(){
    cl(['sub-category.js']); 
    if(!isLogin()){
        redirectTo('/login');
        return;
    } 
 
    getProduct();

    showGuestByTableId();
});

function showGuestByTableId(){
    getWithHeader('/table/'+getStorage('selected_table_id')+'/guests',{},function(response){
        console.log(response);
        if(response.success == false){
            return;
        }

        // forloop the guest counts for selection
        var container = $('#guest-container');
        container.empty();
        var guest_count = response.data.guests;
        console.log(guest_count)
        for(var y=0; y < guest_count; y++){
            var  guest  = y+1;
            console.log( 'guest: ' + guest );
            container.append(
                '<div class="col-md-3 col-sm-3">'+
                    '<div class=" card  avatar-card text-center">  '+
                        '<div class="card-body">'+
                            '<span class="badge badge-pill badge-success namber" >'+guest+'</span>'+
                            '<img data-guest-no="'+guest+'" src="/assets/images/avatar.png" class="img-fluid avatar" alt="Responsive image">'+
                        '</div>'+ 
                    '</div> '+
                '</div> '
            );
        }
        // end
        selectGuest();
    });
}

function selectGuest(){
    $(".img-fluid.avatar").on('click', function(){
        let self = $(this);
        console.log(self.data('guest-no'));
        setStorage('selected_guest_no', self.data('guest-no'));
        $('#modal-lg').modal('hide');
        return;
    });

}

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
  
        displayProduct(response.result,response.base_url);
        getComponentsOfProduct();
        getComponentsNonModifiableOfProduct();
    });
}

function displayProduct(data, base_url){
    
    $('#product_name').text(data.short_code);
    $('#product_price').text(data.price);
    $('#product-image').attr('src', base_url + data.img_path);
    
    var po = JSON.parse( getStorage('product_order') );  
    po = {
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
        others:[],
        guest_no : parseInt( getStorage('selected_guest_no') ),
        guest_type : 1,
        discount : 0,
        total_without_vat : 0,
        vat : 0
        
    };  

    setStorage('product_order', JSON.stringify(po));

    logicDisplay();


    //discount();
}

$('#instruction').on('change', function(){

    var _this = $(this);

    var po = JSON.parse( getStorage('product_order') );   
    po.instruction = _this.val(); 

    setStorage('product_order', JSON.stringify(po)); 
});

$('#is_takeout').change('change', function(){ 
    var _this = $(this); 
    var po = JSON.parse( getStorage('product_order') );
    po.is_take_out = _this.is(':checked');
    setStorage('product_order', JSON.stringify(po)); 
});

$('#btn-m-minus').on('click', function(){ 
    var po = JSON.parse( getStorage('product_order') );   
    if(po.qty > 1){ 
        po.qty--; 
        po.total = po.qty * po.price; 
        // deduct sub component first
        $.each(po.others, function(k,v){ 
            var qty_to_be_deduct = 1 * v.main_product_component_qty;  
            if( (v.others).length > 0 ){   
                for(var i = 0; i < (v.others).length; i++){ 
                    if(qty_to_be_deduct > 0){ // to check if there is qty to be deduct
                        if( v.others[i].qty > 0){

                            if( qty_to_be_deduct <= v.others[i].qty){
                                v.others[i].qty = v.others[i].qty - qty_to_be_deduct;
                                qty_to_be_deduct = 0;
                            }
 
                            if( v.others[i].qty == 0){ // should be removed if zero 
                                var _id = '#'+po.product_id+'-'+v.product_id+'-categories-'+v.others[i].product_id+'-qty';
                                $(_id).text(0);
                                v.others.splice(i, 1);
                            }
                        }
                    }
                }
            }
 
            // deduct component
            if(qty_to_be_deduct >= 0){
                v.qty = v.qty - qty_to_be_deduct;
            }

        }); 
    }  
    setStorage('product_order', JSON.stringify(po));
    logicDisplay();
    // discount();
});

$('#btn-m-plus').on('click', function(){ 
    var po = JSON.parse( getStorage('product_order') );  
    po.qty++;
    po.total = po.qty * po.price;  
    $.each(po.others, function(k,v){
        v.qty += v.main_product_component_qty * 1;
    });   
    setStorage('product_order', JSON.stringify(po));
    logicDisplay();

    // discount();
}); 

$('.btn.btn-info.add-to-order').on('click', function(){ 
    //$(this).attr('disabled','disabled');
    $.confirm({
        title: 'Confirmation!',
        content: 'You are about to submit this item as order, do you want to continue?',
        type: 'dark',
        boxWidth: '80%',
        useBootstrap: false,
        closeIcon: function(){
                //return false; // to prevent close the modal.
                // or
                //return 'aRandomButton'; // set a button handler, 'aRandomButton' prevents close. 
            },
        buttons: { 
            cancel: function () { 
                // enableButton();
            },
            
            somethingElse: {
                text: 'Confirm',
                btnClass: 'btn-green',
                keys: ['enter', 'shift'],
                action: function(){ 
                    
                    // initialize product order 
                    var po = JSON.parse( getStorage('product_order') );
                    var nmc = JSON.parse( getStorage('none-modifiable-item') );
                    po.none_modifiable_component = nmc;
                    postWithHeader(routes.orderSlip, po , function(response){ 
                        setStorage('selected_guest_no','');
                        redirectTo('/');
                    }); 
                    
                }
            }
        }
    });
 
});

function getComponentsOfProduct(){
    let outlet = JSON.parse(getStorage('outlet'));  
    let data = {
        product_id  : getStorage('selected-product'),
        outlet_id   : outlet.id,
        group_by    : 'mc'
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

function getComponentsNonModifiableOfProduct(){
    let outlet = JSON.parse(getStorage('outlet'));  
    let data = {
        product_id  : getStorage('selected-product'),
        outlet_id   : outlet.id,
        group_by    : 'nmc'
    }; 
    postWithHeader(routes.productComponents, data, function(response){
        if(response.success == false){ 
            showError('',response.message, function(){
            });
            return;
        }
        console.log(response.result.data);
        var container = $('.nmc');
        container.empty();
        $.each(response.result.data, function(k,v){
            container.append(
                // '<li> '+ v.description+' | ' + parseInt(v.quantity, 10) + '</li>'
                '<li> '+ v.description+' </li>'
            );
        });

        setStorage('none-modifiable-item', JSON.stringify(response.result.data));

    });
}

function componentsDisplayer(data){
    var cc = $('.components-container');
    cc.empty();

    var po = JSON.parse( getStorage('product_order') );  

    $.each(data, function(k,v){ 
        v.quantity = parseInt(v.quantity, 10);  
        po.others.push({
            product_id : parseInt(v.product_id),
            name : v.description,
            price : 0,
            qty : v.quantity,
            main_product_id : parseInt(po.product_id),
            main_product_component_id : parseInt(v.product_id),
            main_product_component_qty : v.quantity,
            total : (v.quantity * 0), 
            part_number : v.product_partno,
            others: []
        });

        var _id = po.product_id+'-'+v.product_id;
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
                        '<span>(<i class="text-success" id="'+_id+'-qty">0</i> )</span>'+
                        '<button '+
                        'id="'+_id+'-minus" '+ 
                        'data-main_product_component_id="'+product.product_id+'" '+ 
                        'data-main_product_id="'+getStorage('selected-product')+'" '+
                        'data-name="'+v.short_code+'" '+
                        'data-price="'+v.price+'" '+
                        'data-product_id="'+v.product_id+'" '+
                        'class="btn btn-danger btn-inverse btn-xs no-mrg-btm mrg-left-10 border-radius-4">'+
                            '<i class="fa fa-minus"></i>'+
                        '</button> '+ 
                        '<button '+ 
                        'id="'+_id+'-plus" '+
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
        var po = JSON.parse( getStorage('product_order') );  
        $.each(po.others, function(k,v){ 
            if(data.main_product_component_id == v.main_product_component_id){ 
                var _index_to_remove = -1;
                $.each(v.others, function(kk,vv){ 
                    if(data.product_id == vv.product_id){  
                        if(vv.qty > 0){
                            v.qty++; 
                            vv.qty--;
                            vv.total = vv.price * vv.qty;  
                            if(vv.qty == 0){ 
                                var _id = '#'+po.product_id+'-'+v.product_id+'-categories-'+vv.product_id+'-qty';
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
        setStorage('product_order', JSON.stringify(po)); 
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
        var po = JSON.parse( getStorage('product_order') );  

        // check if the selected sub component category is exist in sub component
        $.each(po.others, function(k,v){ 
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
                            main_product_id : parseInt(po.product_id),
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
        setStorage('product_order', JSON.stringify(po)); 

        logicDisplay();
    });
}

function logicDisplay(){ 
    console.log('moew');
    var grand_total = 0; 

    var po = JSON.parse( getStorage('product_order') );  
     
        
        /**
         * MAIN PRODUCT SECTION
         */ 
        grand_total += po.total; 
        $('#m-product-qty').val(po.qty);   


        /**
         * COMPONENTS SECTION
         */
        $.each(po.others, function(k,v){
            $('#'+po.product_id+'-'+v.product_id).text(v.qty);
        }); 




        /**
         * SUB COMPONENTS SECTION
         */
        $.each(po.others, function(k,v){
            $.each(v.others, function(kk,vv){ 
                var _id = '#'+po.product_id+'-'+v.product_id+'-categories-'+vv.product_id+'-qty';
                $(_id).text(vv.qty);
                grand_total += vv.total;
            });
        });
    
    console.log(':: ' + numberWithCommas(grand_total));
    $('#grand-total').text('TOTAL : ' + numberWithCommas(grand_total));
}

$('input[type=radio][name=guest-type]').change(function() {
    var po = JSON.parse( getStorage('product_order') );
    po.guest_type = parseInt(this.value);
    setStorage('product_order', JSON.stringify(po)); 

    // discount();
});

// $('#guest-no').on('change', function(){
//     var po = JSON.parse( getStorage('product_order') );
//     po.guest_no = parseInt(this.value);
//     setStorage('product_order', JSON.stringify(po)); 
//     discount();
// });

function discount(){
    var new_price = 0;
    var po = JSON.parse( getStorage('product_order') );
  
    po.total_without_vat = (po.total/1.12);
    po.vat = po.total_without_vat * .12 ;

    if (po.guest_type == 2 || po.guest_type == 3 ){  
        po.discount= po.total_without_vat * .20;
        
        new_price = po.total_without_vat - po.discount;
    }else{
        po.discount = 0;
        new_price = po.total - po.discount;
    }
    
    setStorage('product_order', JSON.stringify(po));
    

    $('#grand-total').text('TOTAL : ' + numberWithCommas(new_price));
}
