"use strict"
$(document).ready(function(){
    cl(['sub-category.js']); 
    if(!isLogin()){
        redirectTo('/login');
        return;
    }  

    btnSubmit();

    btnClaim();
});

function btnSubmit(){
    $('#btn-submit').on('click', function(){
        let code = $('#txt-code');

        if(code.val().trim() == ''){
            code.addClass('error');
            code.focus();
            $('#if-succes').hide();
            showWarning('','Code is requried!', function(){

            });
            return;
        }

        var outlet = JSON.parse(getStorage('outlet'));
        var data = {
            code : code.val().trim(),
            outlet_id : outlet.id
        };
        getWithHeader('/claiming/check-code',data, function(response){
            if(response.success == false){
                code.addClass('error');
                code.focus();
                showWarning('', response.message, function(){});
                $('#if-succes').hide();
                return;
            }

            code.removeClass('error');

            $('.product-qty').text(response.data.product.qty +'X');

            var container = $('.product-container');
            container.empty();
            container.append(
                '<span class="title">'+ response.data.product.part_description+'</span>'
            );

            $.each(response.data.components.data, function(k,v){
                container.append(
                    '<span class="sub-title">+ '+ parseInt(v.quantity) + 'x ' + v.description +'</span>'
                );
            });

            var data = {
                code : code.val().trim(),
                product_id : response.data.product.sitepart_id,
                qty : response.data.product.qty,
                tag : 'food',
                outlet_id: outlet.id
            }; 
            setStorage('for-claiming', JSON.stringify(data));
 
            $('#if-succes').show();

        });
        console.log('test');
    });
}

function btnClaim(){
    $('#btn-claim').on('click', function(){ 
        let code = $('#txt-code');
        var fc = JSON.parse( getStorage('for-claiming') ); 
        postWithHeader('/claiming', fc, function(response){
            console.log(response);
            if( response.success == false){
                code.addClass('error');
                code.focus();
                showWarning('', response.message, function(){});
                return;
            }

            showSuccess('', response.message, function(){});
            redirectTo('');
        });
    });
}