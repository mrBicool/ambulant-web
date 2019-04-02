@extends('layouts.master')

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
                        <h4 class="mrg-top-20 no-mrg-btm text-semibold">Product name</h4>
                        <p>0.00</p>
                    </div>
                    <div class="pdd-horizon-30 pdd-vertical-20">
                        
                        <div class="row">
                            <div class="col-md-6">
                                    <div class="mrg-top-1 text-center">
                                            <div class="input-group">
                                                <input type="text" class="form-control" placeholder="Qty">
                                                <div class="input-group-append" id="button-addon4">
                                                    <button class="btn btn-outline-secondary" type="button"><i class="ti-minus"></i></button>
                                                    <button class="btn btn-outline-secondary" type="button"><i class="ti-plus"></i></button>
                                                </div>
                                            </div>
                                    </div>
                            </div>
                            <div class="col-md-6">
                                <div class="checkbox border bottom">
                                    <input id="form-2-1" name="form-2-1" type="checkbox" >
                                    <label for="form-2-1">Is Takeout?</label>
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
                                                        <textarea class="form-control" rows="3" id="form-1-5"></textarea>
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
                            <li class="list-inline-item">
                                TOTAL : 0.00
                            </li>
                            <li class="list-inline-item">
                                <a href="#" class="btn btn-flat btn-info">Add to Order</a>
                            </li>
                        </ul>
                    </div>
                </div>
        </div> 
    </div>
</div>
@endsection