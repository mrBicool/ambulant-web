$(document).ready(function(){ 
    cl(['my-order.js']);
    if(!isLogin()){
        redirectTo('/login');
        return;
    } 

    getOrders();
});

function getOrders(){
    getWithHeader(routes.orderSlipActive,{}, function(response){
        if(response.success == true){ 
            cl([response]);
            osDisplayer(response.result.header,response.result.details);
            
        }
    });
}

function osDisplayer(header, details){

    /**
     * Checker 
     */
    var ifHasNoPendingOrder = $('.if-has-no-pending-order');
    var ifHasPendingOrder = $('.if-has-pending-order');
    if(header == null && details == null){
        ifHasNoPendingOrder.show();
        ifHasPendingOrder.hide();
    }else{
        ifHasNoPendingOrder.hide();
        ifHasPendingOrder.show();
    }

    /**
     * PROCESS
     */
    // header id
    $('#order-slip-id').text(header.orderslip_header_id); 

    var os_container = $('#os-container');
    var os_txt = '';
    var sub_total = 0;
    // details
    os_container.empty();
    $.each(details, function(_k, _v){
        $.each(_v, function(k,v){ 
            var total = 0;
            var header_id = null;
            var main_product_id = null;
            var sequence = null;
            os_txt += '<tr>'+
                '<td width="">'+
                    '<div class="list-info">'+ 
                        '<div class="thumb-img font-size-20">';  
            // main
            $.each(v, function(kk,vv){ 
                if(vv.product_id == vv.main_product_id){
                    total += (vv.qty * vv.srp);
                    os_txt += vv.qty + 'X' +
                        '</div>'+
                        '<div class="info">'+
                            '<span class="title">'+vv.name+'</span>';
                    
                        header_id = vv.orderslip_header_id;
                        main_product_id = vv.main_product_id;
                        sequence = vv.sequence;
                }
            });
    
            // components
                // sub components
                $.each(v, function(kk,vv){ 
                    if(vv.product_id != vv.main_product_id){
                        total += (vv.qty * vv.srp);
                        const  _total = (vv.qty * vv.srp) <= 0 ? 'FREE' : (vv.qty * vv.srp);
                        os_txt += 
                                '<span class="sub-title">+ '+ vv.qty + 'x ' +vv.name+' ( '+ _total + ' )</span>';
                    }
                });
    
            // instruction
            $.each(v, function(kk,vv){ 
                if(vv.product_id == vv.main_product_id){
                     if(vv.remarks != null){
                         os_txt += '<span class="sub-title">+ '+vv.remarks+'</span>';
                     }
                }
            });
    
            os_txt += '</div>'+
                    '</div>'+
                '</td> '+
                '<td width="30%" class="text-right">'+
                    '<div class="relative mrg-top-10">  '+
                        '<span class="pdd-right-20"> ('+ numberWithCommas(total) +') </span> '+
                        '<button data-header-id="'+header_id+'" data-main-product-id="'+main_product_id+'" data-sequence="'+sequence+'" class="btn btn-info btn-sm">'+
                                '<i class="ti-pencil"></i>'+
                        '</button>'+
                        '<button class="btn btn-danger btn-sm btn-product-remove" id="'+main_product_id+'-'+sequence+'" data-header-id="'+header_id+'" data-main-product-id="'+main_product_id+'" data-sequence="'+sequence+'">'+
                                '<i class="ti-trash"></i>'+
                        '</button>'+
                    '</div> '+
                '</td>'+
            '</tr>'; 
            sub_total += total;    
        });
    });
    
    btnProductRemove();

    os_container.append(os_txt);

    //total  
    $('#sub-total').text( numberWithCommas(sub_total) + '' ); 

    // headcounts
    $('#head-count').val(header.total_hc);

    setStorage('order-slip', JSON.stringify({ header , details }));

    // customer info
    if(header.mobile_number == null){
        hideCustomerCard(); 
    }else{
        showCustomerCard(header
            
            .customer_name);
    }
}

function btnProductRemove(){
    $('.btn.btn-danger.btn-sm.btn-product-remove').on('click', function(){ 
        console.log('test');
    }); 
}
 


$('#btn-head-count-minus').on('click', function(){
    var hc = parseInt($('#head-count').val());

    // logic
    if(hc > 1){
        hc--;
    } 
    // save
    var os = JSON.parse( getStorage('order-slip') );
    os.header.total_hc = hc;  
    setStorage('order-slip', JSON.stringify(os));
    // show new value
    $('#head-count').val(hc);
});

$('#btn-head-count-plus').on('click', function(){
    var hc = parseInt($('#head-count').val());
    
    // logic
    hc++;
    // save
    var os = JSON.parse( getStorage('order-slip') );
    os.header.total_hc = hc;  
    setStorage('order-slip', JSON.stringify(os));
    // show new value
    $('#head-count').val(hc);
});

$('#btn-search').on('click', function(){
    cl(['clicked']);
    var mobile_number = $('#mobile-number');
    
    var data = {
        search_by : "mobile_number",
        mobile_number : mobile_number.val()
    };
    getWithHeader(routes.customerSearch, data, function(response){
        cl([response]); 

        if(response.success == false){ 
            // logic
            var os = JSON.parse( getStorage('order-slip') );
            os.header.customer_id = null;
            os.header.customer_name = null;
            os.header.mobile_number = null; 
            // save 
            setStorage('order-slip', JSON.stringify(os));
            // display
            hideCustomerCard();
            return;
        } 
        // logic
        var os = JSON.parse( getStorage('order-slip') );
        os.header.customer_id = response.result.customer_id;
        os.header.customer_name = response.result.name;
        os.header.mobile_number = response.result.mobile_number; 
        // save
        setStorage('order-slip', JSON.stringify(os));
        // display
        showCustomerCard(response.result.name,response.result.points);  
    });
});


function hideCustomerCard(){
    var hide_customer = $('#hide-customer');
    var show_customer = $('#show-customer');
    hide_customer.show();
    show_customer.hide(); 
}

function showCustomerCard(name='',points=0,wallet=0){
    var hide_customer = $('#hide-customer');
    var show_customer = $('#show-customer');
    hide_customer.hide();
    show_customer.show();
    $('#customer-name').text(name);
    $('#customer-points').text(numberWithCommas(points));
    // $('#customer-wallet').text(numberWithCommas(response.result.wallet));
}


$('#btn-save-changes').on('click', function(){
    cl(['clicked']);
    var os = JSON.parse( getStorage('order-slip') );
    var data = {
        _method : 'PATCH',
        branch_id : os.header.branch_id,
        orderslip_header_id : os.header.orderslip_header_id,
        TOTALHEADCOUNT : os.header.total_hc,
        CELLULARNUMBER : os.header.mobile_number,
        CUSTOMERCODE : os.header.customer_id,
        CUSTOMERNAME : os.header.customer_name
    };
    postWithHeader(routes.orderSlipHeader.patch, data, function(response){
        if(response.success == false){
            showWarning('', response.message, function(){

            });
            return;
        }

        showSuccess('', 'Changes has been save.', function(){

        });
    });
});

$('.btn-print-order-slip').on('click', function(){
    cl(['test']);
    var os = JSON.parse( getStorage('order-slip') ); 
    var data = {
        header : 'Enchanted Kingdom',
        os : os,
        server_info : {
            name : getStorage('name'), 
        }, 
        currency: 'PHP'
    };
    customPost(local_printer_api+'/print/order-slip',data, function(response){
        cl([response]);
    });
});