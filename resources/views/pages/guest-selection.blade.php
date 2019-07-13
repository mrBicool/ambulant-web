@extends('layouts.master')
@section('title', 'Guest Selection')  

@section('js')
    <script src="js/pages/guests.js"></script>
@endsection

@section('css')
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

@section('content')
<nav aria-label="breadcrumb">
    <ol class="breadcrumb">
        <li class="breadcrumb-item active" aria-current="page">Guest Selection</li> 
    </ol>
</nav>


<div class="container-fluid mt-3">
    <div class="row" id="guest-container"> 
    </div> 
</div>
@endsection