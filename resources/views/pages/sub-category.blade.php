@extends('layouts.master')
@section('title', 'Sub Category')  

@section('js')
    <script src="js/pages/sub-category.js"></script>
@endsection

@section('content')
<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="breadcrumb-item"><a href="/">Category</a></li>
        <li class="breadcrumb-item active" aria-current="page">Sub-Category</li>
    </ol>
</nav>
<br>
<div class="container">
    <div class="row" id="container">

    </div>
</div>
@endsection