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

    </div>
</div> 
@endsection