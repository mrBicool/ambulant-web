@extends('layouts.master')
@section('title', 'Category')  

@section('js')
    <script src="js/pages/claiming.js"></script>
@endsection

@section('content')
<nav aria-label="breadcrumb">
    <ol class="breadcrumb"> 
        <li class="breadcrumb-item active" aria-current="page">Claiming</li>
    </ol>
</nav>
<br>
<div class="container">
    <div class="row" id="container"> 
        <div class="col-md-12">
            <div class="form-group text-center text-semibold pl-4 pr-4">
                <label for="code">Enter Code</label>
                <input id="txt-code" type="text" class="form-control text-center input-lg">
                <button id="btn-submit" class="mt-3 btn btn-inverse btn-primary">C H E C K</button>
            </div>
        </div>

        <div class="col-md-12" id="if-succes" style="display:none;">
            <div class="card">

                <div class="pdd-horizon-20 pdd-vertical-5">
                    <div class="overflow-y-auto relative scrollable ps-container ps-theme-default" style="" data-ps-id="511be494-31e0-7182-08d5-47d19fed7a86">
                        <table class="table table-lg ">
                            <tbody id="os-container">
                                <tr>
                                    <td width=""><div class="list-info">
                                        <div class="thumb-img font-size-20 product-qty">1X</div>
                                            <div class="info product-container">
                                                <span class="title">WHOLE ROASTCHIX,4PLN RICE,2MASH</span>
                                                <span class="sub-title">+ 1x SIDE DISH 1 ( FREE )</span>
                                                <span class="sub-title">+ 1x SIDE DISH 2 ( FREE )</span>
                                                <span class="sub-title">+ 4x PLAIN RICE ( FREE )</span>
                                                <span class="sub-title">+ 1x WHOLE ROASTED CHICKEN ( FREE )</span>
                                            </div>
                                        </div>
                                    </td>  
                                </tr> 
                            </tbody>
                        </table> 
                    </div>
                </div> 
                
                <div class="text-center">
                     <button id="btn-claim" class="btn btn-primary btn-rounded btn-fluid">SEND TO KITCHEN</button>
                </div>
                
            </div>
        </div>

    </div>
</div>

@endsection