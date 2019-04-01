$(document).ready(function(){
    console.log('sub-category.js'); 
    if(!isLogin()){
        redirectTo('/login');
        return;
    } 

    getSubCategories();
});

function getSubCategories(){
    postWithHeader(routes.subCategories, {
        group_id: getStorage('selected-category')
    }, function(response){
        if(response.success == false){
            if(response.status == 401){
                clearStorage(); 
                showError('UNAUTHORIZED ACCESS','', function(){ 
                    redirectTo('/login');
                });
                return;
            }

            showError('',response.message, function(){
            });
            return;
        }
        console.log(response.data); 
        displayCategories(response.data);
    });
}

function displayCategories(data){

    var cc = $('#container');

    cc.empty();

    $.each(data, function(k,v){
        console.log(k,v);
        cc.append(
            '<div class="col-md-4">'+
                '<a href="#'+v.category_id+'" class="card mrg-btm-15 scroll-to" data-group-id="'+v.category_id+'" data-group-desc="'+v.description+'">'+
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
        console.log('....' + $(this).data('group-id'));
        showSuccess(''+$(this).data('group-desc'),'', function(){

        });
        setStorage('selected-sub-category', $(this).data('group-id'));
        redirectTo('/sub-category/products');
    });
}