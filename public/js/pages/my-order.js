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
    $.each(details, function(k,v){
        
        var total = 0;

        os_txt += '<tr>'+
            '<td width="">'+
                '<div class="list-info">'+ 
                    '<div class="thumb-img font-size-20">'; 
        console.log(v);
        // main
        $.each(v, function(kk,vv){ 
            if(vv.product_id == vv.main_product_id){
                total += (vv.qty * vv.srp);
                os_txt += vv.qty + 'X' +
                    '</div>'+
                    '<div class="info">'+
                        '<span class="title">'+vv.name+'</span>';
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
                    '<button class="btn btn-info btn-sm">'+
                            '<i class="ti-pencil"></i>'+
                    '</button>'+
                    '<button class="btn btn-danger btn-sm">'+
                            '<i class="ti-trash"></i>'+
                    '</button>'+
                '</div> '+
            '</td>'+
        '</tr>';

        sub_total += total;
    });

    os_container.append(os_txt);

    //total  
    $('#sub-total').text( numberWithCommas(sub_total) + '' );
}