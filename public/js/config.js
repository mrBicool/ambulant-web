"use strict";

$(document).ready(function(){ 
    //
    $('.ui.dropdown').dropdown();
 
    $('.login').on('click',function(){
        redirectTo('/login');
    });  
 
    btnLogin();  
    btnLogout();  

    if( getStorage('token') != null || getStorage('token') != '' ){
         $('.current-user-name').text( getStorage('name') );
    }
}); 

//global variable for all page  
var api = 'http://172.16.12.130:8005/api';
var local_printer_api = "http://instafood-printer.dsc:8082/api";
var routes = {
    login:                      '/login',
    categories:                 '/outlet/category',
    subCategories:              '/outlet/category/sub-category',
    products:                   '/outlet/category/sub-category/products',
    product:                    '/product',
    productComponents:          '/product/components',
    productComponentCategories: '/product/component/categories',
    orderSlip:                  '/orderslip',
    orderSlipActive:            '/orderslip/active'
};
let main_cart;
var main_cart_other;

//
// Requests GET | POST
//
function post(url, request, callback) {
    $.ajax({
        url: api + url,
        type: "POST",
        dataType: "json",
        data: request,
        headers: {
            //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (data) {

            // if(data.status == 401){
            //     clearStorage(); 
            //     redirectTo('/login');
            //     return;
            // }

            if(data.status == 500){
                showWarning('',data.message, function(){});
                return;
            } 

            callback(data);
        },
        error: function (data) {
            console.log(data);
            showError('Server error' + data, 'Please ask the system administrator about this problem!', function () {

            });
        }
    });
}

function postWithHeader(url, request, callback) { 
    $.ajax({
        url: api + url,
        type: "POST",
        dataType: "json",
        data: request,
        headers: {
            //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'), 
            'Authorization':    'Bearer '+getStorage('api_token'),
            'Accept':           'application/json'
        },
        beforeSend: function (xhr) {
            //xhr.setRequestHeader('Authorization', 'Bearer '+getStorage('api_token') );
        },
        success: function (data) {

            if(data.status == 401){
                clearStorage();
                redirectTo('/login');
                return;
            }

            if(data.status == 500){
                showWarning('',data.message, function(){});
                return;
            }

            callback(data);
        },
        error: function (data) {
            console.log(data, data.status);
            showError('Server error', 'Please ask the system administrator about this problem!', function () {

            });
        }
    });
}

function get(url, request, callback) {
    $.ajax({
        url: api + url,
        type: "GET",
        dataType: "json",
        data: request,
        headers: {
            //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (data) {  

            callback(data);
        },
        error: function (data) {
            showError('Server error', 'Please ask the system administrator about this problem!', function () {

            });
        }
    });
}

function getWithHeader(url, request, callback) {
    $.ajax({
        url: api + url,
        type: "GET",
        dataType: "json",
        data: request,
        headers: {
            //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content'),
            'Authorization':    'Bearer '+getStorage('api_token'),
            'Accept':           'application/json'
        },
        success: function (data) {  
            
            if(data.status == 401){
                clearStorage();
                redirectTo('/login');
                return;
            }

            if(data.status == 500){
                showWarning('',data.message, function(){});
                return;
            }

            callback(data);
        },
        error: function (data) {
            showError('Server error', 'Please ask the system administrator about this problem!', function () {

            });
        }
    });
}

function customPost(url, request, callback) {
    $.ajax({
        url: url,
        type: "POST",
        dataType: "json",
        data: request,
        headers: {
            //'X-CSRF-TOKEN': $('meta[name="csrf-token"]').attr('content')
        },
        success: function (data) {
            callback(data);
        },
        error: function (data) {
            console.log(data);
            showError('Server error', 'Please ask the system administrator about this problem!', function () {

            });
        }
    });
}


//
// Authentication Handler
//
function isLogin() {
    var token = getStorage('api_token');
    if (token == '' || token == null) {
        return false; //says that the user is not loggedin
    }
    return true; // says that the user is current loggedin 
}

function logout() {
    clearStorage();
    redirectTo("/login");
}

// local storage
function setStorage(key, value){
    localStorage.setItem(key, value);
}

function getStorage(key){
    return localStorage.getItem(key);
}

function clearStorage() {
    localStorage.clear();
}

function redirectTo(link) {
    window.location.href = link;
}

function showInfo(title, message, callback) {
    iziToast.info({
        title: title,
        message: message,
        position: 'bottomLeft',
        // backgroundColor: 'rgba(129,212,250, 1)',
        onClosed: function () {
            callback();
        },
        displayMode : 'replace'
    });
}

function showSuccess(title, message, callback) { 

    iziToast.success({
        title: title,
        message: message,
        position: 'bottomLeft',
        onClosed: function () {
            callback();
        },
        displayMode : 'replace'
    });

}

function showWarning(title, message, callback) {
    iziToast.warning({
        title: title,
        message: message,
        position: 'bottomLeft',
        onClosed: function () {
            callback();
        },
        displayMode : 'replace'
    });
}

function showError(title, message, callback) {
    iziToast.error({
        title: title,
        message: message,
        position: 'bottomLeft',
        onClosed: function () {
            callback();
        },
        displayMode : 'replace'
    });
}

function getParams(id) {
    var urlParams = new URLSearchParams(window.location.search);
    var x = urlParams.get(id); //getting the value from url parameter
    return x;
}

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

function validateContactNumber(value) {
    //var regEx = /^([ 0-9\(\)\+\-]{8,})*$/; // accept any phone or mobile number
    var regEx = /^(09|\+639)\d{9}$/; // accept only PH Mobile number 
    if (!value.match(regEx)) {
        return false;
    }
    return true;
}

function cl(arr = arr() ){
    arr.forEach(element => {
        console.log(element);
    });
}

function text_truncate(str, length, ending) {
    if (length == null) {
      length = 100;
    }
    if (ending == null) {
      ending = '...';
    }
    if (str.length > length) {
      return str.substring(0, length - ending.length) + ending;
    } else {
      return str;
    }
};

function FormatNumberLength(num, length) {
    var r = "" + num;
    while (r.length < length) {
        r = "0" + r;
    }
    return r;
}

function getBase64Image(img) {
    // Create an empty canvas element
    var canvas = document.createElement("canvas");
    canvas.width = img.width;
    canvas.height = img.height;

    // Copy the image contents to the canvas
    var ctx = canvas.getContext("2d");
    ctx.drawImage(img, 0, 0);

    // Get the data-URL formatted image
    // Firefox supports PNG and JPEG. You could check img.src to
    // guess the original format, but be aware the using "image/jpg"
    // will re-encode the image.
    var dataURL = canvas.toDataURL("image/png");

    return dataURL.replace(/^data:image\/(png|jpg);base64,/, "");
}

function numberWithCommas(number) {
    number = number.toFixed(2);
    var parts = number.toString().split(".");
    parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    return parts.join(".");
} 

//=======================================================================

function btnLogin(){
    $('#btn-login').on('click',function(){
        window.location.href = '/login';
    });
}

function btnLogout() {
    $('.btn-logout').on('click', function () { 
        logout();
    });
}

//global app functionalities
 
function showStoreOutletName(){
    return getStorage('outlet_name');
} 

function updateClock() {
    $('#clock').html(moment().format('D. MMMM h:mm:ss A'));
}

function printOS(data, response_data){
    console.log(data, response_data, response_data.orderslip_id); 

    var customer_information = null;
    if (data.others.mobile_number != null){
        customer_information = [
            {
                columns: [
                    {
                        text: 'Customer Information'
                    }
                ],
                style: 'cust_info_header'
            },
            {
                columns: [
                    {
                        text: 'Name \t\t : ' + data.others.customer_name
                    }
                ],
                style: 'cust_info_detail'
            },
            {
                columns: [
                    {
                        text: 'Mobile No. : +63-' + data.others.mobile_number
                    }
                ],
                style: 'cust_info_detail',
                margin: [15, 0, 0, 15],
            }
        ];
    }

    var items = [];
    $.each(data.items, function(k,v){

        var price   = parseFloat(v.item.srp);
        var qty     = v.ordered_qty;
        var amount  = (qty * price).toFixed(2);

        var data = {
            columns: [
                {
                    text: v.ordered_qty+'x',
                    margin: [5, 0, 0, 0],
                    width: 25,
                },
                {
                    text: v.item.description,
                    margin: [0, 0, 0, 0],
                    width: 125,
                },
                {
                    text: 'Php ' + numberWithCommas(amount),
                    alignment: 'right',
                    width: 70,
                    margin: [0, 0, 10, 0],
                }
            ],
            fontSize: '8',
            margin: [0, 2, 0, 0],
        };  
        items.push(data);
        //=============================================================

        $.each( v.components, function(kk,vv) {
            console.log(vv);
            if (vv.item.quantity > 0){
                var price   = parseFloat(vv.item.rp);
                var qty     = vv.item.quantity;
                var amount  = (0).toFixed(2);
                
                var data = {
                    columns: [
                        {
                            text: '',
                            margin: [5, 0, 0, 0],
                            width: 25,
                        },
                        {
                            text: '+ (' +qty + ') ' + vv.item.description,
                            margin: [0, 0, 0, 0],
                            width: 125,
                        },
                        {
                            text: 'Php ' + numberWithCommas(amount),
                            alignment: 'right',
                            width: 70,
                            margin: [0, 0, 10, 0],
                        }
                    ],
                    fontSize: '8',
                    margin: [0, 2, 0, 0],
                };
                items.push(data); 
            }

            //=============================================================
            $.each(vv.selectable_items, function (kkk, vvv) {
                if (vvv.qty > 0) {
                    var price = parseFloat(vvv.price);
                    var qty = vvv.qty;
                    var amount = (qty * price).toFixed(2);
                    var data = {
                        columns: [
                            {
                                text: '',
                                margin: [5, 0, 0, 0],
                                width: 25,
                            },
                            {
                                text: '+ (' + qty + ') ' + vvv.short_code,
                                margin: [0, 0, 0, 0],
                                width: 125,
                            },
                            {
                                text: 'Php ' + numberWithCommas(amount),
                                alignment: 'right',
                                width: 70,
                                margin: [0, 0, 10, 0],
                            }
                        ],
                        fontSize: '8',
                        margin: [0, 2, 0, 0],
                    };
                    items.push(data);
                }
            });

        });
        //=============================================================
        
        // appending intruction
        if( v.instruction != null){
            var data = {
                columns: [
                    {
                        text: '',
                        margin: [5, 0, 0, 0],
                        width: 25,
                    },
                    {
                        text: '+ '+v.instruction,
                        margin: [0, 0, 0, 0],
                        width: 125,
                    },
                    {
                        text: '',
                        alignment: 'right',
                        width: 70,
                        margin: [0, 0, 10, 0],
                    }
                ],
                fontSize: '8',
                margin: [0, 2, 0, 0],
            };
            items.push(data);
        }

    });
    console.log(items);

    var docDefinition = {
        content: [
            {
                columns: [
                    {
                        text: 'Enchanted Kingdom',
                    }
                ],
                style: 'header'
            },

            {
                columns: [
                    { 
                        qr: '' + response_data.orderslip_id
                    }
                ],
                style: 'qrcode',
            },

            {
                columns: [
                    {
                        text: 'Order Slip No: ' + response_data.orderslip_id
                    }
                ],
                style: 'os_no'
            },

            customer_information,

            // {
            //     columns: [
            //         {
            //             text: 'Type: ' + data.items.order_type
            //         }
            //     ],
            //     style: 'cust_info_header'
            // },

            items
        ],
        styles: {
            /**
             * HEADER
             */
            header: {
                alignment: 'center',
                margin: [0, 10, 0, 0],
                fontSize: '15',
                bold: true
            },

            /**
             * QR Code
             */
            qrcode: {
                alignment: 'center',
                margin: [0, 15, 0, 0],
            },

            /**
             * OS #
             */
            os_no: {
                alignment: 'center',
                margin: [0, 10, 0, 15],
                fontSize: '10',
            },

            /**
             * Customer Info
             */
            cust_info_header: {
                alignment: 'left',
                margin: [15, 10, 0, 0],
                fontSize: '9',
                bold: true
            },
            cust_info_detail: {
                alignment: 'left',
                margin: [15, 0, 0, 0],
                fontSize: '8'
            }


        },

        //pageSize: 'A5',
        pageSize: { width: 220, height: 'auto' },
        // [left, top, right, bottom] or [horizontal, vertical] or just a number for equal margins
        pageMargins: [2, 0, 0, 15],
    };

    // if (v == 'preview') {
        //pdfMake.createPdf(docDefinition).open();
    // }

    // if (v == 'download') {
        pdfMake.createPdf(docDefinition).download(
            'Enchanted Kingdom OR - ' +
            '.pdf'
        );
    // }

}

function init(){ 
    var product_order = null;
    setStorage('product_order', JSON.stringify(product_order)); 
}