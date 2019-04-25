@extends('layouts.master')
@section('title', "") 

@section('js')
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
                        {{-- <img class="mrg-top-30" src="/assets/images/others/img-10.jpg" alt=""> --}}
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
                            </div>
                            <div class="col-md-6">
                                <div class="checkbox border bottom">
                                    <input id="is_takeout" type="checkbox" >
                                    <label for="is_takeout">Is Takeout?</label>
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
                                <button class="btn btn-flat btn-info add-to-order">Submit to order</button>
                            </li>
                        </ul>
                    </div>
                </div>
        </div> 
    </div>
</div>
@endsection