$(document).ready(function(){ 
    cl(['login.js']);
    if(!isLogin()){
        redirectTo('/login');
        return;
    }

    //getCategories();

    checkIfThereIsAnActiveOrder();
});

function checkIfThereIsAnActiveOrder(){
    getWithHeader(
        routes.aboutTableSomething.checkIfThereIsAnActiveOrder,
        {},
        function(response){
            console.log(response);

            if(response.success == false && response.status == 200){
                redirectTo('/tables');
                return;
            }


            if(getStorage('selected_guest_no')==''){
                redirectTo('guest-selection');
                return;
            }
            //redirect to guest selection.
            //redirectTo('/guest-selection');
            getCategories();
        });
}

function getCategories(){
    postWithHeader(routes.categories, {}, function(response){
        if(response.success == false){  
            showError('',response.message, function(){
            });
            return;
        }
        cl([response.data]);
        displayCategories(response.data);
    });
}

function displayCategories(data){

    var cc = $('#container');

    cc.empty();

    $.each(data, function(k,v){ 
        cc.append(
            '<div class="col-md-4">'+
                '<a href="#'+v.group_id+'" class="card mrg-btm-15 scroll-to" data-group-id="'+v.group_id+'" data-group-desc="'+v.description+'">'+
                    '<div class="card-block padding-25">'+
                        '<ul class="list-unstyled list-info">'+
                            '<li> '+
                                '<div class="info"  style="padding-left: 0px;">'+
                                    '<b class="text-dark font-size-18">'+v.description+'</b>'+
                                '</div>'+
                            '</li>'+
                        '</ul>'+
                    '</div>'+
                '</a>'+
            '</div>'
        );
    });

    btnCategory();
}

function btnCategory(){
    $('.card.mrg-btm-15.scroll-to').on('click', function(){ 
        setStorage('selected-category', $(this).data('group-id'));
        redirectTo('/sub-category');
    });
}