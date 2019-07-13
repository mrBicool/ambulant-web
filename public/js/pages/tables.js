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
            container.append(
                '<div class="col-md-3 card col-sm-4 text-center mr-3">  '+
                    '<div class="card-body">'+
                        '<span class="badge badge-pill badge-success namber" >'+v.number+'</span>'+
                        '<img data-id="'+v.id+'" src="/assets/images/table.png" class="img-fluid tbl-order-guest" alt="Responsive image">'+
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