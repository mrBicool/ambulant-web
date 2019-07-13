@extends('layouts.master')
@section('title', 'Sub Category')  

@section('js')
    <script src="js/pages/tables.js"></script>
@endsection

@section('css')
<style>
    .boxx {
        border: 1px solid gray;
    }
 
    .namber {
        position: absolute; 
        top: 0;
        left: 0; 
        border-radius: 0; 
        height: 35px;
        width: fit-content;
        padding-top:5px;
        font-size: 1.5em;
    }

    .centerr{
        margin-left: auto;
        margin-right: auto;
    }

</style>
@endsection

@section('content')
<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">Table Selection</li> 
    </ol>
</nav>
<br>
<div class="container">
    <div class="row " id="table-container">
        {{-- <div class="row justify-content-center"> --}}

        {{-- <div class="col-md-3 card col-sm-4 text-center mr-3">  
            <div class="card-body">
                <span class="badge badge-pill badge-success namber" >1</span>
                <img src="/assets/images/table.png" class="img-fluid tbl-order-guest" alt="Responsive image">
            </div>

        </div> 

        <div class="col-md-3 card col-sm-4 text-center mr-3">  
            <div class="card-body">
                <span class="badge badge-pill badge-success namber" >2</span>
                <img src="/assets/images/table.png" class="img-fluid tbl-order-guest" alt="Responsive image">
            </div>

        </div> 

        <div class="col-md-3 card col-sm-4 text-center mr-3">  
            <div class="card-body">
                <span class="badge badge-pill badge-success namber" >3</span>
                <img src="/assets/images/table.png" class="img-fluid tbl-order-guest" alt="Responsive image">
            </div>
        </div>  --}}
    </div>
</div>
@endsection