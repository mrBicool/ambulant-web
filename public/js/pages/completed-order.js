$(document).ready(function(){ 
    cl(['my-order.js']);
    if(!isLogin()){
        redirectTo('/login');
        return;
    } 

    getCompleted();
});

function getCompleted(){
    let outlet = JSON.parse(getStorage('outlet'));  
    var data = {
        outlet_id : outlet.id
    }
    getWithHeader(routes.orderSlipHeader.completedByOutlet, data, function(response){
        if(response.success == true){  
            completedDisplayer(response.result); 
        }
    });
}

function completedDisplayer(items){
    var cc = $('#container'); 
    $.each(items, function(k,v){  
        var net_amount = v.net_amount;
        cc.append(
            '<div class="col-md-12">'+
                '<a data-header-id="'+v.orderslip_header_id+'" data-status="'+v.status+'" data-prepared-by="'+v.cce_name+'"  class="btn-so card mrg-btm-15 scroll-to bg-default" href="#'+v.orderslip_header_id+'">'+
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
                                    '<div class="col-md-4">'+
                                        '<div class="pdd-vertical-5">'+
                                            '<p class="no-mrg-btm"><b class="font-size-24">'+v.orderslip_header_id+'</b> OS#</p>'+
                                        '</div>'+
                                    '</div>'+
                                    // '<div class="col-md-3">'+
                                    //     '<div class="pdd-vertical-5">'+
                                    //         '<p class="no-mrg-btm"><b class="font-size-24">2</b> Item Count</p>'+
                                    //     '</div>'+
                                    // '</div>'+
                                    '<div class="col-md-4">'+
                                        '<div class="pdd-vertical-5">'+
                                            '<p class="no-mrg-btm"><b class="font-size-24">'+numberWithCommas(net_amount)+'</b> Total</p>'+
                                        '</div>'+
                                    '</div>'+
                                    '<div class="col-md-4">'+
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
}