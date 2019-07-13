$(document).ready(function(){ 
    cl(['my-order.js']);
    if(!isLogin()){
        redirectTo('/login');
        return;
    } 

    getPending();
});

function getPending(){
    let outlet = JSON.parse(getStorage('outlet'));  
    var data = {
        outlet_id : outlet.id
    }
    getWithHeader(routes.orderSlipHeader.pendingByOutlet, data, function(response){
        if(response.success == true){ 
            cl([response.result]);  
            pendingDisplayer(response.result); 
        }
    });
}

function pendingDisplayer(items){
    var cc = $('#container'); 
    $.each(items, function(k,v){ 
        var background = 'bg-info'; 
        if(v.status == 'B' || v.status == 'b'){
            background = 'bg-success';
        }

        var net_amount = v.net_amount;
        cc.append(
            '<div class="col-md-12">'+
                '<a data-header-id="'+v.orderslip_header_id+'" data-status="'+v.status+'" data-prepared-by="'+v.cce_name+'"  class="btn-so card mrg-btm-15 scroll-to '+background+'" href="#'+v.orderslip_header_id+'">'+
                    '<ul class="list-unstyled">'+
                        '<li>'+
                            '<div class="pdd-vertical-5 pdd-horizon-10">'+ 
                                '<div class="info">'+ 
                                    '<span class="sub-title">'+
                                            '<i class="ti-timer pdd-right-5"></i>'+
                                            '<span>'+v.created_at+'</span>'+
                                    '</span>'+
                                '</div>'+
                            '</div>'+
                        '</li>'+
                    '</ul>'+
                    '<div class="card-block pt-0"> '+
                        '<div class="row">'+
                            '<div class="col-md-10 ml-auto mr-auto"> '+
                                '<div class="row">'+
                                    '<div class="col-md-3">'+
                                        '<div class="pdd-vertical-5">'+
                                            '<p class="no-mrg-btm"><b class="font-size-24">'+v.orderslip_header_id+'</b> OS No.</p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="col-md-3">'+
                                        '<div class="pdd-vertical-5">'+
                                            '<p class="no-mrg-btm"><b class="font-size-24">'+v.table_id+'</b> Table No.</p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="col-md-3">'+
                                        '<div class="pdd-vertical-5">'+
                                            '<p class="no-mrg-btm"><b class="font-size-24">'+numberWithCommas(net_amount)+'</b> Total</p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="col-md-3">'+
                                        '<div class="pdd-vertical-5">'+
                                            '<p class="no-mrg-btm"><b class="font-size-24">'+v.cce_name+'</b> Prepared By</p>'+
                                        '</div>'+
                                    '</div>'+
                                    
                                '</div>'+
                            '</div>'+
                        '</div> '+
                    '</div>'+
                '</a>'+
            '</div>'
        );
    });
    btnSo();
}

function btnSo(){
    $('.btn-so').on('click', function(){ 

        var prepared_by = $(this).data('prepared-by');
        var status      = $(this).data('status');
        var header_id   = $(this).data('header-id');
        
        var name = getStorage('name');

        $.confirm({
            title: 'Confirmation!',
            content: 'You are about to takeover this OrderSlip, do you want to continue?',
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
                        
                        if(status == 'b' || status == 'B'){
                            if(name == prepared_by){
                                showWarning('','You cannot takeover your onprocess Orderslip', function(){

                                });
                                return;
                            }
                        }

                        var data = {
                            _method: 'PATCH',
                            header_id : header_id
                        }
                        postWithHeader(routes.orderSlipChangeOs, data, function(response){
                            if(response.success == true){
                                console.log(response);
                                redirectTo('/my-order');
                            } 
                        }); 
                        
                    }
                }
            }
        });
        
    });
}