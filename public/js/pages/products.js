"use strict"
$(document).ready(function(){
    cl(['sub-category.js']); 
    if(!isLogin()){
        redirectTo('/login');
        return;
    } 

    getProducts();
});


let paginate_counter = 1;
function getProducts(){
    postWithHeader(routes.products, {
        group_id: getStorage('selected-category'),
        category_id: getStorage('selected-sub-category'),
        page : paginate_counter
    }, function(response){
        
        if(response.success == false){ 
            showError('',response.message, function(){
            });
            return;
        }
 
        displayProducts(response.result.data);
        if( response.result.next_page_url != null){
            paginate_counter++;
            getProducts();
        } 
    });
}

function displayProducts(data){

    var cc = $('#container');

    cc.empty();

    $.each(data, function(k,v){
        cl([
            v
        ]); 
        cc.append(
            '<div class="col-md-4">'+
                '<a href="#'+v.product_id+'" class="card mrg-btm-15 scroll-to" data-product-id="'+v.product_id+'" data-product-desc="'+v.description+'">'+
                    '<div class="card-block padding-25">'+
                        '<ul class="list-unstyled list-info">'+
                            '<li>'+ 
                                '<div class="text-center">'+
                                // '<span class="thumb-img " style="border:1px solid gray">'+
                                    // '<i class="ti-help-alt text-primary font-size-30"></i>'+
                                    '<img src="/assets/products/sample.jpg" class=" " style="width:200px; height:200px;">'+
                                // '</span>'+
                                '</div>'+
                                '<div class="info"  style="padding-left: 0px;">'+
                                    v.srp +
                                    '<b class="text-dark font-size-18">&nbsp;| '+v.description+'</b>'+
                                '</div>'+
                            '</li>'+
                        '</ul>'+
                    '</div>'+
                '</a>'+
            '</div>'
        );
    });
    
    btnProduct();
}

function btnProduct(){
    $('.card.mrg-btm-15.scroll-to').on('click', function(){  
        setStorage('selected-product', $(this).data('product-id'));
        redirectTo('/product');
    });
}