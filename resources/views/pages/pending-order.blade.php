@extends('layouts.master')
@section('title', 'Pending Order')  

@section('js')
    <script src="js/pages/pending-order.js"></script>
@endsection

@section('content')
<nav aria-label="breadcrumb">
    <ol class="breadcrumb"> 
        <li class="breadcrumb-item active" aria-current="page">Pending Order's</li>
    </ol>
</nav>
<br>
<div class="container">
    <div class="row" id="container">
        <div class="col-md-12">
            <a href="#ask-1" class="card mrg-btm-15 scroll-to bg-success">
                    <ul class="list-unstyled">
                            <li>
                                <div class="pdd-vertical-5 pdd-horizon-10">
                                    
                                    <div class="info">
                                        
                                        <span class="sub-title">
                                                <i class="ti-timer pdd-right-5"></i>
                                                <span>2 min ago</span>
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                <div class="card-block pt-0"> 
                    <div class="row">
                        <div class="col-md-10 ml-auto mr-auto"> 
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="pdd-vertical-5">
                                        <p class="no-mrg-btm"><b class="font-size-24">69</b> OS-#</p>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="pdd-vertical-5">
                                        <p class="no-mrg-btm"><b class="font-size-24">2</b> Item Count</p>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="pdd-vertical-5">
                                        <p class="no-mrg-btm"><b class="font-size-24">1,000.00</b> Total</p>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="pdd-vertical-5">
                                        <p class="no-mrg-btm"><b class="font-size-24">Jose Rizal</b> Prepared By</p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div> 
                </div>
            </a>
        </div>
        <div class="col-md-12">
            <a href="#ask-1" class="card mrg-btm-15 scroll-to bg-info">
                    <ul class="list-unstyled">
                            <li>
                                <div class="pdd-vertical-5 pdd-horizon-10">
                                    
                                    <div class="info">
                                        
                                        <span class="sub-title">
                                                <i class="ti-timer pdd-right-5"></i>
                                                <span>2 min ago</span>
                                        </span>
                                    </div>
                                </div>
                            </li>
                        </ul>
                <div class="card-block pt-0"> 
                    <div class="row">
                        <div class="col-md-10 ml-auto mr-auto"> 
                            <div class="row">
                                <div class="col-md-3">
                                    <div class="pdd-vertical-5">
                                        <p class="no-mrg-btm"><b class="font-size-24">69</b> OS-#</p>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="pdd-vertical-5">
                                        <p class="no-mrg-btm"><b class="font-size-24">2</b> Item Count</p>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="pdd-vertical-5">
                                        <p class="no-mrg-btm"><b class="font-size-24">1,000.00</b> Total</p>
                                    </div>
                                </div>
                                <div class="col-md-3">
                                    <div class="pdd-vertical-5">
                                        <p class="no-mrg-btm"><b class="font-size-24">Jose Rizal</b> Prepared By</p>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
                    </div> 
                </div>
            </a>
        </div> 
    </div>
</div> 
@endsection