$(document).ready(function(){ 
    cl(['tables.js']);
    if(!isLogin()){
        redirectTo('/login');
        return;
    } 

    getTables(); 
});


function getTables(){
    getWithHeader('/tables',{}, function(response){
        //console.log(response);

        if(response.success == false){
            return;
        }

        var container = $('#table-container');
        container.empty();
        // showing all the tables
        $.each(response.data, function(k,v){
            console.log(v);
            var status = 'badge-success';
            //var status_bolean = true;
            if(v.is_available == false){
                status = 'badge-warning';
                //status_bolean = false;
            }
            container.append(
                '<div class="col-md-3 card col-sm-4 text-center mr-3">  '+
                    '<div class="card-body">'+
                        '<span class="badge badge-pill '+status+' namber" >'+v.number+'</span>'+
                        '<img data-is-available="'+v.is_available+'" data-id="'+v.id+'" src="/assets/images/table.png" class="img-fluid tbl-order-guest" alt="Responsive image">'+
                    '</div>'+ 
                '</div> '
            );
        });
        tableSelection();
    });
}

function tableSelection(){
    $('.tbl-order-guest').on('click', function(){

        var self = $(this); 

        if( self.data('is-available') == false ){
            showWarning('','Unavailable, Please Select other table!', function(){

            });
            return;
        }


        var data = {
            table_id : self.data('id')
        };
        postWithHeader(routes.tableEntry, data, function(response){
            if(response.success == false){  
                showError('',response.message, function(){
                });
                return;
            }
            
            setStorage('selected_table_id',self.data('id'));
            setStorage('selected_guest_no','');
            redirectTo('/guest-selection');
        }); 

    });
}