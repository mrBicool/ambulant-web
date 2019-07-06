$(document).ready(function(){ 
    cl(['login.js']);
    if(!isLogin()){
        redirectTo('/login');
        return;
    }

    if(getStorage('selected_guest_no') != ''){
        redirectTo('/');
        return;
    }
    
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
        redirectTo('/');
        return;
    });

}