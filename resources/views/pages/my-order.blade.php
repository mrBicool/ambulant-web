@extends('layouts.master')
@section('title', 'My Order')  

@section('js')
    <script src="js/pages/my-order.js"></script>
@endsection

@section('content')
<nav aria-label="breadcrumb">
    <ol class="breadcrumb"> 
        <li class="breadcrumb-item active" aria-current="page">My Order</li>
    </ol>
</nav>
<br>
<div class="container">
    <div class="row" id="container">
        <div class="col-md-12">
            <div class="card">
                <div class="card-heading">
                    <h4 class="card-title inline-block pdd-top-5">OS #: 3</h4>
                    <button class="btn btn-success btn-sm pull-right no-mrg">
                            <i class="ti-printer"></i>
                    </button> 
                    <button  class="btn btn-primary btn-sm pull-right ">
                            Finish Transaction
                    </button>
                    {{-- <a href="#" class="btn btn-primary pull-right no-mrg">Finish Transaction</a> --}}
                </div>
                <div class="pdd-horizon-20 pdd-vertical-5">
                    <div class="overflow-y-auto relative scrollable ps-container ps-theme-default" style="" data-ps-id="c9cd0c8f-1e9a-d3fd-29e3-2992cdf98afb">
                        <table class="table table-lg table-hover">
                            <tbody>
                                <tr>
                                    <td width="">
                                        <div class="list-info">
                                            {{-- <img class="thumb-img" src="assets/images/avatars/thumb-1.jpg" alt=""> --}}
                                            <div class="thumb-img font-size-20">
                                                5x
                                            </div>
                                            <div class="info">
                                                <span class="title">CHEESEDOG COMBO W/ 12OZ C</span>
                                                <span class="sub-title">+ 1 x COCA COLA SOFTDRINK (PHP 0.00)</span>
                                                <span class="sub-title">+ 1 x COCA COLA SOFTDRINK (PHP 0.00)</span>
                                                <span class="sub-title">+ 1 x COCA COLA SOFTDRINK (PHP 0.00)</span>
                                                <span class="sub-title">+ 1 x COCA COLA SOFTDRINK (PHP 0.00)</span>
                                            </div>
                                        </div>
                                    </td> 
                                    <td width="30%" class="text-right">
                                        <div class="relative mrg-top-10">  
                                            <span class="pdd-right-20">PHP 0.00</span> 
                                            <button class="btn btn-info btn-sm">
                                                    <i class="ti-pencil"></i>
                                            </button>
                                            <button class="btn btn-danger btn-sm">
                                                    <i class="ti-trash"></i>
                                            </button>
                                        </div>
                                        
                                    </td>
                                </tr> 
                                <tr>
                                    <td width="">
                                        <div class="list-info">
                                            {{-- <img class="thumb-img" src="assets/images/avatars/thumb-1.jpg" alt=""> --}}
                                            <div class="thumb-img font-size-20">
                                                5x
                                            </div>
                                            <div class="info">
                                                <span class="title">CHEESEDOG COMBO W/ 12OZ C</span>
                                                <span class="sub-title">+ 1 x COCA COLA SOFTDRINK (PHP 0.00)</span>
                                                <span class="sub-title">+ 1 x COCA COLA SOFTDRINK (PHP 0.00)</span>
                                                <span class="sub-title">+ 1 x COCA COLA SOFTDRINK (PHP 0.00)</span>
                                                <span class="sub-title">+ 1 x COCA COLA SOFTDRINK (PHP 0.00)</span>
                                            </div>
                                        </div>
                                    </td> 
                                    <td width="30%" class="text-right">
                                        <div class="relative mrg-top-10">
                                            <span class="pdd-right-20">PHP 0.00</span>
                                            <button class="btn btn-info btn-sm">
                                                    <i class="ti-pencil"></i>
                                            </button>
                                            <button class="btn btn-danger btn-sm">
                                                    <i class="ti-trash"></i>
                                            </button>
                                        </div>
                                        
                                    </td>
                                </tr> 
                            </tbody>
                        </table>
                    <div class="ps-scrollbar-x-rail" style="left: 0px; bottom: 0px;"><div class="ps-scrollbar-x" tabindex="0" style="left: 0px; width: 0px;"></div></div><div class="ps-scrollbar-y-rail" style="top: 0px; right: 0px;"><div class="ps-scrollbar-y" tabindex="0" style="top: 0px; height: 0px;"></div></div></div>
                </div>
                <div class="card-footer d-none d-md-inline-block">
                        <div class="text-right">
                            <div class="row">
                                <div class="col-md-10 ml-auto mr-auto">
                                    <div class="row">
                                        <div class="col-md-12">
                                            <div class="pdd-vertical-5">
                                                <p class="no-mrg-btm"><b class="text-dark font-size-16">Sub Total </b> 0.00</p>
                                            </div>
                                        </div> 
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
            </div>
        </div>
    </div>
</div> 
@endsection