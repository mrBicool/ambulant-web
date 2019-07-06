@extends('layouts.master')
@section('title', "Product") 

@section('css')
<link rel="stylesheet" href="/css/plugins/jquery-confirm.min.css" /> 
 
<style>
    .namber {
        position: absolute; 
        top: 0;
        left: 0; 
        border-radius: 0; 
        height: 35px;
        width: 35px;
        padding-top:5px;
        font-size: 1.5em;
    }

   img.avatar{
       
       
   }

   .avatar-card{
    flex-basis: 200px !important ;
   }

   @media(max-width:767px){
    .avatar-card{
        flex-basis: 400px !important ;
    }
   }
   
</style> 
@endsection

@section('js')
<script src="/js/plugins/jquery-confirm.min.js"></script> 
<script src="/js/pages/product.js"></script> 
@endsection
 
@section('content')
<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/">Category</a></li>
        <li class="breadcrumb-item"><a href="/sub-category">Sub-Category</a></li>
        <li class="breadcrumb-item"><a href="/sub-category/products">Products</a></li> 
    </ol>
</nav>
<br> 
<div class="container">
    <div class="row" id="container">
        <div class="col-md-12">
                <div class="widget-profile-1 card">
                    <div class="profile border bottom">
                        <img id="product-image" class="mrg-top-30" src="" alt="" style="width:200px; height:200px;">
                        <h4 class="mrg-top-20 no-mrg-btm text-semibold" id="product_name">...</h4>
                        <p id="product_price">0.00</p>
                    </div>
                    <div class="pdd-horizon-30 pdd-vertical-20">
                        
                        <div class="row">
                            <div class="col-md-6">
                                    <div class="mrg-top-1 text-center">
                                        <div class="input-group">
                                                <input id="m-product-qty" type="text" class="form-control" placeholder="Qty" value="1" disabled>
                                                <div class="input-group-append" id="button-addon4">
                                                    <button class="btn btn-danger" type="button" id="btn-m-minus"><i class="ti-minus"></i></button>
                                                    <button class="btn btn-success" type="button" id="btn-m-plus"><i class="ti-plus"></i></button>
                                                </div>
                                            </div> 
                                    </div>
                                    <ul class="list tick bullet-primary p-3 nmc">
                                        {{-- <li>Lorem ipsum dolor sit amet</li>
                                        <li>Consectetur adipiscing elit</li>
                                        <li>Integer molestie lorem at massa</li>
                                        <li>Facilisis in pretium nisl aliquet</li>
                                        <li>Nulla volutpat aliquam velit </li> --}}
                                    </ul> 
                            </div>
                            <div class="col-md-6">
                                <div class="checkbox border bottom">
                                    <input id="is_takeout" type="checkbox" >
                                    <label for="is_takeout">Takeout</label>
                                </div>  

                                <div class="mrg-top-30 border bottom">
                                    <div class="radio radio-inline radio-primary">
                                        <input value="1" type="radio" name="guest-type" id="form-5-1" checked="">
                                        <label for="form-5-1">Regular</label>
                                    </div>
                                    <div class="radio radio-inline radio-primary">
                                        <input value="2" type="radio" name="guest-type" id="form-5-2" >
                                        <label for="form-5-2">Senior</label>
                                    </div>
                                    <div class="radio radio-inline radio-primary">
                                        <input value="3" type="radio" name="guest-type" id="form-5-3">
                                        <label for="form-5-3">Pwd</label>
                                    </div>

                                    {{-- <div class="input-icon form-group">
                                        <i class="ti-face-smile"></i>
                                        <input id="guest-no" min="1" type="number" class="form-control m-b" placeholder="Enter Guess No." value="1">
                                        <small>Enter Guess no.</small>
                                    </div> --}}

                                </div>

                                <div class="components-container">
                                    {{-- <div class="mrg-top-0">
                                        <div id="accordion-ask-2" class="accordion border-less" role="tablist" aria-multiselectable="true">
                                            <div class="panel panel-default">
                                                <div class="panel-heading" role="tab">
                                                    <h4 class="panel-title">
                                                        <a class="collapsed" data-toggle="collapse" data-parent="#accordion-ask-2" href="#collapse-ask-2" aria-expanded="false">
                                                            <span>Product Component(1)</span>
                                                            <i class="icon ti-arrow-circle-down"></i> 
                                                        </a>
                                                    </h4>
                                                </div>
                                                <div id="collapse-ask-2" class="panel-collapse collapse" style="">
                                                    <div class="panel-body"> 
                                                        <div class="row border bottom">
                                                            <div class="col-md-8">
                                                                </span>
                                                                <span class="mrg-left-0 font-size-14 text-dark ">BABY BCK RIBS ML (₱ 0.00)</span>
                                                            </div>
                                                            <div class="col-md-4 text-right">
                                                                <p class="mrg-top-10">
                                                                    <span>(0)</span>
                                                                    <a href="#" class="btn btn-danger btn-inverse btn-xs no-mrg-btm mrg-left-10 border-radius-4">
                                                                        <i class="fa fa-minus"></i>
                                                                    </a>
                                                                    <a href="#" class="btn btn-success btn-inverse btn-xs no-mrg-btm mrg-left-10 border-radius-4">
                                                                        <i class="fa fa-plus"></i>
                                                                    </a>
                                                                </p>
                                                            </div>
                                                        </div>
    
                                                    </div>
                                                </div>
                                            </div> 
                                        </div>
                                    </div> --}}
                                </div> 

                                <div class="mrg-top-0">
                                    <div id="accordion-ask-1" class="accordion border-less" role="tablist" aria-multiselectable="true">
                                        <div class="panel panel-default">
                                            <div class="panel-heading" role="tab">
                                                <h4 class="panel-title">
                                                        <a class="collapsed" data-toggle="collapse" data-parent="#accordion-ask-1" href="#collapse-ask-1" aria-expanded="false">
                                                            <span>INSTRUCTIONS(Optional)</span>
                                                            <i class="icon ti-arrow-circle-down"></i> 
                                                        </a>
                                                    </h4>
                                            </div>
                                            <div id="collapse-ask-1" class="panel-collapse collapse" style="">
                                                <div class="panel-body">
                                                        <textarea class="form-control" rows="3" id="instruction"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div> 

                            </div>
                        </div> 
                    </div>
                    <div class="card-footer border top">
                        <ul class="list-unstyled list-inline text-right pdd-vertical-5">
                            <li class="list-inline-item" id="grand-total">
                                TOTAL : 0.00
                            </li>
                            <li class="list-inline-item">
                                <button class="btn btn-info add-to-order">Submit</button>
                            </li>
                            <li class="list-inline-item">
                                <button class="btn btn-primary" data-toggle="modal" data-target="#modal-lg">Change guest no.</button>
                            </li>
                        </ul>
                    </div>
                </div>
        </div> 
    </div>
</div>

<div class="modal fade" id="modal-lg">
    <div class="modal-dialog modal-lg" role="document">
        <div class="modal-content">
            <div class="modal-body">

                <a class="modal-close" href="#" data-dismiss="modal">
                    <i class="ti-close"></i>
                </a>

                <div class="padding-15">
                    <div class="row" id="guest-container">
                        <div class="col-md-3 col-sm-6">
                            <div class=" card  avatar-card text-center">
                                <div class="card-body">
                                    <span class="badge badge-pill badge-success namber" >1</span>
                                    <img data-guest-no="'+guest+'" src="/assets/images/avatar.png" class="img-fluid avatar" alt="Responsive image">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3 col-sm-6">
                            <div class=" card  avatar-card text-center">
                                <div class="card-body">
                                    <span class="badge badge-pill badge-success namber" >1</span>
                                    <img data-guest-no="'+guest+'" src="/assets/images/avatar.png" class="img-fluid avatar" alt="Responsive image">
                                </div>
                            </div>
                        </div>

                        <div class="col-md-3 col-sm-6">
                            <div class=" card  avatar-card text-center">
                                <div class="card-body">
                                    <span class="badge badge-pill badge-success namber" >1</span>
                                    <img data-guest-no="'+guest+'" src="/assets/images/avatar.png" class="img-fluid avatar" alt="Responsive image">
                                </div>
                            </div>
                        </div>
                        {{-- <div class="ml-auto col-md-5">
                            <h3 class="mrg-btm-20 mrg-top-130">Download App</h3>
                            <p>Let me see your identification. You don't need to see his identification. We don't need to see his identification. These are not the droids.</p>
                            <div class="mrg-top-20">
                                <a href="#" data-dismiss="modal" class="btn btn-info">Noted!</a>
                            </div>
                        </div>
                        <div class="col-md-6 text-center">
                            <img class="img-fluid mrg-horizon-auto" src="assets/images/others/img-2.png" alt="">
                        </div> --}}
                    </div>
                </div>

            </div>
        </div>
    </div>
</div>  
 
@endsection